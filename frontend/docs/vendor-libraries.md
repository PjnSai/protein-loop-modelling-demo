# Self-hosted libraries (public/vendor)

The site serves these files itself instead of loading them from CDNs. Visitors' browsers
only contact this site and RCSB, and the Content-Security-Policy allows scripts from this
site only (`script-src 'self'`).

| File | Library and version | Licence | Downloaded from |
|---|---|---|---|
| `bootstrap.min.css`, `bootstrap.bundle.min.js` | Bootstrap 5.1.3 | MIT | cdn.jsdelivr.net/npm/bootstrap@5.1.3 |
| `ngl.js` | NGL Viewer 2.0.0-dev.37 | MIT | unpkg.com/ngl@2.0.0-dev.37 |
| `3Dmol-min.js` | 3Dmol.js 1.8.0 (includes jQuery 3.6.0, MIT) | BSD-3-Clause | cdnjs.cloudflare.com/ajax/libs/3Dmol/1.8.0 |

They are the same versions the app loaded from CDNs on main, and each file keeps its
original licence header. To update one, download the new version into `public/vendor/`
and update this table.
