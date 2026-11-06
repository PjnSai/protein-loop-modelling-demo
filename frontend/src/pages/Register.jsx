import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import RegisterForm from "../components/forms/RegisterForm";

import { register } from "../api/auth";

import { validatePassword } from "../utils/validators";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    const { email, password, confirmPassword } = formData;

    const error = validatePassword(password, confirmPassword);

    if (error) {
      setError(error);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { ok, data } = await register(email, password);

      if (ok) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(data.error || "Registration failed");
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
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                  </svg>
                </div>
                <h5 className="text-success">Registration Successful!</h5>
                <p className="text-muted">
                  Your account has been created successfully. Redirecting to
                  login page...
                </p>
                <div className="spinner-border spinner-border-sm text-primary mt-3"></div>
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
                <h3 className="fw-bold text-primary">Create Account</h3>
                <p className="text-muted">
                  Join the Protein Loop Modelling Server
                </p>
              </div>
              <RegisterForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                error={error}
              />
              <div className="text-center mt-4">
                <p className="text-muted">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary text-decoration-none"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
              <div className="text-center mt-3">
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

export default Register;
