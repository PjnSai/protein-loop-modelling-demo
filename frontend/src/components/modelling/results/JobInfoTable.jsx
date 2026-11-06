import React from "react";

const JobInfoTable = ({ modellingResults }) => {
  return (
    <div className="col-md-6">
      <h6>Job Information</h6>
      <table className="table table-sm">
        <tbody>
          <tr>
            <td>
              <strong>Job ID:</strong>
            </td>
            <td>
              <code>{modellingResults.job_id}</code>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Status:</strong>
            </td>
            <td>
              <span
                className={`badge ${modellingResults.status === "completed" ? "bg-success" : "bg-info"}`}
              >
                {modellingResults.status}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <strong>PDB Code:</strong>
            </td>
            <td>{modellingResults.pdb_code}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default JobInfoTable;
