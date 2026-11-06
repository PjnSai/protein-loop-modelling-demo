import { FaSpinner, FaCheck, FaTimes, FaInfo, FaCircle } from "react-icons/fa";

const StatusBadge = ({ status, variant = null }) => {
  const statusConfig = {
    running: {
      variant: "primary",
      icon: <FaSpinner className="fa-spin" />,
    },
    completed: {
      variant: "success",
      icon: <FaCheck />,
    },
    failed: {
      variant: "danger",
      icon: <FaTimes />,
    },
    demo: {
      variant: "info",
      icon: <FaInfo />,
    },
  };

  const config = statusConfig[status] || {
    variant: "secondary",
    icon: <FaCircle />,
  };

  const badgeVariant = variant || config.variant;

  return (
    <span className={`badge bg-${badgeVariant}`}>
      <span className="me-1">{config.icon}</span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
