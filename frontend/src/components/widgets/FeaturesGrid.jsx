import FeatureCard from "../ui/FeatureCard";
import { FaCube, FaFlask, FaHistory } from "react-icons/fa";

const features = [
  {
    icon: <FaCube />,
    title: "3D Structure Viewing",
    description:
      "Fetch any structure from the RCSB Protein Data Bank and explore it with 3Dmol.js or NGL.",
  },
  {
    icon: <FaFlask />,
    title: "MATLAB Loop Modelling",
    description:
      "The full version runs the modelling code through the MATLAB Engine API. This demo shows saved results.",
  },
  {
    icon: <FaHistory />,
    title: "Job History",
    description:
      "View, download and manage past modelling jobs. Try it with the demo account.",
  },
];

const FeaturesGrid = () => (
  <div className="row mt-4">
    {features.map((feature, index) => (
      <FeatureCard
        key={index}
        icon={feature.icon}
        title={feature.title}
        description={feature.description}
      />
    ))}
  </div>
);

export default FeaturesGrid;
