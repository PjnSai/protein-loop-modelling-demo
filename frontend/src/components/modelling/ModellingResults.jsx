import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import FullscreenViewer from "../viewer/FullscreenViewer";
import useFullscreen from "../../hooks/useFullscreen";
import JobInfoTable from "./results/JobInfoTable";
import ParametersUsedTable from "./results/ParametersUsedTable";
import ResultsSummaryTables from "./results/ResultsSummaryTables";
import StructureComparison from "./results/StructureComparison";
import ActionButtons from "./results/ActionButtons";
import DemoCallToAction from "./results/DemoCallToAction";
import SuccessCallToAction from "./results/SuccessCallToAction";

const ModellingResults = ({
  modellingResults,
  pdbData,
  selectedChain,
  modellingParams,
  onDownloadDemo,
  onDownloadAuth,
  onReset,
  onGoToDashboard,
  onLogin,
  onBack,
}) => {
  const {
    isFullscreen,
    fullscreenData,
    openFullscreen,
    closeFullscreen,
  } = useFullscreen();

  const [copied, setCopied] = useState(false);
  const copyJobId = async () => {
    try {
      await navigator.clipboard.writeText(modellingResults.job_id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (!modellingResults) {
    return null;
  }

  return (
    <div className="card">
      <div className="card-header">
        <h5>Step 4: Modelling Results</h5>
      </div>
      <div className="card-body">
        {modellingResults.success ? (
          <div>
            {modellingResults.precomputed && (
              <div className="alert alert-secondary">
                <strong>Pre-computed result.</strong> This is the saved output
                of a real MATLAB run
                {modellingResults.computed_at &&
                  ` from ${new Date(modellingResults.computed_at).toLocaleDateString()}`}
                . Nothing was computed just now.
              </div>
            )}

            <div className="row">
              <JobInfoTable modellingResults={modellingResults} />
              <ParametersUsedTable modellingResults={modellingResults} />
            </div>
            {modellingResults.results && (
              <div className="card mt-3">
                <div className="card-header">
                  <h6>
                    <FaPlay className="me-2" />
                    Loop Modelling Results
                    {modellingResults.precomputed && (
                      <span className="badge bg-secondary ms-2">
                        Pre-computed
                      </span>
                    )}
                  </h6>
                </div>
                <div className="card-body">
                  <ResultsSummaryTables modellingResults={modellingResults} />
                  <StructureComparison
                    modellingResults={modellingResults}
                    pdbData={pdbData}
                    selectedChain={selectedChain}
                    modellingParams={modellingParams}
                    openFullscreen={openFullscreen}
                  />
                </div>
              </div>
            )}

            <ActionButtons
              modellingResults={modellingResults}
              onDownloadDemo={onDownloadDemo}
              onDownloadAuth={onDownloadAuth}
              onReset={onReset}
              onGoToDashboard={onGoToDashboard}
              copyJobId={copyJobId}
              copied={copied}
            />
            {modellingResults.demo_mode && (
              <DemoCallToAction onLogin={onLogin} />
            )}

            {!modellingResults.demo_mode &&
              modellingResults.status === "completed" && (
                <SuccessCallToAction />
              )}
          </div>
        ) : (
          <div>
            <div className="alert alert-danger">
              <strong>Modelling Job Failed</strong>
              <p className="mb-0 mt-2">{modellingResults.error}</p>
              {modellingResults.details && (
                <p className="mb-0">
                  <small>{modellingResults.details}</small>
                </p>
              )}
            </div>
            <button className="btn btn-outline-primary me-2" onClick={onBack}>
              Back to Parameters
            </button>
            <button className="btn btn-secondary" onClick={onReset}>
              Start Over
            </button>
          </div>
        )}
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
    </div>
  );
};

export default ModellingResults;
