/* The live site cannot run MATLAB. Instead, results saved from real runs are
   published in public/demo-results/ and matched by PDB code, chain and
   segment. See docs/demo-results.md for the file format. */

const BASE = `${import.meta.env.BASE_URL}demo-results/`;

let manifestPromise = null;

export const loadManifest = () => {
  if (!manifestPromise) {
    manifestPromise = fetch(`${BASE}manifest.json`)
      .then((response) => {
        if (!response.ok) throw new Error(`manifest.json: ${response.status}`);
        return response.json();
      })
      .then((data) => data.examples || [])
      .catch((err) => {
        manifestPromise = null; // allow a retry
        throw err;
      });
  }
  return manifestPromise;
};

const sameSelection = (example, pdbCode, chain, start, end) =>
  example.pdb_code.toUpperCase() === String(pdbCode).toUpperCase() &&
  example.chain === chain &&
  example.segment_start === parseInt(start, 10) &&
  example.segment_end === parseInt(end, 10);

export const findExample = async (pdbCode, chain, start, end) => {
  const examples = await loadManifest();
  return (
    examples.find((example) =>
      sameSelection(example, pdbCode, chain, start, end),
    ) || null
  );
};

const modelCache = new Map();

export const loadModelledStructure = (example) => {
  if (!example.model_file) return Promise.resolve(null);

  if (!modelCache.has(example.id)) {
    const request = fetch(`${BASE}${example.model_file}`).then((response) => {
      if (!response.ok) {
        throw new Error(`${example.model_file}: ${response.status}`);
      }
      return response.text();
    });
    request.catch(() => modelCache.delete(example.id));
    modelCache.set(example.id, request);
  }
  return modelCache.get(example.id);
};

export const describeExamples = (examples) =>
  examples
    .map((e) => `${e.pdb_code} chain ${e.chain}, ${e.segment_start}-${e.segment_end}`)
    .join("; ");
