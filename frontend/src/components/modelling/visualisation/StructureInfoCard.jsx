import React from "react";

const StructureInfoCard = ({ pdbData }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h6>Structure Information</h6>
      </div>
      <div className="card-body">
        <table className="table table-sm">
          <tbody>
            <tr>
              <td>
                <strong>PDB Code:</strong>
              </td>
              <td>{pdbData.pdb_code}</td>
            </tr>
            <tr>
              <td>
                <strong>Title:</strong>
              </td>
              <td>{pdbData.analysis?.title || "N/A"}</td>
            </tr>
            <tr>
              <td>
                <strong>Method:</strong>
              </td>
              <td>{pdbData.analysis?.method || "N/A"}</td>
            </tr>
            <tr>
              <td>
                <strong>Resolution:</strong>
              </td>
              <td>
                {pdbData.analysis?.resolution
                  ? `${pdbData.analysis.resolution}Å`
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Chains:</strong>
              </td>
              <td>{(pdbData.analysis?.chains || []).join(", ")}</td>
            </tr>
            <tr>
              <td>
                <strong>Total Residues:</strong>
              </td>
              <td>{pdbData.analysis?.total_residues || 0}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StructureInfoCard;
