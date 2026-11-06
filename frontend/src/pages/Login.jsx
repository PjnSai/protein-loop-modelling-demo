/* The static demo has no accounts and never asks for a password. Visitors
   continue as a sample demo user instead. */
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaLock, FaUserCheck } from "react-icons/fa";

import useAuth from "../hooks/useAuth";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signInAsDemo } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // Get the page user was trying to access before being redirected to login
  const from = location.state?.from?.pathname || "/dashboard";

  const handleContinue = async () => {
    setIsLoading(true);
    const { success } = await signInAsDemo();
    setIsLoading(false);
    if (success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-5">
          <div className="card border-0 shadow">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <h3 className="fw-bold text-primary">Sign In</h3>
                <p className="text-muted mb-0">
                  This is a static demo, so there are no real accounts.
                </p>
                {from !== "/dashboard" && (
                  <small className="text-info">
                    You&apos;ll be taken to {from} after signing in
                  </small>
                )}
              </div>
              <div className="d-grid">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={handleContinue}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <FaUserCheck className="me-2" />
                      Continue as Demo User
                    </>
                  )}
                </button>
              </div>
              <p className="small text-muted text-center mt-2 mb-0">
                You&apos;ll see a dashboard, activity log and profile filled
                with sample data. Changes last until you close the tab.
              </p>
              <div className="mt-4 p-3 bg-light rounded">
                <small className="text-muted">
                  <strong>
                    <FaLock className="me-1" />
                    In the full version:
                  </strong>{" "}
                  users sign in with an email and password, then enter a
                  one-time password (OTP) sent by email. Repeated failed
                  attempts lock the account temporarily.
                </small>
              </div>
              <div className="text-center mt-4">
                <Link to="/" className="text-muted text-decoration-none">
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
