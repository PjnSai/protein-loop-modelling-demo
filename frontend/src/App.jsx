import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Navigation from "./components/Navigation";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import DemoBanner from "./components/DemoBanner";

import Login from "./pages/Login";
import DemoAccountNotice from "./pages/DemoAccountNotice";

import LoginLog from "./pages/LoginLog";
import HomePage from "./pages/HomePage";
import DashBoard from "./pages/DashBoard";
import ProfilePage from "./pages/ProfilePage";
import LoopModellingInterface from "./pages/LoopModellingInterface";

import { FaLock, FaDna, FaChartBar } from "react-icons/fa";

export default function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100 bg-light">
        <Navigation />
        <DemoBanner />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/register"
              element={<DemoAccountNotice page="register" />}
            />
            <Route path="/otp" element={<DemoAccountNotice page="otp" />} />
            <Route
              path="/request-reset"
              element={<DemoAccountNotice page="request-reset" />}
            />
            <Route
              path="/reset-password"
              element={<DemoAccountNotice page="reset-password" />}
            />
            <Route
              path="/modelling"
              element={
                <ErrorBoundary>
                  <LoopModellingInterface />
                </ErrorBoundary>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <ErrorBoundary>
                    <DashBoard />
                  </ErrorBoundary>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ErrorBoundary>
                    <ProfilePage />
                  </ErrorBoundary>
                </ProtectedRoute>
              }
            />
            <Route
              path="/logs"
              element={
                <ProtectedRoute>
                  <ErrorBoundary>
                    <LoginLog />
                  </ErrorBoundary>
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                <div className="container mt-5 text-center">
                  <h3>Page not found</h3>
                  <Link to="/" className="btn btn-primary mt-3">
                    Back to Home
                  </Link>
                </div>
              }
            />
          </Routes>
        </div>
        <footer className="bg-dark text-light py-4 mt-5">
          <div className="container-fluid px-3">
            <div className="row">
              <div className="col-md-8">
                <h6>Protein Loop Modelling Server</h6>
                <p className="mb-0 small text-muted">
                  A web-based platform for protein loop modelling, built as a
                  final-year Computer Science project. This is a static demo
                  of the full application.
                </p>
              </div>
              <div className="col-md-4 text-md-end">
                <div className="small text-muted">
                  <div className="d-flex align-items-center justify-content-md-end mb-1">
                    <FaLock className="me-2 text-info" />
                    <span>No Data Sent to a Server</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-md-end mb-1">
                    <FaDna className="me-2 text-success" />
                    <span>Pre-computed MATLAB Results</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-md-end">
                    <FaChartBar className="me-2 text-primary" />
                    <span>Job History</span>
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-3" />
            <div className="row align-items-center">
              <div className="col-md-6">
                <small className="text-muted">
                  © 2024 Protein Loop Modelling Server - Academic Use
                </small>
              </div>
              <div className="col-md-6 text-md-end">
                <small className="text-muted">
                  Full version: React, Flask, PostgreSQL and MATLAB
                  <br />
                  Structure data: RCSB Protein Data Bank
                </small>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
