const ActionButtons = ({
  onContinue,
  onReset,
  isLoading,
  selectedChain,
  modellingParams,
}) => {
  const isDisabled =
    isLoading ||
    !selectedChain ||
    !modellingParams.segment_start ||
    !modellingParams.segment_end;

  return (
    <div className="mt-3">
      <button
        className="btn btn-primary me-2"
        onClick={onContinue}
        disabled={isDisabled}
      >
        {isLoading ? "Preparing..." : "Continue to Parameters"}
      </button>
      <button className="btn btn-outline-secondary" onClick={onReset}>
        Start Over
      </button>
    </div>
  );
};

export default ActionButtons;
