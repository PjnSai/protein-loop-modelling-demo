import React from "react";
import { FaExpandArrowsAlt, FaCheck } from "react-icons/fa";
import ProteinViewer from "../../ProteinViewer";

const StructureComparison = ({
  modellingResults,
  pdbData,
  selectedChain,
  modellingParams,
  openFullscreen,
}) => {
  return (
    <div className="mt-3">
      <h6>Structure Comparison: Original vs Modelled</h6>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <div className="d-flex justify-content-between align-items-center">
                <small>
                  <strong>Original Structure</strong>
                </small>
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={() =>
                    openFullscreen({
                      title: `${modellingResults.pdb_code} - Original Structure`,
                      pdbContent: pdbData?.pdb_content,
                      pdbCode: pdbData?.pdb_code || modellingResults.pdb_code,
                      selectedChain: selectedChain,
                      segmentStart: parseInt(modellingParams.segment_start),
                      segmentEnd: parseInt(modellingParams.segment_end),
                      isModelledStructure: false,
                    })
                  }
                  title="View in fullscreen"
                >
                  <FaExpandArrowsAlt />
                </button>
              </div>
            </div>
            <div className="card-body p-2">
              <ProteinViewer
                pdbContent={pdbData?.pdb_content}
                pdbCode={pdbData?.pdb_code || modellingResults.pdb_code}
                selectedChain={selectedChain}
                segmentStart={parseInt(modellingParams.segment_start)}
                segmentEnd={parseInt(modellingParams.segment_end)}
                height={300}
                showControls={true}
                isModelledStructure={false}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-success text-white">
              <div className="d-flex justify-content-between align-items-center">
                <small>
                  <strong>
                    Modelled Structure{" "}
                    {modellingResults.precomputed ? "(Pre-computed)" : "(MATLAB)"}
                  </strong>
                </small>
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={() =>
                    openFullscreen({
                      title: `${modellingResults.pdb_code} - Modelled Structure`,
                      pdbContent:
                        modellingResults.modelled_structure ||
                        modellingResults.results?.modelled_pdb_content,
                      pdbCode: `${modellingResults.pdb_code}_MOD`,
                      selectedChain: selectedChain,
                      segmentStart: parseInt(modellingParams.segment_start),
                      segmentEnd: parseInt(modellingParams.segment_end),
                      isModelledStructure: true,
                    })
                  }
                  title="View in fullscreen"
                >
                  <FaExpandArrowsAlt />
                </button>
              </div>
            </div>
            <div className="card-body p-2">
              {modellingResults.modelled_structure ||
              modellingResults.results?.modelled_pdb_content ? (
                <ProteinViewer
                  pdbContent={
                    modellingResults.modelled_structure ||
                    modellingResults.results.modelled_pdb_content
                  }
                  pdbCode={`${modellingResults.pdb_code}_MOD`}
                  selectedChain={selectedChain}
                  segmentStart={parseInt(modellingParams.segment_start)}
                  segmentEnd={parseInt(modellingParams.segment_end)}
                  height={300}
                  showControls={true}
                  isModelledStructure={true}
                />
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ height: "300px" }}
                >
                  <div className="text-center">
                    <div className="mb-3">
                      <FaCheck size={64} className="text-success" />
                    </div>
                    <h6>Modelling Complete</h6>
                    <p className="small text-muted">
                      {modellingResults.results.n_models} models generated
                      <br />
                      Final distance: {modellingResults.results.final_distance}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StructureComparison;
