import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ErrorAlert } from "../components/ui";
import { useAuth } from "../hooks";

import PDBInputForm from "../components/modelling/PDBInputForm";
import SystemStatusBanners from "../components/modelling/SystemStatusBanners";
import TestingInstructions from "../components/modelling/TestingInstructions";
import ProgressSteps from "../components/modelling/ProgressSteps";
import StructureVisualisation from "../components/modelling/StructureVisualisation";
import ModellingResults from "../components/modelling/ModellingResults";
import ParameterForm from "../components/modelling/ParameterForm";

import * as modellingApi from "../services/modellingApi";

import { useModellingState } from "../hooks/useModellingState";

const LoopModellingInterface = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [systemStatus] = useState({
    system_ready: true,
    demo_mode: true,
    message: "Static demo - structures from RCSB, results pre-computed",
  });

  const {
    step,
    setStep,
    pdbCode,
    setPdbCode,
    pdbData,
    setPdbData,
    selectedChain,
    setSelectedChain,
    preparation,
    setPreparation,
    modellingParams,
    setModellingParams,
    modellingResults,
    setModellingResults,

    searchResults,
    setSearchResults,
    showSearch,
    setShowSearch,
    searchQuery,
    setSearchQuery,

    resetInterface,
  } = useModellingState();

  const { isAuthenticated } = useAuth();

  const handleBackToStructure = () => setStep(2);
  const handleParameterSubmit = (backendParams) =>
    submitModelling(backendParams);
  const handleContinueToParameters = () => prepareModelling();
  const handleStartOver = () => resetInterface();

  const handleDownloadDemo = (jobId) => downloadDemoResults(jobId);
  const handleDownloadAuth = (jobId) => downloadAuthResults(jobId);

  const navigate = useNavigate();
  const handleGoToDashboard = () => navigate("/dashboard");
  const handleLogin = () => navigate("/login", { state: { from: { pathname: "/dashboard" } } });
  const handleReset = () => resetInterface();

  const fetchPDBStructure = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await modellingApi.fetchPDBStructure(pdbCode);

      if (result.success) {
        setPdbData(result.data);

        // A quick-start example's chain and segment only apply to its own
        // structure. Fetching any other PDB code starts with an empty segment.
        const fromExample =
          modellingParams.example_pdb_code === result.data.pdb_code;
        const preferred = fromExample ? modellingParams.preferred_chain : null;
        if (!fromExample) {
          setModellingParams((prev) => ({
            ...prev,
            segment_start: "",
            segment_end: "",
            preferred_chain: undefined,
            example_pdb_code: undefined,
          }));
        }
        setSelectedChain(
          preferred && result.data.analysis.chains.includes(preferred)
            ? preferred
            : result.selectedChain,
        );
        setStep(2);
        setShowSearch(false);
        setError(null);
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error("PDB fetch error:", err);
      setError(
        "Unable to fetch PDB structure. Please check your internet connection.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const searchPDB = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await modellingApi.searchPDB(searchQuery);

      if (result.success) {
        setSearchResults(result.results);
        setError(null);
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error("Search error:", err);
      setError(
        "Search service temporarily unavailable. Try PDB codes: 1ADG, 1UBQ, 2LYZ, 1CRN",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const selectFromSearch = (result) => {
    setPdbCode(result.pdb_code);
    setShowSearch(false);
    setSearchResults([]);
  };

  const prepareModelling = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await modellingApi.prepareModelling(
        pdbData,
        pdbCode,
        selectedChain,
        modellingParams,
      );

      if (result.success) {
        setPreparation(result.preparation);
        setStep(3);

        setModellingParams((prev) => ({
          ...prev,
          n_iterations: result.suggestedIterations,
        }));
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error("Preparation error:", err);
      setError("Network error during preparation");
    } finally {
      setIsLoading(false);
    }
  };

  const submitModelling = async (backendParams) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await modellingApi.submitModelling(
        backendParams,
        modellingParams,
        pdbData,
        pdbCode,
        selectedChain,
        isAuthenticated,
      );

      if (result.success) {
        setModellingResults(result.results);
        setStep(4);
      } else {
        setError(result.error);
        // The message is shown above the form, so bring it into view
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      console.error("Modelling submission error:", err);
      setError("Network error during modelling submission");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadDemoResults = async (jobId) => {
    try {
      const result = await modellingApi.downloadDemoResults(jobId);

      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      console.error("Download error:", err);
      setError("Download temporarily unavailable");
    }
  };

  const downloadAuthResults = async (jobId) => {
    try {
      const result = await modellingApi.downloadAuthResults(jobId);

      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      console.error("Download error:", err);
      setError("Download temporarily unavailable");
    }
  };

  return (
    <div className="container-fluid px-3 mt-4">
      <h2>Protein Loop Modelling</h2>
      <SystemStatusBanners
        isAuthenticated={isAuthenticated}
        systemStatus={systemStatus}
      />
      <ProgressSteps currentStep={step} totalSteps={4} />
      <ErrorAlert error={error} onDismiss={() => setError(null)} />
      {step === 1 && (
        <PDBInputForm
          pdbCode={pdbCode}
          setPdbCode={setPdbCode}
          isLoading={isLoading}
          onFetchStructure={fetchPDBStructure}
          showSearch={showSearch}
          onToggleSearch={() => setShowSearch(!showSearch)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchResults={searchResults}
          onSearchPDB={searchPDB}
          onSelectFromSearch={selectFromSearch}
          modellingParams={modellingParams}
          setModellingParams={setModellingParams}
        />
      )}

      {step === 2 && pdbData && (
        <StructureVisualisation
          pdbData={pdbData}
          selectedChain={selectedChain}
          setSelectedChain={setSelectedChain}
          modellingParams={modellingParams}
          setModellingParams={setModellingParams}
          onContinue={handleContinueToParameters}
          onReset={handleStartOver}
          isLoading={isLoading}
        />
      )}

      {step === 3 && preparation && (
        <ParameterForm
          preparation={preparation}
          modellingParams={modellingParams}
          setModellingParams={setModellingParams}
          isLoading={isLoading}
          onSubmit={handleParameterSubmit}
          onBack={handleBackToStructure}
        />
      )}

      {step === 4 && modellingResults && (
        <ModellingResults
          modellingResults={modellingResults}
          pdbData={pdbData}
          selectedChain={selectedChain}
          modellingParams={modellingParams}
          isAuthenticated={isAuthenticated}
          onDownloadDemo={handleDownloadDemo}
          onDownloadAuth={handleDownloadAuth}
          onReset={handleReset}
          onGoToDashboard={handleGoToDashboard}
          onLogin={handleLogin}
          onBack={() => setStep(3)}
        />
      )}

      {step === 1 && <TestingInstructions isAuthenticated={isAuthenticated} />}
    </div>
  );
};

export default LoopModellingInterface;
