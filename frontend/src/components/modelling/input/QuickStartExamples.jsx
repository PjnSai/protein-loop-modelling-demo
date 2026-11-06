import useSavedExamples from "../../../hooks/useSavedExamples";

const BROWSE_CODES = ["1ADG", "1UBQ", "2LYZ", "1CRN"];

const QuickStartExamples = ({
  setPdbCode,
  setModellingParams,
}) => {
  const { examples, isLoading, error } = useSavedExamples();

  const applyExample = (example) => {
    setPdbCode(example.pdb_code);
    setModellingParams((prev) => ({
      ...prev,
      // Remember which structure the chain and segment belong to, so they are
      // dropped if a different PDB code is fetched
      example_pdb_code: example.pdb_code.toUpperCase(),
      preferred_chain: example.chain,
      segment_start: String(example.segment_start),
      segment_end: String(example.segment_end),
    }));
  };

  const savedCodes = new Set(examples.map((e) => e.pdb_code.toUpperCase()));
  const browseOnly = BROWSE_CODES.filter((code) => !savedCodes.has(code));

  return (
    <div className="mt-3 p-3 border rounded bg-light">
      <h6>Quick Start Examples</h6>
      <strong className="small">With pre-computed results:</strong>
      <div className="mt-2">
        {isLoading && <small className="text-muted">Loading examples...</small>}
        {error && <small className="text-danger">{error}</small>}
        {!isLoading && !error && examples.length === 0 && (
          <small className="text-muted">No saved results published yet.</small>
        )}
        {examples.map((example) => (
          <button
            key={example.id}
            className="btn btn-sm btn-success me-2 mb-2"
            onClick={() => applyExample(example)}
            title={`${example.pdb_code} chain ${example.chain}, segment ${example.segment_start}-${example.segment_end}`}
          >
            {example.pdb_code} {example.chain}:{example.segment_start}-
            {example.segment_end}
          </button>
        ))}
      </div>
      {browseOnly.length > 0 && (
        <>
          <strong className="small">Structure viewing only:</strong>
          <div className="mt-2">
            {browseOnly.map((code) => (
              <button
                key={code}
                className="btn btn-sm btn-outline-primary me-2 mb-2"
                onClick={() => setPdbCode(code)}
              >
                {code}
              </button>
            ))}
          </div>
        </>
      )}

      <small className="text-muted">
        A green example fills in the PDB code, chain and segment of a saved
        MATLAB run. Click &quot;Fetch Structure&quot; next.
      </small>
    </div>
  );
};

export default QuickStartExamples;
