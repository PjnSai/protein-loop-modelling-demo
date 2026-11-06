import PDBSearchPanel from "./input/PDBSearchPanel";
import QuickStartExamples from "./input/QuickStartExamples";
import PDBCodeInput from "./input/PDBCodeInput";

const PDBInputForm = ({
  pdbCode,
  setPdbCode,

  isLoading,
  onFetchStructure,

  showSearch,
  onToggleSearch,

  searchQuery,
  setSearchQuery,

  searchResults,
  onSearchPDB,
  onSelectFromSearch,

  setModellingParams,
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5>Step 1: Enter PDB Code</h5>
      </div>
      <div className="card-body">
        <PDBCodeInput
          pdbCode={pdbCode}
          setPdbCode={setPdbCode}
          isLoading={isLoading}
          onFetchStructure={onFetchStructure}
          onToggleSearch={onToggleSearch}
        />
        <QuickStartExamples
          setPdbCode={setPdbCode}
          setModellingParams={setModellingParams}
        />
        <PDBSearchPanel
          showSearch={showSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchResults={searchResults}
          onSearchPDB={onSearchPDB}
          onSelectFromSearch={onSelectFromSearch}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default PDBInputForm;
