const ProgressSteps = ({ currentStep, totalSteps = 4 }) => {
  const steps = [
    "1. PDB Input",
    "2. Structure View",
    "3. Parameters",
    "4. Results",
  ];

  return (
    <div className="mb-4">
      <div className="row">
        <div className="col">
          <div className="progress" style={{ height: "10px" }}>
            <div
              className="progress-bar"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
          <div className="d-flex justify-content-between mt-2">
            {steps.map((stepLabel, index) => (
              <small
                key={index}
                className={
                  currentStep >= index + 1
                    ? "text-primary fw-bold"
                    : "text-muted"
                }
              >
                {stepLabel}
              </small>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSteps;
