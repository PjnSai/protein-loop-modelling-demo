import React from "react";

const SegmentInfoCard = ({ preparation }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h6>Segment Information</h6>
      </div>
      <div className="card-body">
        <table className="table table-sm">
          <tbody>
            <tr>
              <td>
                <strong>PDB Code:</strong>
              </td>
              <td>{preparation.pdb_code}</td>
            </tr>
            <tr>
              <td>
                <strong>Chain:</strong>
              </td>
              <td>{preparation.chain}</td>
            </tr>
            <tr>
              <td>
                <strong>Segment:</strong>
              </td>
              <td>
                {preparation.segment_start} - {preparation.segment_end}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Length:</strong>
              </td>
              <td>{preparation.segment_length} residues</td>
            </tr>
            <tr>
              <td>
                <strong>Est. DOF:</strong>
              </td>
              <td>{preparation.degrees_of_freedom}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SegmentInfoCard;
