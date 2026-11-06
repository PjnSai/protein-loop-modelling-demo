import {
  FaKey,
  FaEdit,
  FaRedo,
  FaCheck,
  FaChartBar,
  FaDna,
  FaTimes,
  FaClipboard,
  FaLock,
} from "react-icons/fa";

export const getStatusBadge = (status) => {
  const statusStyles = {
    success: "bg-success",
    failed: "bg-danger",
    locked: "bg-warning",
    sent: "bg-info",
    "otp-sent": "bg-info",
    "otp-verify": "bg-success",
  };
  return `badge ${statusStyles[status] || "bg-secondary"}`;
};

export const getActionIcon = (action) => {
  const icons = {
    login: <FaKey className="text-primary" />,
    register: <FaEdit className="text-success" />,
    "reset-request": <FaRedo className="text-warning" />,
    "reset-complete": <FaCheck className="text-success" />,
    "pdb-fetch": <FaChartBar className="text-info" />,
    "modelling-submit": <FaDna className="text-primary" />,
    "modelling-error": <FaTimes className="text-danger" />,
    "otp-verify": <FaLock className="text-success" />,
    logout: <FaTimes className="text-muted" />,
  };
  return icons[action] || <FaClipboard className="text-muted" />;
};

export const formatDate = (timestamp) => {
  try {
    // Handle numeric Unix timestamps (seconds since epoch)
    if (typeof timestamp === "number") {
      return new Date(timestamp * 1000).toLocaleString();
    }
    else {
      return new Date(timestamp).toLocaleString();
    }
  } catch (e) {
    return "Invalid date";
  }
};
