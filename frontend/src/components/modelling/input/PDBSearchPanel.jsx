import React from "react";
import { FaSpinner } from "react-icons/fa";

const PDBSearchPanel = ({
  showSearch,
  searchQuery,
  setSearchQuery,
  searchResults,
  onSearchPDB,
  onSelectFromSearch,
  isLoading,
}) => {
  if (!showSearch) {
    return null;
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const trimmedQuery = searchQuery.trim();
      if (trimmedQuery.length === 4 && /^[A-Za-z0-9]{4}$/.test(trimmedQuery)) {
        onSearchPDB();
      }
    }
  };

  const handleSearchClick = () => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery.length === 4 && /^[A-Za-z0-9]{4}$/.test(trimmedQuery)) {
      onSearchPDB();
    }
  };

  return (
    <div className="mt-3 p-3 border rounded bg-light">
      <h6>Search PDB Database</h6>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control text-uppercase"
          placeholder="Enter 4-character PDB code (e.g., 1ADG, 1UBQ, 2LYZ)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
          maxLength={4}
          pattern="[A-Za-z0-9]{4}"
          onKeyPress={handleKeyPress}
        />
        <button
          className="btn btn-outline-primary"
          onClick={handleSearchClick}
          disabled={isLoading || searchQuery.length !== 4}
        >
          {isLoading ? <FaSpinner className="fa-spin" /> : "Search"}
        </button>
      </div>
      <small className="text-muted">
        Search for protein structures using 4-character PDB codes only
      </small>
      {searchResults.length > 0 && (
        <div className="mt-3" style={{ maxHeight: "300px", overflowY: "auto" }}>
          <h6 className="mb-2">Search Results:</h6>
          {searchResults.map((result, index) => (
            <div
              key={index}
              className="border-bottom py-2 cursor-pointer hover-bg-light"
              style={{ cursor: "pointer" }}
              onClick={() => onSelectFromSearch(result)}
            >
              <div className="d-flex justify-content-between">
                <strong className="text-primary">{result.pdb_code}</strong>
                <small className="text-muted">
                  {result.resolution && `${result.resolution}Å`}
                </small>
              </div>
              <div className="text-truncate">
                {result.title || "No title available"}
              </div>
              <small className="text-muted">
                {result.method || "Unknown method"}
                {result.chains &&
                  ` • Chains: ${Array.isArray(result.chains) ? result.chains.join(", ") : result.chains}`}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PDBSearchPanel;
