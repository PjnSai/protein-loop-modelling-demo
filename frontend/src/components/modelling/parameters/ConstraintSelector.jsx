import { FaLock } from "react-icons/fa";

const ConstraintSelector = ({
  title,
  availableResidues,
  selectedConstraints,
  targetedResidues,
  onToggleConstraint,
  constraintType,
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <h6>{title}</h6>
      </div>
      <div className="card-body">
        <div className="row g-2">
          {availableResidues.map((residue) => {
            const isConstrained = selectedConstraints.includes(residue);
            const isTargeted = targetedResidues.includes(residue);

            let buttonClass;
            if (isConstrained) {
              buttonClass =
                constraintType === "phi" ? "btn-warning" : "btn-info";
            } else if (isTargeted) {
              buttonClass = "btn-outline-secondary";
            } else {
              buttonClass = "btn-outline-primary";
            }

            return (
              <div key={residue} className="col-auto">
                <button
                  type="button"
                  className={`btn btn-sm ${buttonClass}`}
                  onClick={() => !isTargeted && onToggleConstraint(residue)}
                  disabled={isTargeted}
                  title={
                    isTargeted
                      ? `Cannot constrain - residue ${residue} is already targeted for ${constraintType}`
                      : isConstrained
                        ? `Click to remove ${constraintType} constraint on residue ${residue}`
                        : `Click to constrain ${constraintType} angle for residue ${residue}`
                  }
                >
                  {isConstrained && <FaLock className="me-1" />}
                  {residue}
                </button>
              </div>
            );
          })}
        </div>
        <div className="mt-2">
          <small className="text-muted">
            Click residues to constrain their {constraintType} angles.
            Constrained residues cannot also be targeted.
          </small>
        </div>
      </div>
    </div>
  );
};

export default ConstraintSelector;
