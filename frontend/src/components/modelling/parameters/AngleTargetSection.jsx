import { FaPlus, FaTimes } from "react-icons/fa";

const AngleTargetSection = ({
  angleType,
  targets,
  availableResidues,
  usedResidues,
  onAdd,
  onRemove,
  onUpdate,
}) => {
  const validateAngle = (value) => {
    if (value === "" || value === "-") {
      return value;
    }

    const numValue = parseFloat(value);

    if (isNaN(numValue)) {
      return 0;
    }

    if (numValue < -180) {
      return -180;
    }
    if (numValue > 180) {
      return 180;
    }

    return numValue;
  };

  const handleAngleChange = (index, value) => {
    const validatedValue = validateAngle(value);
    onUpdate(index, "angle", validatedValue);
  };

  const availableForSelection = availableResidues.filter(
    (residue) => !usedResidues.includes(residue),
  );

  return (
    <div className="card mb-3">
      <div className="card-header">
        <h6>
          Target {angleType.charAt(0).toUpperCase() + angleType.slice(1)} Angles
        </h6>
      </div>
      <div className="card-body">
        {targets.map((target, index) => (
          <div key={index} className="row mb-2 align-items-center">
            <div className="col-md-4">
              <select
                className="form-select form-select-sm"
                value={target.residue}
                onChange={(e) =>
                  onUpdate(index, "residue", parseInt(e.target.value))
                }
              >
                {/* Always include the current residue as an option */}
                <option value={target.residue}>{target.residue}</option>
                {/* Include other available residues that aren't already used */}
                {availableResidues
                  .filter(
                    (r) => !usedResidues.includes(r) || r === target.residue,
                  )
                  .map((residue) => (
                    <option key={residue} value={residue}>
                      {residue}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-md-4">
              <input
                type="number"
                className="form-control form-control-sm"
                value={target.angle}
                onChange={(e) => handleAngleChange(index, e.target.value)}
                onBlur={(e) => {
                  const value = e.target.value;
                  if (value === "" || value === "-") {
                    onUpdate(index, "angle", 0);
                  }
                }}
                min="-180"
                max="180"
                step="1"
                placeholder="Angle (degrees)"
                title="Enter angle between -180 and 180 degrees"
              />
            </div>
            <div className="col-md-4">
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => onRemove(index)}
                title={`Remove ${angleType} target for residue ${target.residue}`}
              >
                <FaTimes />
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={onAdd}
          disabled={availableForSelection.length === 0}
          title={
            availableForSelection.length === 0
              ? `All residues are already used for ${angleType} targets or constraints`
              : `Add new ${angleType} target`
          }
        >
          <FaPlus className="me-1" />
          Add {angleType.charAt(0).toUpperCase() + angleType.slice(1)} Target
        </button>
        {availableForSelection.length === 0 && targets.length > 0 && (
          <small className="text-muted mt-2 d-block">
            All available residues are being used.
          </small>
        )}
      </div>
    </div>
  );
};

export default AngleTargetSection;
