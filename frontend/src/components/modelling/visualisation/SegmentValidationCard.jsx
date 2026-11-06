import React from "react";
import { FaInfoCircle } from "react-icons/fa";

const SegmentValidationCard = ({
  selectedChain,
  pdbData,
  modellingParams,
}) => {
  if (!selectedChain || !pdbData.analysis?.residues?.[selectedChain]) {
    return null;
  }

  const chainData = pdbData.analysis.residues[selectedChain];
  const segmentStart = parseInt(modellingParams.segment_start);
  const segmentEnd = parseInt(modellingParams.segment_end);

  const getValidationAlert = () => {
    if (!modellingParams.segment_start || !modellingParams.segment_end) {
      return null;
    }

    if (
      segmentStart < chainData.range?.[0] ||
      segmentEnd > chainData.range?.[1]
    ) {
      return (
        <div className="alert alert-warning alert-sm">
          Segment outside chain range
        </div>
      );
    }

    if (segmentEnd - segmentStart < 3) {
      return (
        <div className="alert alert-warning alert-sm">
          Segment too short (min 3 residues)
        </div>
      );
    }

    if (segmentEnd - segmentStart > 20) {
      return (
        <div className="alert alert-info alert-sm">
          <FaInfoCircle className="me-1" />
          Large segment - may take longer to process
        </div>
      );
    }

    return (
      <div className="alert alert-success alert-sm">
        Valid segment ({segmentEnd - segmentStart + 1} residues)
      </div>
    );
  };

  return (
    <div className="card mt-3">
      <div className="card-header">
        <h6>Chain {selectedChain} Information</h6>
      </div>
      <div className="card-body">
        <p>
          <strong>Residue Range:</strong> {chainData.range?.[0]} -{" "}
          {chainData.range?.[1]}
        </p>
        <p>
          <strong>Total Residues:</strong> {chainData.count}
        </p>
        {modellingParams.segment_start && modellingParams.segment_end && (
          <div className="mt-2">{getValidationAlert()}</div>
        )}
      </div>
    </div>
  );
};

export default SegmentValidationCard;
