const TestingInstructions = ({ isAuthenticated }) => {
  return (
    <div className="card mt-4">
      <div className="card-header bg-info text-white">
        <h6 className="mb-0">How to Use the Demo</h6>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <h6>See a Saved Result</h6>
            <ol className="small">
              <li>
                Click a green example under{" "}
                <strong>&quot;With pre-computed results&quot;</strong>
              </li>
              <li>
                <strong>&quot;Fetch Structure&quot;</strong> (downloaded live
                from RCSB)
              </li>
              <li>
                Check the chain and segment, then{" "}
                <strong>&quot;Continue to Parameters&quot;</strong>
              </li>
              <li>
                Optionally <strong>&quot;Use the saved run&apos;s
                parameters&quot;</strong>
              </li>
              <li>
                <strong>&quot;Show Pre-computed Result&quot;</strong> to compare
                the original and modelled structures and download the PDB file
              </li>
            </ol>
          </div>
          <div className="col-md-6">
            <h6>Explore Other Structures</h6>
            <ol className="small">
              <li>
                Enter any 4-character PDB code (e.g. <code>1UBQ</code>,{" "}
                <code>2LYZ</code>)
              </li>
              <li>View it in 3D and select a chain and segment</li>
              <li>Set target angles and constraints in the parameter form</li>
            </ol>
            <p className="small text-muted mb-2">
              Live modelling needs MATLAB, which this static demo doesn&apos;t
              have, so results only exist for the saved examples.
            </p>
            <div className="mt-2">
              <strong className="small me-2">Mode:</strong>
              <span
                className={`badge ${isAuthenticated ? "bg-success" : "bg-info"}`}
              >
                {isAuthenticated
                  ? "Demo user - opened results appear in the dashboard"
                  : "Guest - pre-computed results"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestingInstructions;
