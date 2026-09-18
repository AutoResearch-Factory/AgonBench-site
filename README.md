# AgonScientistBench

## [Open the website](https://autoresearch-factory.github.io/AgonBench-site/)

Public project website for AgonScientistBench, a benchmark for scientific
judgment drawn from the Scientist role's real research histories in Agon.
Anyone can view the website without a GitHub account.

The first edition, being prepared for ICLR submission, includes two-choice
questions only. An open-response extension is planned for a later release.
This is a release plan, not a claim of conference acceptance or publication.

This repository contains only the static website and its public assets.
Research repositories are maintained separately and retain their own access
permissions.

## Editing

- `index.html`: page content and figures
- `style.css`: layout and responsive styling
- `app.js`: interactive specimen and pilot table
- `assets/`: fonts, licenses, favicon, and social image

GitHub Pages publishes the root of `main`. Push changes to `main` to update
the site; no build step or separate deployment branch is needed.

For a local preview, run `python3 -m http.server 8000 --bind 127.0.0.1` in
this directory, then visit http://localhost:8000/.

The sample is condensed and translated from a two-choice soft-support
simulation case. See [`examples/soft-support.md`](examples/soft-support.md).
The results are preliminary case-writer pilot data, not a final leaderboard.
The public benchmark name is AgonScientistBench. The repository URL remains
`AgonBench-site` so existing website links continue to work.
