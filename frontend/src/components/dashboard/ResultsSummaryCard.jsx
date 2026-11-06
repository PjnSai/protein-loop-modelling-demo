const ResultsSummaryCard = ({ selectedJob }) => {
  if (!selectedJob.results) {
    return null;
  }

  return (
    <div className="card mt-3">
      <div className="card-header">
        <h6 className="mb-0">Results Summary</h6>
      </div>
      <div className="card-body">
        <table className="table table-sm">
          <tbody>
            <tr>
              <td>
                <strong>Models Generated:</strong>
              </td>
              <td>{selectedJob.results.n_models}</td>
            </tr>
            <tr>
              <td>
                <strong>Final Distance:</strong>
              </td>
              <td>{selectedJob.results.final_distance?.toFixed(4)}</td>
            </tr>
            <tr>
              <td>
                <strong>Iterations Used:</strong>
              </td>
              <td>{selectedJob.results.n_iterations_used}</td>
            </tr>
            <tr>
              <td>
                <strong>Degrees of Freedom:</strong>
              </td>
              <td>{selectedJob.results.degrees_of_freedom}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsSummaryCard;
