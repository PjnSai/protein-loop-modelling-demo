/* The demo account is not a real account. The email uses the reserved
   example.com domain and IP addresses use the 192.0.2.0/24 documentation
   range, so none of this refers to a real person or machine. */

export const DEMO_USER = {
  id: 1,
  email: "demo@example.com",
};

export const SAMPLE_PROFILE = {
  email: DEMO_USER.email,
  first_name: "Demo",
  last_name: "User",
  institution: "Example University",
  bio: "Sample profile for the static demo",
};

/* Activity log entries (newest first). Timestamps are relative to "now" so
   the sample always looks recent and the "older than N days" filters work. */
const DAY = 24 * 60 * 60;
const now = () => Math.floor(Date.now() / 1000);

export const buildSampleLogs = () => {
  const t = now();
  const entries = [
    { action: "otp-verify", status: "success", ip: "192.0.2.10", age: 0.01 },
    { action: "login", status: "otp-sent", ip: "192.0.2.10", age: 0.011 },
    { action: "modelling-submit", status: "success", ip: "192.0.2.10", age: 1.2 },
    { action: "pdb-fetch", status: "success", ip: "192.0.2.10", age: 1.21 },
    { action: "login", status: "failed", ip: "192.0.2.77", age: 3.5 },
    { action: "logout", status: "success", ip: "192.0.2.10", age: 8 },
    { action: "modelling-error", status: "failed", ip: "192.0.2.10", age: 8.1 },
    { action: "pdb-fetch", status: "success", ip: "192.0.2.10", age: 8.2 },
    { action: "otp-verify", status: "success", ip: "192.0.2.10", age: 8.3 },
    { action: "login", status: "otp-sent", ip: "192.0.2.10", age: 8.31 },
    { action: "reset-complete", status: "success", ip: "192.0.2.10", age: 35 },
    { action: "reset-request", status: "sent", ip: "192.0.2.10", age: 35.01 },
    { action: "register", status: "success", ip: "192.0.2.10", age: 40 },
  ];

  return entries.map((entry, index) => ({
    id: index + 1,
    action: entry.action,
    status: entry.status,
    ip: entry.ip,
    email: DEMO_USER.email,
    timestamp: t - Math.round(entry.age * DAY),
  }));
};

export const LOGS_PER_PAGE = 10;
export const JOBS_PER_PAGE = 10;
