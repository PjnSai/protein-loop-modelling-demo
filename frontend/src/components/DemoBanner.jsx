import { FaInfoCircle } from "react-icons/fa";

const DemoBanner = () => (
  <div
    className="border-bottom border-warning text-dark small py-2"
    style={{ backgroundColor: "#fff3cd" }}
    role="note"
  >
    <div className="container-fluid px-3 d-flex align-items-start">
      <FaInfoCircle className="me-2 mt-1 flex-shrink-0" />
      <span>
        <strong>Static demo.</strong> This version has no backend. Structures
        are fetched live from the RCSB Protein Data Bank, modelling results are
        pre-computed outputs from real MATLAB runs, and the demo account uses
        sample data. Nothing you enter is sent to a server.
      </span>
    </div>
  </div>
);

export default DemoBanner;
