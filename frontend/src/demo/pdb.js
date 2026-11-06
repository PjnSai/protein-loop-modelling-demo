/* Replaces the backend /api/pdb/fetch endpoint for the static demo.
   Structures come straight from RCSB, which allows cross-origin requests.

   analysePdb() is a JavaScript port of analyse_pdb() from context.py and
   returns the same shape the frontend already uses:
     { title, method, resolution, chains, residues: { A: { count, range } },
       total_residues } */

const RCSB_DOWNLOAD_URL = "https://files.rcsb.org/download";
const PDB_CODE_PATTERN = /^[0-9][A-Za-z0-9]{3}$/;

const cache = new Map(); // pdb code -> Promise<string>
// Keep requests to RCSB polite: at most this many new downloads per minute.
// Structures already downloaded this visit come from the cache and don't count.
const MAX_DOWNLOADS_PER_MINUTE = 10;
const recentDownloads = []; // timestamps (ms)

const checkDownloadLimit = () => {
  const now = Date.now();
  while (recentDownloads.length && now - recentDownloads[0] > 60000) {
    recentDownloads.shift();
  }
  if (recentDownloads.length >= MAX_DOWNLOADS_PER_MINUTE) {
    const wait = Math.ceil((60000 - (now - recentDownloads[0])) / 1000);
    throw new Error(
      `Too many structures fetched in a short time. Please wait ${wait} seconds and try again.`,
    );
  }
  recentDownloads.push(now);
};

export const isValidPdbCode = (code) =>
  typeof code === "string" && PDB_CODE_PATTERN.test(code.trim());

export const downloadPdb = (pdbCode) => {
  const code = pdbCode.trim().toUpperCase();

  if (!cache.has(code)) {
    try {
      checkDownloadLimit();
    } catch (err) {
      return Promise.reject(err);
    }
    const request = fetch(`${RCSB_DOWNLOAD_URL}/${code}.pdb`).then(
      (response) => {
        if (response.status === 404) {
          throw new Error(
            `No PDB-format file found for ${code}. Very large structures are only published as mmCIF.`,
          );
        }
        if (!response.ok) {
          throw new Error(`RCSB returned status ${response.status}`);
        }
        return response.text();
      },
    );

    // Do not cache failures, so the user can retry
    request.catch(() => cache.delete(code));
    cache.set(code, request);
  }

  return cache.get(code);
};

export const analysePdb = (pdbText) => {
  const titleParts = [];
  let method = null;
  let resolution = null;

  const chainOrder = [];
  const residueKeys = {}; // chain -> Set of "resSeq+iCode"
  const residueNumbers = {}; // chain -> number[]

  for (const line of pdbText.split(/\r?\n/)) {
    const record = line.slice(0, 6).trim();

    if (record === "TITLE") {
      titleParts.push(line.slice(10, 80).trim());
    } else if (record === "EXPDTA" && !method) {
      method = line.slice(10, 79).trim() || null;
    } else if (record === "REMARK" && line.slice(7, 10).trim() === "2") {
      const match = line.match(/RESOLUTION\.\s+([\d.]+)\s+ANGSTROMS/);
      if (match) resolution = parseFloat(match[1]);
    } else if (record === "ATOM") {
      const chain = line.slice(21, 22).trim() || "A";
      const resSeq = parseInt(line.slice(22, 26), 10);
      const iCode = line.slice(26, 27).trim();
      if (Number.isNaN(resSeq)) continue;

      if (!residueKeys[chain]) {
        residueKeys[chain] = new Set();
        residueNumbers[chain] = [];
        chainOrder.push(chain);
      }

      const key = `${resSeq}${iCode}`;
      if (!residueKeys[chain].has(key)) {
        residueKeys[chain].add(key);
        residueNumbers[chain].push(resSeq);
      }
    } else if (record === "ENDMDL") {
      // NMR files hold several models; only the first one is analysed
      break;
    }
  }

  const residues = {};
  let totalResidues = 0;

  for (const chain of chainOrder) {
    const numbers = residueNumbers[chain];
    residues[chain] = {
      count: numbers.length,
      range: [Math.min(...numbers), Math.max(...numbers)],
    };
    totalResidues += numbers.length;
  }

  return {
    // Continuation lines are joined with single spaces, as in the PDB spec
    title: titleParts.join(" ").replace(/\s+/g, " ").trim() || null,
    method,
    resolution,
    chains: chainOrder,
    residues,
    total_residues: totalResidues,
  };
};

export const fetchAndAnalyse = async (pdbCode) => {
  const code = pdbCode.trim().toUpperCase();
  const pdbContent = await downloadPdb(code);
  const analysis = analysePdb(pdbContent);

  if (analysis.chains.length === 0) {
    throw new Error(`${code} has no protein ATOM records to model`);
  }

  return {
    success: true,
    pdb_code: code,
    pdb_content: pdbContent,
    analysis,
  };
};
