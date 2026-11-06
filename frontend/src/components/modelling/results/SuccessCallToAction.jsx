import React from "react";

const SuccessCallToAction = () => {
  return (
    <div className="card mt-4 border-success">
      <div className="card-header bg-success text-white">
        <h6 className="mb-0">
          Saved Result Loaded
        </h6>
      </div>
      <div className="card-body">
        <p className="mb-3">
          This result was produced by the MATLAB modelling code in an earlier
          run and saved for the demo. You can:
        </p>
        <div className="row">
          <div className="col-md-6">
            <ul className="list-unstyled">
              <li>Download the modelled PDB structure</li>
              <li>Analyse the structural changes</li>
              <li>View detailed results in your dashboard</li>
            </ul>
          </div>
          <div className="col-md-6">
            <ul className="list-unstyled">
              <li>Compare original vs modelled structures</li>
              <li>Try the other saved examples</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessCallToAction;
