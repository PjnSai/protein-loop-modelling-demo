import React from "react";

// Parameters used by the verified MATLAB run for 1ADG segment 290-301
const EXAMPLE_1ADG_PARAMETERS = {
  n_iterations: 6000,
  target_phi: [
    { residue: 291, angle: -90 },
    { residue: 292, angle: -110 },
    { residue: 293, angle: -64 },
    { residue: 294, angle: -90 },
  ],
  target_psi: [
    { residue: 291, angle: 122 },
    { residue: 292, angle: -35 },
    { residue: 293, angle: 147 },
  ],
  constrained_phi: [295, 296],
  constrained_psi: [294, 295],
};

const MatlabExampleCard = ({ preparation, onApply }) => {
  if (
    preparation.pdb_code?.toLowerCase() !== "1adg" ||
    preparation.segment_start !== 290 ||
    preparation.segment_end !== 301
  ) {
    return null;
  }

  return (
    <div className="alert alert-info mt-3">
      <h6>MATLAB Parameters (1ADG Segment 290-301):</h6>
      <div className="row">
        <div className="col-md-6">
          <p className="mb-1">
            <strong>Target Phi Angles:</strong>
          </p>
          <ul className="small mb-2">
            <li>Residue 291: -90°</li>
            <li>Residue 292: -110°</li>
            <li>Residue 293: -64°</li>
            <li>Residue 294: -90°</li>
          </ul>
          <p className="mb-1">
            <strong>Constrained Phi:</strong> 295, 296
          </p>
        </div>
        <div className="col-md-6">
          <p className="mb-1">
            <strong>Target Psi Angles:</strong>
          </p>
          <ul className="small mb-2">
            <li>Residue 291: 122°</li>
            <li>Residue 292: -35°</li>
            <li>Residue 293: 147°</li>
          </ul>
          <p className="mb-1">
            <strong>Constrained Psi:</strong> 294, 295
          </p>
        </div>
      </div>
      <p className="mb-2">
        <strong>Iterations:</strong> {EXAMPLE_1ADG_PARAMETERS.n_iterations}
      </p>
      <small className="text-muted d-block mb-2">
        Same residue can have both phi and psi targets - these are independent
        backbone angles.
      </small>
      {onApply && (
        <button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() => onApply(EXAMPLE_1ADG_PARAMETERS)}
        >
          Enter These Parameters
        </button>
      )}
    </div>
  );
};

export default MatlabExampleCard;
