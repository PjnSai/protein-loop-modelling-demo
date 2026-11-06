import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

import * as dashboardApi from "../services/dashboardApi";

import { LoadingSpinner, ErrorAlert, ConfirmDialog } from "../components/ui";

import StatisticsCards from "../components/dashboard/StatisticsCards";
import SystemStatusCard from "../components/dashboard/SystemStatusCard";
import JobsTable from "../components/dashboard/JobsTable";
import JobDetailsModal from "../components/dashboard/JobDetailsModal";

const DashBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showJobModal, setShowJobModal] = useState(false);

  const [statistics, setStatistics] = useState({});
  const [confirmAction, setConfirmAction] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
    fetchStatistics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const result = await dashboardApi.fetchJobs(currentPage);

      if (result.unauthorised) {
        navigate("/login");
        return;
      }

      if (result.success) {
        setJobs(result.jobs);
        setTotalPages(result.pages);
      } else {
        setError(result.error || "Failed to fetch jobs");
      }
    } catch (err) {
      console.error("Fetch jobs error:", err);
      setError("Unable to load the saved demo jobs");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const result = await dashboardApi.fetchStatistics();
      if (result.success) {
        setStatistics(result.statistics);
      }
    } catch (err) {
      console.error("Failed to fetch statistics:", err);
      // Statistics failure is not critical - dashboard will remain functional
    }
  };

  const fetchJobDetails = async (jobId) => {
    try {
      const result = await dashboardApi.fetchJobDetails(jobId);

      if (result.success) {
        setSelectedJob(result.job);
        setShowJobModal(true);
      } else {
        setError(result.error || "Failed to fetch job details");
      }
    } catch (err) {
      console.error("Job details error:", err);
      setError("Unable to load job details. Check your internet connection.");
    }
  };

  const downloadResults = async (jobId) => {
    try {
      const result = await dashboardApi.downloadJobResults(jobId);
      if (!result.success) {
        setError(result.error || "Failed to download results");
      }
    } catch (err) {
      console.error("Download error:", err);
      setError("Unable to download results");
    }
  };

  const deleteJob = (jobId) => {
    setConfirmAction({
      title: "Delete Job",
      message:
        "Remove this job from the demo dashboard? It will come back when you start a new demo session.",
      confirmText: "Delete",
      cancelText: "Keep Job",
      variant: "danger",
      onConfirm: () => performDeleteJob(jobId),
    });
  };

  const performDeleteJob = async (jobId) => {
    await dashboardApi.deleteJob(jobId);
    fetchJobs();
    fetchStatistics();
  };

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleString() : "Not recorded";
  };

  if (isLoading && jobs.length === 0) {
    return (
      <div className="container mt-4">
        <LoadingSpinner text="Loading activity jobs..." fullPage />
      </div>
    );
  }

  return (
    <div className="container-fluid px-3 mt-4">
      <div className="row align-items-center mb-4">
        <div className="col">
          <h2 className="fw-bold">Your Modelling Dashboard</h2>
          <p className="text-muted">
            View and manage your protein loop modelling jobs
          </p>
          <p className="small text-muted mb-0">
            Demo account: these jobs are saved results from real MATLAB runs.
          </p>
        </div>
        <div className="col-auto">
          <Link to="/modelling" className="btn btn-primary">
            <FaPlus className="me-2" />
            New Modelling Job
          </Link>
        </div>
      </div>
      <ErrorAlert
        error={error}
        onDismiss={() => setError(null)}
        onRetry={fetchJobs}
      />
      <StatisticsCards statistics={statistics} />
      <SystemStatusCard statistics={statistics} />
      <JobsTable
        jobs={jobs}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onViewDetails={fetchJobDetails}
        onDownloadResults={downloadResults}
        onDeleteJob={deleteJob}
        formatDate={formatDate}
      />
      <JobDetailsModal
        selectedJob={selectedJob}
        isOpen={showJobModal}
        onClose={() => setShowJobModal(false)}
        onDownloadResults={downloadResults}
        formatDate={formatDate}
      />
      <ConfirmDialog
        isOpen={!!confirmAction}
        title={confirmAction?.title}
        message={confirmAction?.message}
        confirmText={confirmAction?.confirmText}
        cancelText={confirmAction?.cancelText}
        variant={confirmAction?.variant}
        onConfirm={() => {
          confirmAction.onConfirm();
          setConfirmAction(null);
        }}
        onCancel={() => setConfirmAction(null)}
      />
    </div>
  );
};

export default DashBoard;
