/* Validates the chosen chain and segment against the analysed structure and
   returns the "preparation" object that ParameterForm expects.

   degrees_of_freedom is estimated as two backbone angles (phi and psi) per
   residue, and the suggested iteration count is a fixed default. */

const DEFAULT_ITERATIONS = 10000;
const MIN_SEGMENT_LENGTH = 4; // matches SegmentValidationCard (end - start >= 3)

export const prepareSegment = (pdbData, chain, segmentStart, segmentEnd) => {
  const start = parseInt(segmentStart, 10);
  const end = parseInt(segmentEnd, 10);
  const chainInfo = pdbData?.analysis?.residues?.[chain];

  if (!chainInfo) {
    return { success: false, error: `Chain ${chain} not found in structure` };
  }
  if (Number.isNaN(start) || Number.isNaN(end)) {
    return { success: false, error: "Please enter a segment start and end" };
  }
  if (start >= end) {
    return { success: false, error: "Segment start must be before segment end" };
  }
  if (start < chainInfo.range[0] || end > chainInfo.range[1]) {
    return {
      success: false,
      error: `Segment must be within chain ${chain} residues ${chainInfo.range[0]}-${chainInfo.range[1]}`,
    };
  }

  const segmentLength = end - start + 1;
  if (segmentLength < MIN_SEGMENT_LENGTH) {
    return {
      success: false,
      error: `Segment too short (minimum ${MIN_SEGMENT_LENGTH} residues)`,
    };
  }

  return {
    success: true,
    preparation: {
      pdb_code: pdbData.pdb_code,
      chain,
      segment_start: start,
      segment_end: end,
      segment_length: segmentLength,
      // One phi and one psi angle per residue in the segment
      degrees_of_freedom: segmentLength * 2,
      suggested_parameters: { n_iterations: DEFAULT_ITERATIONS },
    },
  };
};
