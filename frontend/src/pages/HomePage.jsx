import { Link } from "react-router-dom";
import { FaRocket, FaPlay, FaUserCheck } from "react-icons/fa";

import HeroSection from "../components/widgets/HeroSection";
import FeaturesGrid from "../components/widgets/FeaturesGrid";
import DashboardLinks from "../components/widgets/DashboardLinks";

import useAuth from "../hooks/useAuth";

const HomePage = () => {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <div className="container mt-5">
      <HeroSection />
      <section className="mt-5">
        <h3 className="fw-bold text-center mb-1">Powerful Features</h3>
        <p className="text-muted text-center mb-4">
          Everything you need for protein loop modelling and analysis
        </p>
        <FeaturesGrid />
      </section>
      {!isLoading && isAuthenticated && (
        <section className="mt-5">
          <h3 className="fw-bold text-center mb-1">Your Account Dashboard</h3>
          <p className="text-muted text-center mb-4">
            Quick access to your modelling activities
          </p>
          <DashboardLinks />
        </section>
      )}

      {!isLoading && !isAuthenticated && (
        <section className="mt-5">
          <div className="card border-primary">
            <div className="card-header bg-primary text-white text-center">
              <h4 className="mb-0">
                <FaRocket className="me-2" />
                Explore the Demo
              </h4>
            </div>
            <div className="card-body text-center">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="card h-100 border-info">
                    <div className="card-body">
                      <h5 className="card-title text-info">
                        <FaPlay className="me-2" />
                        Try Loop Modelling
                      </h5>
                      <p className="card-text">
                        Fetch structures live from RCSB and step through the
                        modelling workflow to a saved MATLAB result.
                      </p>
                      <Link to="/modelling" className="btn btn-info">
                        Start
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="card h-100 border-success">
                    <div className="card-body">
                      <h5 className="card-title text-success">
                        <FaUserCheck className="me-2" />
                        Demo Account
                      </h5>
                      <p className="card-text">
                        See the job dashboard, activity log and profile pages
                        with sample data. No password needed.
                      </p>
                      <Link to="/login" className="btn btn-success">
                        Continue as Demo User
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
