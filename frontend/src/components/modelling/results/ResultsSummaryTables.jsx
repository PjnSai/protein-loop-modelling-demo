import React from "react";

// Saved runs may not include every number
const show = (value, suffix = "") =>
  value === undefined || value === null ? (
    <span className="text-muted">Not recorded</span>
  ) : (
    `${value}${suffix}`
  );

const formatSeconds = (value) =>
  typeof value === "number" ? value.toFixed(2) : value;

const ResultsSummaryTables = ({ modellingResults }) => {
  return (
    <div className="row">
      <div className="col-md-6">
        <table className="table table-sm">
          <tbody>
            <tr>
              <td>
                <strong>Models Generated:</strong>
              </td>
              <td>{show(modellingResults.results.n_models)}</td>
            </tr>
            <tr>
              <td>
                <strong>Final Distance:</strong>
              </td>
              <td>{show(modellingResults.results.final_distance)}</td>
            </tr>
            <tr>
              <td>
                <strong>Iterations Used:</strong>
              </td>
              <td>{show(modellingResults.results.n_iterations_used)}</td>
            </tr>
            <tr>
              <td>
                <strong>Processing Time:</strong>
              </td>
              <td>
                {show(
                  formatSeconds(
                    modellingResults.processing_time ??
                      modellingResults.results.optimization_time,
                  ),
                  "s",
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="col-md-6">
        <table className="table table-sm">
          <tbody>
            <tr>
              <td>
                <strong>Degrees of Freedom:</strong>
              </td>
              <td>{show(modellingResults.results.degrees_of_freedom)}</td>
            </tr>
            <tr>
              <td>
                <strong>RMSD Initial:</strong>
              </td>
              <td>{show(modellingResults.results.rmsd_initial)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsSummaryTables;
