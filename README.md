# Agon Research Benchmarks

## [Open the website](https://autoresearch-factory.github.io/AgonBench-site/)

Public project website for AgonBench and AgonScientistBench. Anyone can view
the website without a GitHub account.

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

The sample is a shortened illustration adapted from an open-response task.
The results are preliminary case-writer pilot data, not a final leaderboard.
Agon is the current working name of the suite.
