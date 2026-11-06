import { useState } from "react";
import { Link } from "react-router-dom";

import { requestPasswordReset } from "../api/auth";

import RequestResetForm from "../components/forms/RequestResetForm";

const RequestReset = () => {
  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);

    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { ok, data } = await requestPasswordReset(email);

      if (ok) {
        setSuccess(true);
      } else {
        setError(data?.error || "Could not send reset email.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card border-0 shadow">
              <div className="card-body text-center p-5">
                <div className="text-success mb-3">
                  <svg
                    width="64"
                    height="64"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                  </svg>
                </div>
                <h5 className="text-success">Email Sent</h5>
                <p className="text-muted">
                  Check your inbox for the reset link.
                </p>
                <Link to="/login" className="btn btn-outline-primary mt-3">
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card border-0 shadow">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h3 className="fw-bold text-primary">Forgot Password?</h3>
                <p className="text-muted">
                  Enter your email to receive a reset link
                </p>
              </div>
              <RequestResetForm
                email={email}
                onChange={handleChange}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                error={error}
              />
              <div className="text-center mt-4">
                <Link to="/login" className="text-muted text-decoration-none">
                  ← Back to Login
                </Link>
              </div>
              <div className="mt-4 p-3 bg-light rounded">
                <small className="text-muted">
                  We'll send a secure link to your email to reset your password.
                  It will expire in 10 minutes.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestReset;
