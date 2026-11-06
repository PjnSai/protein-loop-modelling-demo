/* Same interface as the backend version on main, but:
   - structures are fetched from RCSB and analysed in the browser
   - the prepare step runs in the browser
   - "submitting" loads a saved result from a real MATLAB run, but only when
     the PDB code, chain, segment and parameters all match that run exactly.
     Any other input can be explored but produces no output. */

import { fetchAndAnalyse, isValidPdbCode } from "../demo/pdb";
import { prepareSegment } from "../demo/prepare";
import {
  describeExamples,
  findExample,
  loadManifest,
  loadModelledStructure,
} from "../demo/precomputed";
import { downloadJobResults, recordSessionJob } from "./dashboardApi";

const INVALID_CODE_MESSAGE =
  "Please enter a valid 4-character PDB code (a digit followed by three letters or digits, e.g. 1ADG)";

export const fetchPDBStructure = async (pdbCode) => {
  if (!isValidPdbCode(pdbCode || "")) {
    return { success: false, error: INVALID_CODE_MESSAGE };
  }

  try {
    const data = await fetchAndAnalyse(pdbCode);
    return {
      success: true,
      data,
      selectedChain: data.analysis.chains[0],
    };
  } catch (err) {
    console.error("PDB fetch error:", err);
    return {
      success: false,
      error:
        err instanceof TypeError
          ? "Unable to reach the RCSB Protein Data Bank. Please check your internet connection."
          : err.message,
    };
  }
};

export const searchPDB = async (searchQuery) => {
  const query = searchQuery.trim();
  if (!query) {
    return { success: false, error: "Search query is empty" };
  }

  const result = await fetchPDBStructure(query);
  if (!result.success) {
    return {
      success: false,
      error: `${result.error}. Try PDB codes like 1ADG, 1UBQ, 2LYZ or 1CRN.`,
    };
  }

  const { analysis, pdb_code } = result.data;
  return {
    success: true,
    results: [
      {
        pdb_code,
        title: analysis.title,
        method: analysis.method,
        resolution: analysis.resolution,
        chains: analysis.chains,
      },
    ],
  };
};

export const prepareModelling = async (
  pdbData,
  pdbCode,
  selectedChain,
  modellingParams,
) => {
  if (
    !selectedChain ||
    !modellingParams.segment_start ||
    !modellingParams.segment_end
  ) {
    return { success: false, error: "Please select chain and segment range" };
  }

  const result = prepareSegment(
    pdbData,
    selectedChain,
    modellingParams.segment_start,
    modellingParams.segment_end,
  );
  if (!result.success) return result;

  let savedParameters = null;
  try {
    const example = await findExample(
      pdbData?.pdb_code || pdbCode,
      selectedChain,
      modellingParams.segment_start,
      modellingParams.segment_end,
    );
    savedParameters = example?.parameters || null;
  } catch (err) {
    console.error("Could not load pre-computed results list:", err);
  }

  return {
    success: true,
    preparation: { ...result.preparation, saved_parameters: savedParameters },
    suggestedIterations:
      savedParameters?.n_iterations ||
      result.preparation.suggested_parameters.n_iterations,
  };
};

const sameParameters = (requested, saved) => {
  const normaliseTargets = (list = []) =>
    [...list]
      .map((t) => `${t.residue}:${Number(t.angle)}`)
      .sort()
      .join(",");
  const normaliseResidues = (list = []) => [...list].sort((a, b) => a - b).join(",");

  // Runs saved without an iteration count are compared on angles only
  const sameIterations =
    saved.n_iterations === undefined ||
    Number(requested.n_iterations) === Number(saved.n_iterations);

  return (
    sameIterations &&
    normaliseTargets(requested.target_phi) === normaliseTargets(saved.target_phi) &&
    normaliseTargets(requested.target_psi) === normaliseTargets(saved.target_psi) &&
    normaliseResidues(requested.constrained_phi) ===
      normaliseResidues(saved.constrained_phi) &&
    normaliseResidues(requested.constrained_psi) ===
      normaliseResidues(saved.constrained_psi)
  );
};

export const submitModelling = async (
  backendParams,
  modellingParams,
  pdbData,
  pdbCode,
  selectedChain,
  isAuthenticated,
) => {
  const params = backendParams || modellingParams;
  const currentPdbCode = pdbData?.pdb_code || pdbCode;

  if (!currentPdbCode) {
    return {
      success: false,
      error: "PDB code is missing. Please go back and fetch a structure first.",
    };
  }

  const requested = {
    pdb_code: currentPdbCode,
    chain: selectedChain,
    segment_start: parseInt(modellingParams.segment_start, 10),
    segment_end: parseInt(modellingParams.segment_end, 10),
    n_iterations: parseInt(params.n_iterations, 10),
    target_phi: params.target_phi || [],
    target_psi: params.target_psi || [],
    constrained_phi: params.constrained_phi || [],
    constrained_psi: params.constrained_psi || [],
  };

  try {
    const example = await findExample(
      currentPdbCode,
      selectedChain,
      requested.segment_start,
      requested.segment_end,
    );

    if (!example) {
      const examples = await loadManifest();
      return {
        success: false,
        error: examples.length
          ? `Live modelling isn't available in this demo, so there is no output for this selection. A verified result is available for: ${describeExamples(examples)}.`
          : "This demo can't run MATLAB, and no saved results have been published yet.",
      };
    }

    // Only the verified run's exact parameters produce an output
    if (!sameParameters(requested, example.parameters || {})) {
      return {
        success: false,
        error:
          "Live modelling isn't available in this demo, so there is no output for these parameters. To see the verified result, click 'Enter These Parameters' in the MATLAB Parameters box and submit again.",
      };
    }

    const savedParameters = {
      chain: example.chain,
      segment_start: example.segment_start,
      segment_end: example.segment_end,
      ...example.parameters,
    };

    // A run saved as failed shows the real error from that run
    if (example.status === "failed") {
      return {
        success: true,
        results: {
          success: false,
          error: "Pre-computed run failed",
          details: example.error_message,
        },
      };
    }

    const modelledStructure = await loadModelledStructure(example);
    const jobId = isAuthenticated ? recordSessionJob(example) : example.id;

    return {
      success: true,
      results: {
        success: true,
        job_id: jobId,
        status: "completed",
        message: "Loaded pre-computed MATLAB result",
        results: example.results || {},
        modelled_structure: modelledStructure,
        processing_time: example.processing_time,
        parameters: savedParameters,
        pdb_code: example.pdb_code,
        demo_mode: !isAuthenticated,
        precomputed: true,
        computed_at: example.completed_at || example.created_at,
      },
    };
  } catch (err) {
    console.error("Pre-computed result error:", err);
    return {
      success: false,
      error: "Unable to load the pre-computed result. Please try again.",
    };
  }
};

export const downloadDemoResults = (jobId) => downloadJobResults(jobId);
export const downloadAuthResults = (jobId) => downloadJobResults(jobId);
