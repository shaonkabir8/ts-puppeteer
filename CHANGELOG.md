# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Generator tests (`src/tests/generator.test.ts`): scaffolding, project-name
  validation, non-empty-directory protection, and a new `--help` / `-h` flag
  on `bin/create-ts-puppeteer.js`.
- Unit tests for `lib/browserConfig.ts` (`src/tests/browserConfig.test.ts`):
  sandbox stays on by default, `PUPPETEER_CHROME_ARGS` pass-through, and
  `PUPPETEER_PROFILE_DIR` handling.
- `PUPPETEER_PROFILE_DIR` support in the root `lib/browserConfig.ts`,
  matching the templates and the documented `.env.example`.
- `CHANGELOG.md` (this file).
- "Development (this repository)" section in the root README documenting
  repo-level checks and the test matrix.

### Fixed

- README claimed `ignoreHTTPSErrors: false` was set, but that option was
  removed in Puppeteer 23+ and the config never set it. Documentation now
  matches the actual behavior (TLS verification is always on).
- TSDoc on the exported `browserConfig` default and TSDoc/JSDoc on generator
  helper functions.

## [1.0.0] - 2026-11-17

### Added

- `create-ts-puppeteer` bin + project templates: `yarn create ts-puppeteer`
  / `npm create ts-puppeteer@latest` / `npx create-ts-puppeteer` scaffold a
  ready-to-run Puppeteer + TypeScript + Jest project (PR #3).
- Secure browser defaults: sandbox on, TLS verification on, no spoofed user
  agent, temporary profiles; sandbox escape only via explicit
  `PUPPETEER_CHROME_ARGS`.
- Await browser close with try/finally cleanup in `src/index.ts`.
- ESLint 9 flat config (TSLint removed); TypeScript 5, Jest 30 + ts-jest,
  Prettier 3.
- Jest suite running against a local HTTP server (no third-party sites).
- `.env` loading via `dotenv/config`, replacing the broken `dotenv -e .env`
  start script.
- README documenting only verified commands.
