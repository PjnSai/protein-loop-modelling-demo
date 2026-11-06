const DemoCallToAction = ({ onLogin }) => {
  return (
    <div className="card mt-4 border-primary">
      <div className="card-header bg-primary text-white">
        <h6 className="mb-0">About the Full Version</h6>
      </div>
      <div className="card-body">
        <p className="mb-3">
          This static demo shows saved results. The full application runs the
          modelling code live through the MATLAB Engine API and adds:
        </p>
        <div className="row">
          <div className="col-md-6">
            <ul className="list-unstyled">
              <li>Live MATLAB modelling for any segment</li>
              <li>Email sign-in with a one-time password</li>
              <li>Account lockout after repeated failed logins</li>
            </ul>
          </div>
          <div className="col-md-6">
            <ul className="list-unstyled">
              <li>Job history stored in PostgreSQL</li>
              <li>Activity logging for account security</li>
              <li>Profile and password management</li>
            </ul>
          </div>
        </div>
        <div className="text-center">
          <button className="btn btn-primary btn-lg" onClick={onLogin}>
            Continue as Demo User
          </button>
          <div className="small text-muted mt-2">
            See the dashboard and activity log with sample data
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoCallToAction;
