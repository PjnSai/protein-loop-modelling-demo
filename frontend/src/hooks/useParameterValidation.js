import { useState, useCallback } from "react";

export const useParameterValidation = () => {
  const [conflicts, setConflicts] = useState([]);

  const detectConflicts = useCallback((params) => {
    const conflicts = [];

    const phiTargets = params.targetPhi.map((t) => t.residue);
    const psiTargets = params.targetPsi.map((t) => t.residue);

    const phiConflicts = phiTargets.filter((r) =>
      params.constrainedPhi.includes(r),
    );
    if (phiConflicts.length > 0) {
      conflicts.push({
        type: "phi",
        residues: phiConflicts,
        message: `Phi conflict: Residue(s) ${phiConflicts.join(", ")} are both targeted and constrained for phi angle`,
      });
    }

    const psiConflicts = psiTargets.filter((r) =>
      params.constrainedPsi.includes(r),
    );
    if (psiConflicts.length > 0) {
      conflicts.push({
        type: "psi",
        residues: psiConflicts,
        message: `Psi conflict: Residue(s) ${psiConflicts.join(", ")} are both targeted and constrained for psi angle`,
      });
    }

    return conflicts;
  }, []);

  const hasConflicts = conflicts.length > 0;

  const getConflictMessage = () => {
    if (conflicts.length === 0) return null;
    return conflicts.map((conflict) => conflict.message).join(". ");
  };

  return {
    conflicts,
    setConflicts,
    detectConflicts,
    hasConflicts,
    getConflictMessage,
  };
};

export default useParameterValidation;
