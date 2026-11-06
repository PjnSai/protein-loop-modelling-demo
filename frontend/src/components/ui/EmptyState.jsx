import { FaInbox } from "react-icons/fa";

const EmptyState = ({
  icon = <FaInbox size={64} className="text-muted" />,
  title = "No Data",
  description = "Nothing to show here yet.",
  action = null,
  className = "",
}) => {
  return (
    <div className={`text-center py-5 ${className}`}>
      <div className="mb-4">{icon}</div>
      <h5 className="text-muted">{title}</h5>
      <p className="text-muted mb-4">{description}</p>
      {action && action}
    </div>
  );
};

export default EmptyState;
