import React from "react";

const ParametersUsedTable = ({ modellingResults }) => {
  return (
    <div className="col-md-6">
      <h6>Parameters Used</h6>
      <table className="table table-sm">
        <tbody>
          <tr>
            <td>
              <strong>Chain:</strong>
            </td>
            <td>{modellingResults.parameters?.chain || "N/A"}</td>
          </tr>
          <tr>
            <td>
              <strong>Segment:</strong>
            </td>
            <td>
              {modellingResults.parameters?.segment_start || "N/A"} -{" "}
              {modellingResults.parameters?.segment_end || "N/A"}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Iterations:</strong>
            </td>
            <td>{modellingResults.parameters?.n_iterations || "Not recorded"}</td>
          </tr>
          <tr>
            <td>
              <strong>Target Phi Angles:</strong>
            </td>
            <td>
              {modellingResults.parameters?.target_phi &&
              modellingResults.parameters.target_phi.length > 0 ? (
                modellingResults.parameters.target_phi.map((target, index) => (
                  <span key={index} className="badge bg-info me-1">
                    {target.residue}: {target.angle}°
                  </span>
                ))
              ) : (
                <span className="text-muted">None specified</span>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Target Psi Angles:</strong>
            </td>
            <td>
              {modellingResults.parameters?.target_psi &&
              modellingResults.parameters.target_psi.length > 0 ? (
                modellingResults.parameters.target_psi.map((target, index) => (
                  <span key={index} className="badge bg-info me-1">
                    {target.residue}: {target.angle}°
                  </span>
                ))
              ) : (
                <span className="text-muted">None specified</span>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Constrained Phi:</strong>
            </td>
            <td>
              {modellingResults.parameters?.constrained_phi &&
              modellingResults.parameters.constrained_phi.length > 0 ? (
                modellingResults.parameters.constrained_phi.map(
                  (residue, index) => (
                    <span key={index} className="badge bg-warning me-1">
                      {residue}
                    </span>
                  ),
                )
              ) : (
                <span className="text-muted">None selected</span>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Constrained Psi:</strong>
            </td>
            <td>
              {modellingResults.parameters?.constrained_psi &&
              modellingResults.parameters.constrained_psi.length > 0 ? (
                modellingResults.parameters.constrained_psi.map(
                  (residue, index) => (
                    <span key={index} className="badge bg-warning me-1">
                      {residue}
                    </span>
                  ),
                )
              ) : (
                <span className="text-muted">None selected</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ParametersUsedTable;
