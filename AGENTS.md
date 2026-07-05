# AGENTS.md — snevsky.com

Personal site. Jekyll on GitHub Pages: push to master = deploy, live at
https://snevsky.com a couple of minutes later. No build step to run locally
beyond `./serve.sh` for preview. Excluded from the built site via
`_config.yml` `exclude` (this file is repo docs, not content).

Voice rule for anything published here: no em-dashes (AI tell) — use
comma/colon/parens. Full brand rules live in
`~/life/wealth/brand/CONTENT.md`.

## Films page

- **Single source of truth: `_data/films.json`** — one JSON array
  (RATING / TITLE / YEAR / DIRECTOR / DATE SEEN / REPEAT, all strings;
  dates M/D/YYYY without leading zeros). Every film Serge has seen since
  2009, ~1,100 entries.
- `films.html` (permalink `/films/`) inlines it at build time via
  `window.FILMS = {{ site.data.films | jsonify }}`; `assets/js/films.js`
  (vanilla, no deps) renders the sortable/filterable/paginated table.
- **Updating from Plex**: run `~/plex_history.py` (queries the local Plex
  server; set `SINCE_DATE` to the last sync) → writes a TSV. Serge then
  hand-edits `~/movies.tsv`: rating 1–5 in the `Rating` column, or `x` to
  exclude a row (wife/kids watching, not him — most rows in practice).
  Merge the keepers into `films.json`: skip rows already present by
  (title, date), set `REPEAT: TRUE` if the title appears earlier in the
  array. Plex `lastViewedAt` only keeps the *last* view per movie, so the
  merge is **append-only since the previous sync** — never regenerate the
  whole history. Last synced 2026-07-05 (through 6/21/2026).
- The old `Dejital/films` repo (`~/projects/films`, legacy Angular app) is
  retired: its Pages site is disabled and `/films/` is served from this
  repo. Don't touch it.
