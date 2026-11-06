import { FaExpandArrowsAlt } from "react-icons/fa";
import ProteinViewer from "../ProteinViewer";
import FullscreenViewer from "../viewer/FullscreenViewer";
import useFullscreen from "../../hooks/useFullscreen";
import StructureInfoCard from "./visualisation/StructureInfoCard";
import ChainSegmentControls from "./visualisation/ChainSegmentControls";
import SegmentValidationCard from "./visualisation/SegmentValidationCard";
import TestingHelperCard from "./visualisation/TestingHelperCard";
import ActionButtons from "./visualisation/ActionButtons";

const StructureVisualisation = ({
  pdbData,
  selectedChain,
  setSelectedChain,
  modellingParams,
  setModellingParams,
  onContinue,
  onReset,
  isLoading,
}) => {
  const {
    isFullscreen,
    fullscreenData,
    openFullscreen,
    closeFullscreen,
  } = useFullscreen();

  return (
    <div className="card">
      <div className="card-header">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            Step 2: Structure Visualisation - {pdbData.pdb_code}
          </h5>
          <button
            className="btn btn-outline-primary"
            onClick={() =>
              openFullscreen({
                title: `${pdbData.pdb_code} - Structure Analysis`,
                pdbContent: pdbData.pdb_content,
                pdbCode: pdbData.pdb_code,
                selectedChain: selectedChain,
                segmentStart: parseInt(modellingParams.segment_start),
                segmentEnd: parseInt(modellingParams.segment_end),
                isModelledStructure: false,
              })
            }
            title="Expand to fullscreen for detailed structural analysis"
            disabled={isLoading}
          >
            <FaExpandArrowsAlt className="me-1" />
            Fullscreen
          </button>
        </div>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-8">
            <ProteinViewer
              pdbContent={pdbData.pdb_content}
              pdbCode={pdbData.pdb_code}
              selectedChain={selectedChain}
              segmentStart={parseInt(modellingParams.segment_start)}
              segmentEnd={parseInt(modellingParams.segment_end)}
              height={400}
              isModelledStructure={false}
            />
            <ChainSegmentControls
              pdbData={pdbData}
              selectedChain={selectedChain}
              setSelectedChain={setSelectedChain}
              modellingParams={modellingParams}
              setModellingParams={setModellingParams}
            />
            <TestingHelperCard
              pdbData={pdbData}
              setSelectedChain={setSelectedChain}
              setModellingParams={setModellingParams}
            />
            <ActionButtons
              onContinue={onContinue}
              onReset={onReset}
              isLoading={isLoading}
              selectedChain={selectedChain}
              modellingParams={modellingParams}
            />
          </div>
          <div className="col-md-4">
            <StructureInfoCard pdbData={pdbData} />
            <SegmentValidationCard
              selectedChain={selectedChain}
              pdbData={pdbData}
              modellingParams={modellingParams}
            />
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
    </div>
  );
};

export default StructureVisualisation;
