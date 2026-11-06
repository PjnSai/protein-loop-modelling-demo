import React from "react";
import { FaDownload, FaCopy } from "react-icons/fa";

const ActionButtons = ({
  modellingResults,
  onDownloadDemo,
  onDownloadAuth,
  onReset,
  onGoToDashboard,
  copyJobId,
  copied,
}) => {
  return (
    <div className="mt-4">
      {modellingResults.demo_mode && (
        <>
          <button
            className="btn btn-success me-2"
            onClick={() => onDownloadDemo(modellingResults.job_id)}
          >
            <FaDownload className="me-2" />
            Download Modelled PDB
          </button>
        </>
      )}

      {!modellingResults.demo_mode &&
        modellingResults.status === "completed" && (
          <>
            <button
              className="btn btn-success me-2"
              onClick={() => onDownloadAuth(modellingResults.job_id)}
            >
              <FaDownload className="me-2" />
              Download Modelled PDB
            </button>
            <button className="btn btn-primary me-2" onClick={onGoToDashboard}>
              View in Dashboard
            </button>
          </>
        )}

      <button className="btn btn-success me-2" onClick={onReset}>
        Start New Job
      </button>
      <button className="btn btn-outline-secondary" onClick={copyJobId}>
        <FaCopy className="me-2" />
        {copied ? "Copied" : "Copy Job ID"}
      </button>
    </div>
  );
};

export default ActionButtons;
