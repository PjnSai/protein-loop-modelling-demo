import { FaLock } from "react-icons/fa";

const SecurityInfoSection = () => {
  return (
    <div className="row mt-4">
      <div className="col-md-8">
        <div className="card bg-light">
          <div className="card-body">
            <h6 className="card-title">
              <FaLock className="me-2 text-info" />
              Security Information
            </h6>
            <ul className="mb-0 small">
              <li>
                All login attempts and account activities are logged for
                security monitoring
              </li>
              <li>
                Check for any suspicious activity from unknown IP addresses
                regularly
              </li>
              <li>
                Accounts are temporarily locked after repeated failed login
                attempts
              </li>
              <li>
                If you notice unauthorised access, change your password
                immediately
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card bg-primary text-white">
          <div className="card-body text-center">
            <h6 className="card-title">Account Security</h6>
            <p className="card-text small">
              Keep your account secure by using strong passwords and monitoring
              this activity log.
            </p>
            <a href="/profile" className="btn btn-light btn-sm">
              Manage Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityInfoSection;
