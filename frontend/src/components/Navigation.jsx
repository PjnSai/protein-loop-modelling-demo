import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaDna,
  FaHome,
  FaFlask,
  FaChartBar,
  FaList,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const Navigation = () => {
  const { isAuthenticated, user, logout, isLoading: authLoading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const result = await logout();
      if (result.success) {
        navigate("/");
      } else {
        console.error("Logout failed:", result.error);
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (authLoading) {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
        <div className="container-fluid px-3">
          <Link to="/" className="navbar-brand fw-bold">
            <FaDna className="me-2" />
            Loop Modeller
          </Link>
          <div className="text-white">
            <small>Checking authentication...</small>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container-fluid px-3">
        <Link to="/" className="navbar-brand fw-bold">
          <FaDna className="me-2" />
          Loop Modeller
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <FaHome className="me-1" />
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/modelling" className="nav-link">
                <FaFlask className="me-1" />
                Loop Modelling
              </Link>
            </li>
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">
                    <FaChartBar className="me-1" />
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/logs" className="nav-link">
                    <FaList className="me-1" />
                    Activity
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav">
            {isAuthenticated ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaUser className="me-1" />
                  {user?.email || "User"}
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/profile" className="dropdown-item">
                      <FaCog className="me-2" />
                      Profile Settings
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                    >
                      <FaSignOutAlt className="me-2" />
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    <FaSignInAlt className="me-1" />
                    Demo Sign In
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
