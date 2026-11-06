import React from "react";

const ChainSegmentControls = ({
  pdbData,
  selectedChain,
  setSelectedChain,
  modellingParams,
  setModellingParams,
}) => {
  return (
    <div className="row mt-3">
      <div className="col-md-4">
        <label className="form-label">Chain</label>
        <select
          className="form-select"
          value={selectedChain}
          onChange={(e) => setSelectedChain(e.target.value)}
        >
          {(pdbData.analysis?.chains || []).map((chain) => (
            <option key={chain} value={chain}>
              Chain {chain} ({pdbData.analysis?.residues?.[chain]?.count || 0}{" "}
              residues)
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-4">
        <label className="form-label">Segment Start</label>
        <input
          type="number"
          className="form-control"
          value={modellingParams.segment_start}
          onChange={(e) =>
            setModellingParams((prev) => ({
              ...prev,
              segment_start: e.target.value,
            }))
          }
          min={
            selectedChain &&
            pdbData.analysis?.residues?.[selectedChain]?.range?.[0]
          }
          max={
            selectedChain &&
            pdbData.analysis?.residues?.[selectedChain]?.range?.[1]
          }
          placeholder="Start residue"
        />
      </div>
      <div className="col-md-4">
        <label className="form-label">Segment End</label>
        <input
          type="number"
          className="form-control"
          value={modellingParams.segment_end}
          onChange={(e) =>
            setModellingParams((prev) => ({
              ...prev,
              segment_end: e.target.value,
            }))
          }
          min={
            selectedChain &&
            pdbData.analysis?.residues?.[selectedChain]?.range?.[0]
          }
          max={
            selectedChain &&
            pdbData.analysis?.residues?.[selectedChain]?.range?.[1]
          }
          placeholder="End residue"
        />
      </div>
    </div>
  );
};

export default ChainSegmentControls;
