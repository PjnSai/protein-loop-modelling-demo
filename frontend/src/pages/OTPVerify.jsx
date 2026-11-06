import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaShieldAlt } from "react-icons/fa";

import OTPForm from "../components/forms/OTPForm";

import { verifyOTP, resendOTP } from "../api/auth";

import useAuth from "../hooks/useAuth";

const OTPVerify = () => {
  const [otp, setOtp] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const returnTo = location.state?.returnTo || "/dashboard";

  const { refreshUser } = useAuth();

  const OTP_EXPIRY = 300;
  const RESEND_DELAY = 60;

  useEffect(() => {
    if (!email) {
      navigate("/login");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setError("OTP has expired. Please login again.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [email, navigate]);

  const handleChange = (e) => {
    // Extract numeric characters only and limit to 6 digits
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);

    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6)
      return setError("Please enter the complete 6-digit OTP");

    setIsLoading(true);
    setError(null);

    try {
      const { ok, data } = await verifyOTP(email, otp);

      if (ok) {
        await refreshUser();

        setTimeout(() => {
          navigate(returnTo, { replace: true });
        }, 100);
      } else {
        setError(data.error || "Invalid OTP");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { ok, data } = await resendOTP(email);

      if (ok) {
        setTimeLeft(300);
        alert("New OTP sent to your email");
      } else {
        setError(data.error || "Failed to resend OTP");
      }
    } catch {
      setError("Failed to resend OTP");
    } finally {
      setIsLoading(false);
    }
  };

  if (!email) return null;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card border-0 shadow">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <div className="text-primary mb-3">
                  <svg
                    width="64"
                    height="64"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zM3 6v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1zM5 8a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0V8zm4 0a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0V8z" />
                  </svg>
                </div>
                <h3 className="fw-bold text-primary">Verify Your Identity</h3>
                <p className="text-muted">
                  We've sent a 6-digit code to
                  <br />
                  <strong>{email}</strong>
                </p>
                {returnTo !== "/dashboard" && (
                  <small className="text-info">
                    You'll be redirected to {returnTo} after verification
                  </small>
                )}
              </div>
              <OTPForm
                otp={otp}
                onChange={handleChange}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                timeLeft={timeLeft}
                error={error}
              />
              <div className="text-center mt-4">
                <p className="text-muted mb-2">Didn't receive the code?</p>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={handleResend}
                  disabled={isLoading || timeLeft > OTP_EXPIRY - RESEND_DELAY}
                >
                  {timeLeft > OTP_EXPIRY - RESEND_DELAY
                    ? `Resend in ${Math.floor((timeLeft - (OTP_EXPIRY - RESEND_DELAY)) / 60)}:${((timeLeft - (OTP_EXPIRY - RESEND_DELAY)) % 60).toString().padStart(2, "0")}`
                    : "Resend Code"}
                </button>
              </div>
              <div className="text-center mt-4">
                <Link to="/login" className="text-muted text-decoration-none">
                  ← Back to Login
                </Link>
              </div>
              <div className="mt-4 p-3 bg-light rounded">
                <small className="text-muted">
                  <strong>
                    <FaShieldAlt className="me-1" /> Security Tips:
                  </strong>
                  <ul className="mb-0 mt-1">
                    <li>Never share your OTP with anyone</li>
                    <li>The code is valid for 5 minutes only</li>
                    <li>Check your spam folder if you don't see the email</li>
                  </ul>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerify;
