# Protein Loop Modelling Web Server – Static Demo

**Live demo:** https://protein-loop-modelling-demo.netlify.app

A static, browser-only version of my final-year Computer Science project: a web server for
protein loop modelling. Users enter a PDB code, view the structure in 3D, choose a loop
segment, set target backbone angles and constraints, and compare the original structure with
the modelled loop.

The full application runs the modelling through MATLAB on a Flask backend. This demo has no
backend, so it can be hosted for free.

## What is live and what is pre-computed

| Feature | In this demo |
|---|---|
| PDB lookup | **Live.** Any 4-character code is downloaded from the RCSB Protein Data Bank and parsed in the browser (title, method, resolution, chains, residue ranges) |
| 3D viewing | **Live.** 3Dmol.js and NGL, with cartoon, line, stick and sphere styles |
| Segment selection and parameter form | **Live.** Target phi/psi angles, constraints and conflict checking |
| Modelling result | **Pre-computed.** Shown only for the verified example: 1ADG chain A, residues 290–301, with the parameters from the original run. Any other input explains that live modelling isn't available. |
| Accounts, dashboard and activity log | **Demo account.** "Continue as demo user" opens the dashboard, activity log and profile with sample data, kept in the browser tab only |

To see the verified result: **Loop Modelling → 1ADG A:290-301 → Fetch Structure → Continue to
Parameters → Enter These Parameters → Show Pre-computed Result**.

## Full version

The full application (not part of this repository) adds:

- live loop modelling through the MATLAB Engine API
- a Flask REST API with PostgreSQL for users, sessions and job history
- email sign-in with a one-time password, and account lockout after repeated failed logins
- an activity log, plus profile and password management

## Tech stack

- **Frontend:** React 18, React Router 7, Bootstrap 5, Vite 7
- **3D viewers:** 3Dmol.js 1.8.0 and NGL 2.0 (self-hosted in `frontend/public/vendor`)
- **Data:** RCSB Protein Data Bank (`files.rcsb.org`)
- **Hosting:** Netlify

## Running locally

Requires Node 20.19 or newer.

```bash
cd frontend
npm ci
npm run dev
```

Then open http://localhost:5173.

To build for production, run `npm run build`. The output goes to `frontend/dist`.

## Project structure

```
frontend/
├── public/
│   ├── demo-results/      # saved MATLAB output and manifest for the verified example
│   ├── vendor/            # self-hosted Bootstrap, NGL and 3Dmol.js
│   ├── _headers           # security headers (Content-Security-Policy etc.)
│   └── _redirects         # single-page-app routing on Netlify
├── src/
│   ├── demo/              # browser-side PDB parsing, prepare step, saved results, demo session
│   ├── services/          # modelling, dashboard and activity-log services
│   ├── components/        # viewers, modelling steps, dashboard, forms
│   └── pages/
├── docs/                  # results file format, third-party library notes
└── netlify.toml           # build settings and rate limit
```

## Security

- No backend, database or secrets. Nothing a visitor enters is sent to a server.
- The Content-Security-Policy only allows scripts from the site itself, and only allows
  network requests to RCSB.
- Rate limiting: Netlify limits each IP address to 45 requests per minute, and the app
  limits structure downloads to 10 per minute.
- `npm audit`: 0 known vulnerabilities at the time of publishing.

## Credits

- Loop-modelling algorithm (MATLAB) by my project supervisor. The algorithm itself is not
  included here; only a saved output from it is published.
- Structure data from the [RCSB Protein Data Bank](https://www.rcsb.org/).
- [3Dmol.js](https://3dmol.org/) (BSD-3-Clause), [NGL Viewer](https://nglviewer.org/) (MIT)
  and [Bootstrap](https://getbootstrap.com/) (MIT).
