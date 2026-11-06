import React from "react";

const IterationsControl = ({
  value,
  onChange,
  suggestedValue,
}) => {
  return (
    <div className="mb-3">
      <label className="form-label">Number of Iterations</label>
      <input
        type="number"
        className="form-control"
        value={value}
        onChange={(e) => {
          const newValue = Math.max(
            1000,
            Math.min(
              50000,
              parseInt(e.target.value) || 10000,
            ),
          );
          onChange(newValue);
        }}
        min="1000"
        max="50000"
        step="1000"
      />
      <div className="form-text">
        Suggested: {suggestedValue || 10000}
      </div>
    </div>
  );
};

export default IterationsControl;
