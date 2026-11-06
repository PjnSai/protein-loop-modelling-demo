import { FaExclamationTriangle, FaRedo } from "react-icons/fa";

const ViewerErrorDisplay = ({
  error,
  height,
  viewerType,
  onResetViewer,
  onSwitchViewer,
}) => {
  if (!error) {
    return null;
  }

  const alternativeViewer = viewerType === "ngl" ? "3dmol" : "ngl";
  const alternativeViewerName = viewerType === "ngl" ? "3DMol" : "NGL";

  return (
    <div className="alert alert-danger" style={{ height: `${height}px` }}>
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="text-center">
          <div className="mb-3">
            <FaExclamationTriangle size={48} className="text-danger" />
          </div>
          <h6>Visualisation Error</h6>
          <p className="mb-0 small">{error}</p>
          <div className="mt-3">
            <button
              className="btn btn-outline-primary btn-sm me-2"
              onClick={onResetViewer}
              title="Reset the current viewer"
            >
              <FaRedo className="me-1" />
              Reset Viewer
            </button>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => onSwitchViewer(alternativeViewer)}
              title={`Switch to ${alternativeViewerName} viewer`}
            >
              Try {alternativeViewerName}
            </button>
          </div>
          <div className="mt-3">
            <small className="text-muted">
              <strong>Troubleshooting:</strong>
              <br />
              • Try refreshing the page
              <br />
              • Switch to the alternative viewer
              <br />• Check your internet connection
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewerErrorDisplay;
