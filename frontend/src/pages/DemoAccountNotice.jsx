/* Registration, OTP and password reset need the backend and email, so in the
   demo these routes explain what the page does in the full version. */
import { Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";

const PAGES = {
  register: {
    title: "Create Account",
    description:
      "In the full version, new users register with an email address and a password of at least 8 characters.",
  },
  otp: {
    title: "Verify Your Identity",
    description:
      "In the full version, a 6-digit one-time password is emailed after a correct password. It expires after 5 minutes and a new one can be requested after 1 minute.",
  },
  "request-reset": {
    title: "Reset Password",
    description:
      "In the full version, users can request a password reset link by email.",
  },
  "reset-password": {
    title: "Choose a New Password",
    description:
      "In the full version, the reset link opens this page to set a new password.",
  },
};

const DemoAccountNotice = ({ page }) => {
  const { title, description } = PAGES[page];

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-5">
          <div className="card border-0 shadow">
            <div className="card-body p-4 p-md-5 text-center">
              <h3 className="fw-bold text-primary">{title}</h3>
              <div className="alert alert-info text-start mt-4">
                <FaInfoCircle className="me-2" />
                This is a static demo with no backend, so this page is turned
                off.
              </div>
              <p className="text-muted text-start">{description}</p>
              <div className="d-grid mt-4">
                <Link to="/login" className="btn btn-primary">
                  Continue as Demo User
                </Link>
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

export default DemoAccountNotice;
