import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const HeroSection = () => {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <div className="bg-primary text-white text-center py-5 px-3 rounded shadow">
      <div className="container">
        <h1 className="display-4 fw-bold mb-3">
          Protein Loop Modelling Server
        </h1>
        <p className="lead mx-auto" style={{ maxWidth: "720px" }}>
          Enter a PDB code, visualise the structure in 3D, choose a loop segment
          and set target backbone angles. This static demo shows saved results
          from the MATLAB modelling code.
        </p>
        <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
          <Link
            to="/modelling"
            className="btn btn-light btn-lg text-primary fw-semibold"
          >
            Try Loop Modelling
          </Link>
          {!isLoading && isAuthenticated && (
            <Link
              to="/dashboard"
              className="btn btn-outline-light btn-lg fw-semibold"
            >
              View Dashboard
            </Link>
          )}

          {!isLoading && !isAuthenticated && (
            <>
              <Link
                to="/login"
                className="btn btn-outline-light btn-lg fw-semibold"
              >
                Continue as Demo User
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
