import React from "react";
import FullscreenViewer from "../viewer/FullscreenViewer";
import useFullscreen from "../../hooks/useFullscreen";
import StructureComparisonSection from "./StructureComparisonSection";
import JobInfoCard from "./JobInfoCard";
import ParametersDisplayCard from "./ParametersDisplayCard";
import ResultsSummaryCard from "./ResultsSummaryCard";

const JobDetailsModal = ({
  selectedJob,
  isOpen,
  onClose,
  onDownloadResults,
  formatDate,
}) => {
  const { isFullscreen, fullscreenData, openFullscreen, closeFullscreen } =
    useFullscreen();

  if (!isOpen || !selectedJob) {
    return null;
  }

  return (
    <>
      <div
        className="modal show d-block"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Job Details - {selectedJob.pdb_code} Chain {selectedJob.chain}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close job details modal"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-8 col-md-12">
                  <StructureComparisonSection
                    selectedJob={selectedJob}
                    openFullscreen={openFullscreen}
                  />
                  <ParametersDisplayCard selectedJob={selectedJob} />
                </div>
                <div className="col-lg-4 col-md-12">
                  <JobInfoCard
                    selectedJob={selectedJob}
                    formatDate={formatDate}
                    onDownloadResults={onDownloadResults}
                  />
                  <ResultsSummaryCard selectedJob={selectedJob} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
              {selectedJob.has_results && (
                <button
                  className="btn btn-success"
                  onClick={() => onDownloadResults(selectedJob.job_id)}
                  title="Download modelling results as PDB file"
                >
                  Download Results
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <FullscreenViewer
        isOpen={isFullscreen}
        onClose={closeFullscreen}
        title={fullscreenData?.title}
        pdbContent={fullscreenData?.pdbContent}
        pdbCode={fullscreenData?.pdbCode}
        selectedChain={fullscreenData?.selectedChain}
        segmentStart={fullscreenData?.segmentStart}
        segmentEnd={fullscreenData?.segmentEnd}
        isModelledStructure={fullscreenData?.isModelledStructure}
      />
    </>
  );
};

export default JobDetailsModal;
