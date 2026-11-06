import { useEffect } from "react";
import { FaTimes, FaExpand } from "react-icons/fa";
import ProteinViewer from "../ProteinViewer";

const FullscreenViewer = ({
  isOpen,
  onClose,
  title = "Protein Structure",
  pdbContent,
  pdbCode,
  selectedChain,
  segmentStart,
  segmentEnd,
  isModelledStructure = false,
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scroll
      document.body.style.position = "fixed"; // Prevent mobile scroll issues
      document.body.style.width = "100%";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
      document.body.style.position = "unset";
      document.body.style.width = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-95"
      style={{ zIndex: 9999 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="position-relative w-100 h-100 d-flex flex-column">
        <div className="bg-dark text-white p-3 d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-0 text-white">
              <FaExpand className="me-2" />
              {title}
            </h5>
            <small className="text-light opacity-75">
              {pdbCode}
              {selectedChain && ` • Chain ${selectedChain}`}
              {segmentStart &&
                segmentEnd &&
                ` • Segment ${segmentStart}-${segmentEnd}`}
              {isModelledStructure && " • Modelled Structure"}
            </small>
          </div>
          <button
            className="btn btn-outline-light"
            onClick={onClose}
            title="Close fullscreen (ESC)"
          >
            <FaTimes className="me-1" />
            Close
          </button>
        </div>
        <div className="flex-grow-1 p-2">
          <ProteinViewer
            pdbContent={pdbContent}
            pdbCode={pdbCode}
            selectedChain={selectedChain}
            segmentStart={segmentStart}
            segmentEnd={segmentEnd}
            height={window.innerHeight - 120}
            showControls={true}
            isModelledStructure={isModelledStructure}
            isFullscreenMode={true}
          />
        </div>
        <div className="bg-dark text-center py-2">
          <small className="text-light opacity-75">
            Press ESC or click outside to close • Use controls above to change
            viewer and styles
          </small>
        </div>
      </div>
    </div>
  );
};

export default FullscreenViewer;
