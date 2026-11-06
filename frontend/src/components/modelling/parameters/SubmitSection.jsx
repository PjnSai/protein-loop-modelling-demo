import React from "react";
import { FaSpinner } from "react-icons/fa";

const SubmitSection = ({
  onSubmit,
  onBack,
  isLoading,
  hasConflicts,
}) => {
  return (
    <>
      <div className="mt-4">
        <button
          className="btn btn-success btn-lg me-2"
          onClick={onSubmit}
          disabled={isLoading || hasConflicts}
        >
          {isLoading ? (
            <>
              <FaSpinner className="fa-spin me-2" />
              Loading Result...
            </>
          ) : (
            <>
              Show Pre-computed Result
            </>
          )}
        </button>
        <button className="btn btn-outline-secondary" onClick={onBack}>
          Back to Structure
        </button>
      </div>
      {isLoading && (
        <div className="alert alert-info mt-3">
          <strong>Loading...</strong> Fetching the saved result of a real
          MATLAB run for this segment.
        </div>
      )}
    </>
  );
};

export default SubmitSection;
