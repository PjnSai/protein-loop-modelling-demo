import { FaSync } from "react-icons/fa";

const LogsHeader = ({
  debugInfo,
  isLoading,
  daysToDelete,
  setDaysToDelete,
  isDeleting,
  onRefresh,
  onDeleteLogs,
}) => {
  return (
    <div className="row align-items-center mb-4">
      <div className="col">
        <h2 className="fw-bold">Activity Logs</h2>
        <p className="text-muted">
          Monitor your account activity and security events
        </p>
        {debugInfo && (
          <p className="small text-muted mb-0">
            Showing {debugInfo.returned_count} of {debugInfo.query_count}{" "}
            activity entries for <strong>{debugInfo.user_email}</strong>
          </p>
        )}
      </div>
      <div className="col-auto">
        <button
          className="btn btn-outline-primary me-3"
          onClick={onRefresh}
          disabled={isLoading}
          title="Refresh activity logs"
        >
          <FaSync className={`me-1 ${isLoading ? "fa-spin" : ""}`} />
          Refresh
        </button>
        <div className="btn-group" role="group">
          <select
            className="form-select form-select-sm"
            value={daysToDelete}
            onChange={(e) => setDaysToDelete(e.target.value)}
            disabled={isDeleting}
            style={{ maxWidth: "200px" }}
            title="Select log deletion scope"
          >
            <option value="all">Clear All Logs</option>
            <option value="7">Clear logs older than 7 days</option>
            <option value="30">Clear logs older than 30 days</option>
            <option value="90">Clear logs older than 90 days</option>
          </select>
          <button
            className="btn btn-outline-danger"
            onClick={onDeleteLogs}
            disabled={isDeleting}
            title="Execute log deletion with confirmation"
          >
            {isDeleting ? "Deleting..." : "Delete Logs"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogsHeader;
