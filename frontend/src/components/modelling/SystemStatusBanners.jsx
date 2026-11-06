import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

const SystemStatusBanners = ({
  isAuthenticated,
  systemStatus,
}) => {
  return (
    <>
      {systemStatus &&
        !systemStatus.system_ready &&
        !systemStatus.demo_mode && (
          <div className="alert alert-warning" role="alert">
            <div className="d-flex align-items-center">
              <div className="me-3">
                <FaExclamationTriangle size={24} />
              </div>
              <div className="flex-grow-1">
                <strong>MATLAB System Unavailable:</strong>{" "}
                {systemStatus.message}
                <div className="small mt-1">
                  Loop modelling is temporarily unavailable. Please try again
                  later.
                </div>
              </div>
            </div>
          </div>
        )}

      {!isAuthenticated && (
        <div className="alert alert-info" role="alert">
          <div className="d-flex align-items-center">
            <div className="me-3">
              <FaInfoCircle size={24} />
            </div>
            <div className="flex-grow-1">
              <strong>Guest Mode - Pre-computed Results</strong>
              <div className="mt-1">
                Any structure can be fetched live from the RCSB Protein Data
                Bank. Results come from saved MATLAB runs for the example
                segments below.
                <Link
                  to="/login"
                  state={{ from: { pathname: "/dashboard" } }}
                  className="alert-link ms-1"
                >
                  Continue as demo user
                </Link>{" "}
                to see the job dashboard and activity log with sample data.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SystemStatusBanners;
