import useSavedExamples from "../../../hooks/useSavedExamples";

const TestingHelperCard = ({
  pdbData,
  setSelectedChain,
  setModellingParams,
}) => {
  const { examples } = useSavedExamples();
  const matches = examples.filter(
    (e) =>
      e.pdb_code.toUpperCase() === pdbData.pdb_code &&
      pdbData.analysis?.residues?.[e.chain],
  );

  if (matches.length === 0) {
    return (
      <div className="mt-3 p-3 border rounded bg-light">
        <small className="text-muted">
          There are no saved MATLAB results for {pdbData.pdb_code}. You can
          still view the structure and choose segments, but the demo can only
          show results for the saved examples.
        </small>
      </div>
    );
  }

  const handleUse = (example) => {
    setSelectedChain(example.chain);
    setModellingParams((prev) => ({
      ...prev,
      segment_start: String(example.segment_start),
      segment_end: String(example.segment_end),
    }));
  };

  return (
    <div className="mt-3 p-3 border rounded bg-success bg-opacity-10">
      <h6 className="text-success">Saved results for {pdbData.pdb_code}</h6>
      <p className="mb-2">
        These segments have pre-computed MATLAB results. Click to fill in:
      </p>
      {matches.map((example) => (
        <button
          key={example.id}
          className="btn btn-sm btn-success me-2 mb-1"
          onClick={() => handleUse(example)}
        >
          Use Chain {example.chain}, Segment {example.segment_start}-
          {example.segment_end}
        </button>
      ))}
    </div>
  );
};

export default TestingHelperCard;
