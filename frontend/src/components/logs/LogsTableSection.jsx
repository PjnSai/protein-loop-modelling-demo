import { FaClipboard } from "react-icons/fa";
import {
  getStatusBadge,
  getActionIcon,
  formatDate,
} from "../../utils/logUtils";

const LogsTableSection = ({
  logs,
  isLoading,
  currentPage,
  totalPages,
  setCurrentPage,
  onRefresh,
}) => {
  if (logs.length === 0 && !isLoading) {
    return (
      <div className="card">
        <div className="card-body text-center py-5">
          <div className="mb-4">
            <FaClipboard size={64} className="text-muted" />
          </div>
          <h5>No Activity Yet</h5>
          <p className="text-muted">Your account activity will appear here</p>
          <button className="btn btn-primary" onClick={onRefresh}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0">
          Recent Activity ({logs.length} entries)
        </h5>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Action</th>
                <th>Status</th>
                <th>IP Address</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={log.id || index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <span className="me-2">{getActionIcon(log.action)}</span>
                      <div>
                        <strong>
                          {log.action
                            ?.replace(/-/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase()) ||
                            "Unknown"}
                        </strong>
                        {log.email && (
                          <div className="small text-muted">{log.email}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={getStatusBadge(log.status)}>
                      {log.status?.charAt(0).toUpperCase() +
                        log.status?.slice(1) || "Unknown"}
                    </span>
                  </td>
                  <td>
                    <code className="text-muted">{log.ip || "Unknown"}</code>
                  </td>
                  <td>
                    <small className="text-muted">
                      {log.date_formatted || formatDate(log.timestamp)}
                    </small>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {totalPages > 1 && (
        <div className="card-footer">
          <nav aria-label="Activity log pagination">
            <ul className="pagination pagination-sm justify-content-center mb-0">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  Previous
                </button>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i + 1}
                  className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(i + 1)}
                    aria-label={`Page ${i + 1}`}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default LogsTableSection;
