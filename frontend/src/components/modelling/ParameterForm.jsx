import { useState, useEffect } from "react";
import { FaExclamationTriangle, FaCheck } from "react-icons/fa";
import { useParameterValidation } from "../../hooks";
import AngleTargetSection from "./parameters/AngleTargetSection";
import ConstraintSelector from "./parameters/ConstraintSelector";
import SegmentInfoCard from "./parameters/SegmentInfoCard";
import MatlabExampleCard from "./parameters/MatlabExampleCard";
import IterationsControl from "./parameters/IterationsControl";
import SubmitSection from "./parameters/SubmitSection";

const ParameterForm = ({
  preparation,
  modellingParams,
  isLoading,
  onSubmit,
  onBack,
}) => {
  const [parameters, setParameters] = useState({
    targetPhi: [],
    targetPsi: [],
    constrainedPhi: [],
    constrainedPsi: [],
    n_iterations: 10000,
  });

  const [availableResidues, setAvailableResidues] = useState([]);

  const { setConflicts, detectConflicts, hasConflicts, getConflictMessage } =
    useParameterValidation();

  useEffect(() => {
    if (preparation) {
      const residues = [];
      for (
        let i = preparation.segment_start;
        i <= preparation.segment_end;
        i++
      ) {
        residues.push(i);
      }
      setAvailableResidues(residues);

      setParameters((prev) => ({
        ...prev,
        n_iterations:
          parseInt(modellingParams.n_iterations) ||
          preparation.suggested_parameters?.n_iterations ||
          10000,
      }));
    }
  }, [preparation, modellingParams.n_iterations]);

  useEffect(() => {
    const newConflicts = detectConflicts(parameters);
    setConflicts(newConflicts);
  }, [parameters, detectConflicts, setConflicts]);

  const getPhiUsedResidues = () => {
    return [
      ...parameters.targetPhi.map((t) => t.residue),
      ...parameters.constrainedPhi,
    ];
  };

  const getPsiUsedResidues = () => {
    return [
      ...parameters.targetPsi.map((t) => t.residue),
      ...parameters.constrainedPsi,
    ];
  };

  const handleSubmit = () => {
    if (hasConflicts) {
      return;
    }

    // Convert internal UI state to backend MATLAB-compatible format
    const backendParams = {
      ...modellingParams,
      target_phi: parameters.targetPhi,
      target_psi: parameters.targetPsi,
      constrained_phi: parameters.constrainedPhi,
      constrained_psi: parameters.constrainedPsi,
      n_iterations: parameters.n_iterations,
    };

    onSubmit(backendParams);
  };

  const addTarget = (angleType) => {
    let usedResidues;
    if (angleType === "phi") {
      usedResidues = getPhiUsedResidues();
    } else {
      usedResidues = getPsiUsedResidues();
    }

    const availableForNew = availableResidues.filter(
      (r) => !usedResidues.includes(r),
    );
    if (availableForNew.length === 0) return;

    const newTarget = {
      residue: availableForNew[0],
      angle: angleType === "phi" ? 0 : 0,
    };

    if (angleType === "phi") {
      setParameters((prev) => ({
        ...prev,
        targetPhi: [...prev.targetPhi, newTarget],
      }));
    } else {
      setParameters((prev) => ({
        ...prev,
        targetPsi: [...prev.targetPsi, newTarget],
      }));
    }
  };

  const removeTarget = (angleType, index) => {
    if (angleType === "phi") {
      setParameters((prev) => ({
        ...prev,
        targetPhi: prev.targetPhi.filter((_, i) => i !== index),
      }));
    } else {
      setParameters((prev) => ({
        ...prev,
        targetPsi: prev.targetPsi.filter((_, i) => i !== index),
      }));
    }
  };

  const updateTarget = (angleType, index, field, value) => {
    if (angleType === "phi") {
      setParameters((prev) => ({
        ...prev,
        targetPhi: prev.targetPhi.map((target, i) =>
          i === index
            ? {
                ...target,
                [field]:
                  field === "residue"
                    ? parseInt(value) || 0
                    : value === "" || value === "-"
                      ? value
                      : parseFloat(value) || 0,
              }
            : target,
        ),
      }));
    } else {
      setParameters((prev) => ({
        ...prev,
        targetPsi: prev.targetPsi.map((target, i) =>
          i === index
            ? {
                ...target,
                [field]:
                  field === "residue"
                    ? parseInt(value) || 0
                    : value === "" || value === "-"
                      ? value
                      : parseFloat(value) || 0,
              }
            : target,
        ),
      }));
    }
  };

  const toggleConstraint = (angleType, residue) => {
    if (angleType === "phi") {
      setParameters((prev) => ({
        ...prev,
        constrainedPhi: prev.constrainedPhi.includes(residue)
          ? prev.constrainedPhi.filter((r) => r !== residue)
          : [...prev.constrainedPhi, residue],
      }));
    } else {
      setParameters((prev) => ({
        ...prev,
        constrainedPsi: prev.constrainedPsi.includes(residue)
          ? prev.constrainedPsi.filter((r) => r !== residue)
          : [...prev.constrainedPsi, residue],
      }));
    }
  };

  const applyParameters = (values) => {
    setParameters({
      targetPhi: values.target_phi || [],
      targetPsi: values.target_psi || [],
      constrainedPhi: values.constrained_phi || [],
      constrainedPsi: values.constrained_psi || [],
      n_iterations: values.n_iterations || parameters.n_iterations,
    });
  };
  const hasSavedResult = Boolean(preparation.saved_parameters);

  const hasTargetsOrConstraints =
    parameters.targetPhi.length > 0 ||
    parameters.targetPsi.length > 0 ||
    parameters.constrainedPhi.length > 0 ||
    parameters.constrainedPsi.length > 0;

  return (
    <div className="card">
      <div className="card-header">
        <h5>Step 3: Modelling Parameters</h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <SegmentInfoCard preparation={preparation} />
          </div>
          <div className="col-md-6">
            <IterationsControl
              value={parameters.n_iterations}
              onChange={(newValue) =>
                setParameters((prev) => ({ ...prev, n_iterations: newValue }))
              }
              suggestedValue={preparation.suggested_parameters?.n_iterations}
            />
          </div>
        </div>
        {hasSavedResult ? (
          <div className="alert alert-info mt-3 mb-0">
            This segment has a verified MATLAB result. Live modelling isn&apos;t
            available in the demo, so the result is shown only for the exact
            parameters of that run. Use <strong>Enter These Parameters</strong>{" "}
            in the MATLAB Parameters box below, then submit.
          </div>
        ) : (
          <div className="alert alert-warning mt-3 mb-0">
            Live modelling isn&apos;t available in the demo, and there is no
            verified result for this segment. You can still try out the
            parameters, but submitting won&apos;t produce an output.
          </div>
        )}

        <div className="mt-4">
          {hasConflicts ? (
            <div className="alert alert-danger mb-3">
              <FaExclamationTriangle className="me-2" />
              <strong>Parameter Conflicts Detected:</strong>
              <p className="mb-0 mt-2">{getConflictMessage()}</p>
            </div>
          ) : (
            hasTargetsOrConstraints && (
              <div className="alert alert-success py-2 mb-3">
                <FaCheck className="me-2" />
                <strong>No conflicts detected.</strong> All parameters are
                valid.
              </div>
            )
          )}

          <AngleTargetSection
            angleType="phi"
            targets={parameters.targetPhi}
            availableResidues={availableResidues}
            usedResidues={getPhiUsedResidues()}
            onAdd={() => addTarget("phi")}
            onRemove={(index) => removeTarget("phi", index)}
            onUpdate={(index, field, value) =>
              updateTarget("phi", index, field, value)
            }
          />
          <AngleTargetSection
            angleType="psi"
            targets={parameters.targetPsi}
            availableResidues={availableResidues}
            usedResidues={getPsiUsedResidues()}
            onAdd={() => addTarget("psi")}
            onRemove={(index) => removeTarget("psi", index)}
            onUpdate={(index, field, value) =>
              updateTarget("psi", index, field, value)
            }
          />
          <div className="row">
            <div className="col-md-6">
              <ConstraintSelector
                title="Constrained Phi Residues"
                availableResidues={availableResidues}
                selectedConstraints={parameters.constrainedPhi}
                targetedResidues={parameters.targetPhi.map((t) => t.residue)}
                onToggleConstraint={(residue) =>
                  toggleConstraint("phi", residue)
                }
                constraintType="phi"
              />
            </div>
            <div className="col-md-6">
              <ConstraintSelector
                title="Constrained Psi Residues"
                availableResidues={availableResidues}
                selectedConstraints={parameters.constrainedPsi}
                targetedResidues={parameters.targetPsi.map((t) => t.residue)}
                onToggleConstraint={(residue) =>
                  toggleConstraint("psi", residue)
                }
                constraintType="psi"
              />
            </div>
          </div>
          <MatlabExampleCard
            preparation={preparation}
            onApply={applyParameters}
          />
        </div>
        <SubmitSection
          onSubmit={handleSubmit}
          onBack={onBack}
          isLoading={isLoading}
          hasConflicts={hasConflicts}
        />
      </div>
    </div>
  );
};

export default ParameterForm;
