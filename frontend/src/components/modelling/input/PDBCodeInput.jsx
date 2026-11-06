import React from "react";
import { FaSpinner, FaSearch } from "react-icons/fa";

const PDBCodeInput = ({
  pdbCode,
  setPdbCode,
  isLoading,
  onFetchStructure,
  onToggleSearch,
}) => {
  return (
    <div className="row">
      <div className="col-md-8">
        <div className="mb-3">
          <label className="form-label">PDB Code (4 characters)</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control text-uppercase"
              placeholder="e.g., 1ADG"
              value={pdbCode}
              onChange={(e) => setPdbCode(e.target.value.toUpperCase())}
              maxLength={4}
              disabled={isLoading}
            />
            <button
              className="btn btn-primary"
              onClick={onFetchStructure}
              disabled={isLoading || pdbCode.length !== 4}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="fa-spin me-2" />
                  Loading...
                </>
              ) : (
                "Fetch Structure"
              )}
            </button>
          </div>
          <div className="form-text">
            Enter a 4-character PDB code (e.g., 1ADG for Alcohol Dehydrogenase)
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="mb-3">
          <label className="form-label">&nbsp;</label>
          <button
            className="btn btn-outline-secondary w-100"
            onClick={onToggleSearch}
          >
            <FaSearch className="me-2" />
            Search PDB Database
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDBCodeInput;
