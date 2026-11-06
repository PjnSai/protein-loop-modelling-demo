/* Serves the sample activity log for the demo account. Deleting logs only
   affects the current demo session. */

import { demoStore } from "../demo/demoStore";
import { buildSampleLogs, DEMO_USER, LOGS_PER_PAGE } from "../demo/sampleData";

const DAY = 24 * 60 * 60;

const visibleLogs = () => {
  const cleared = demoStore.get().logsCleared;
  const logs = buildSampleLogs();

  if (cleared === "all") return [];
  if (typeof cleared === "number") {
    const cutoff = Date.now() / 1000 - cleared * DAY;
    return logs.filter((log) => log.timestamp >= cutoff);
  }
  return logs;
};

export const fetchLogs = async (currentPage, navigate) => {
  if (!demoStore.get().signedIn) {
    navigate("/login");
    return { success: false, redirect: true };
  }

  const logs = visibleLogs();
  const totalPages = Math.max(1, Math.ceil(logs.length / LOGS_PER_PAGE));
  const start = (currentPage - 1) * LOGS_PER_PAGE;
  const pageLogs = logs.slice(start, start + LOGS_PER_PAGE);

  return {
    success: true,
    logs: pageLogs,
    totalPages,
    debugInfo: {
      returned_count: pageLogs.length,
      query_count: logs.length,
      user_email: DEMO_USER.email,
    },
  };
};

export const deleteLogs = async (daysToDelete) => {
  const days = daysToDelete === "all" ? "all" : parseInt(daysToDelete, 10);
  const before = visibleLogs().length;

  // Keep the strictest deletion made so far this session
  const current = demoStore.get().logsCleared;
  const next =
    current === "all" || days === "all"
      ? "all"
      : Math.min(days, typeof current === "number" ? current : Infinity);
  demoStore.set({ logsCleared: next });

  const removed = before - visibleLogs().length;
  return {
    success: true,
    message: `Deleted ${removed} log entr${removed === 1 ? "y" : "ies"} (demo session only)`,
  };
};
