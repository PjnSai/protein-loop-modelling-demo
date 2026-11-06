import { Link } from "react-router-dom";
import { FaHistory, FaCog, FaClipboard, FaDna } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const DashboardLinks = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading || !isAuthenticated) {
    return null;
  }

  const cards = [
    {
      icon: <FaDna className="text-success" />,
      title: "Start New Job",
      route: "/modelling",
      label: "Loop Modelling",
    },
    {
      icon: <FaClipboard className="text-primary" />,
      title: "View Results",
      route: "/dashboard",
      label: "Dashboard",
    },
    {
      icon: <FaHistory className="text-info" />,
      title: "Activity Log",
      route: "/logs",
      label: "View Logs",
    },
    {
      icon: <FaCog className="text-secondary" />,
      title: "Settings",
      route: "/profile",
      label: "Profile",
    },
  ];

  return (
    <div className="row g-4 justify-content-center">
      {cards.map((card, idx) => (
        <div className="col-sm-6 col-lg-3" key={idx}>
          <div className="card h-100 border-0 shadow-sm text-center">
            <div className="card-body">
              <div className="fs-2 mb-2">{card.icon}</div>
              <h5>{card.title}</h5>
              <Link
                to={card.route}
                className="btn btn-outline-primary btn-sm mt-2"
              >
                {card.label}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardLinks;
