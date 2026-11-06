/* Nothing here leaves the browser. State is kept in sessionStorage so a page
   refresh keeps the demo login, but closing the tab resets everything.
   Storage can be unavailable (private mode, blocked site data), so every
   access is wrapped and falls back to in-memory state. */

const STORAGE_KEY = "loop-modeller-demo";

let memoryState = null;

const defaultState = () => ({
  signedIn: false,
  profile: null, // edits made on the profile page (null = sample profile)
  deletedJobIds: [],
  sessionJobs: [], // jobs "run" during this visit while signed in
  logsCleared: null, // null, "all" or a number of days
});

const read = () => {
  if (memoryState) return memoryState;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    memoryState = raw ? { ...defaultState(), ...JSON.parse(raw) } : defaultState();
  } catch {
    memoryState = defaultState();
  }
  return memoryState;
};

const write = (changes) => {
  memoryState = { ...read(), ...changes };
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(memoryState));
  } catch {
    // Storage unavailable - keep the in-memory copy only
  }
  return memoryState;
};

export const demoStore = {
  get: read,
  set: write,
  reset: () => {
    memoryState = defaultState();
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  },
};
