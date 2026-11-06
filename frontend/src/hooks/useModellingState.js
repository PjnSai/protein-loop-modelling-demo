import { useState } from "react";

export const useModellingState = () => {
  const [step, setStep] = useState(1);

  const [pdbCode, setPdbCode] = useState("");
  const [pdbData, setPdbData] = useState(null);
  const [selectedChain, setSelectedChain] = useState("");

  const [preparation, setPreparation] = useState(null);
  const [modellingResults, setModellingResults] = useState(null);

  const [modellingParams, setModellingParams] = useState({
    segment_start: "",
    segment_end: "",
    n_iterations: 10000,
    target_phi: [],
    target_psi: [],
    constrained_phi: [],
    constrained_psi: [],
  });

  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const resetInterface = () => {
    setStep(1);

    setPdbCode("");
    setPdbData(null);
    setSelectedChain("");

    setPreparation(null);
    setModellingResults(null);

    setModellingParams({
      segment_start: "",
      segment_end: "",
      n_iterations: 10000,
      target_phi: [],
      target_psi: [],
      constrained_phi: [],
      constrained_psi: [],
    });

    setSearchResults([]);
    setShowSearch(false);
    setSearchQuery("");
  };

  return {
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
  };
};
