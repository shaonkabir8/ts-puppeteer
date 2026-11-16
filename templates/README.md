# PROJECT_NAME

A Puppeteer + TypeScript + Jest automation project, created with
[create-ts-puppeteer](https://github.com/shaonkabir8/ts-puppeteer).

## Requirements

- Node.js **18 or newer** (Chrome for Testing is downloaded automatically on install)
- Network access to npm on first install

## Getting started

```bash
npm install     # or: yarn
npm start       # runs the demo automation (src/index.ts)
npm test        # runs the Jest suite
```

## Scripts

| Script               | What it does                       |
| -------------------- | ---------------------------------- |
| `npm start`          | Runs `src/index.ts` with `ts-node` |
| `npm run build`      | Compiles TypeScript to `dist/`     |
| `npm test`           | Runs the Jest test suite           |
| `npm run test:watch` | Runs Jest in watch mode            |
| `npm run lint`       | Lints the project with ESLint      |
| `npm run lint:fix`   | Lints and auto-fixes               |
| `npm run format`     | Formats the project with Prettier  |

## Configuration

Copy the example environment file and adjust it:

```bash
cp .env.example .env
```

| Variable                    | Purpose                                                                  |
| --------------------------- | ------------------------------------------------------------------------ |
| `TARGET_URL`                | URL visited by the demo script                                           |
| `PUPPETEER_CHROME_ARGS`     | Extra Chrome arguments (e.g. `--no-sandbox` in root-owned CI containers) |
| `PUPPETEER_PROFILE_DIR`     | Optional persistent browser profile directory                            |
| `PUPPETEER_EXECUTABLE_PATH` | Optional path to a system Chrome/Chromium                                |

Browser defaults are secure: the sandbox is enabled, TLS errors are **not**
ignored, and no user agent is spoofed. Change `lib/browserConfig.ts` to
customize launch options.

## Project structure

```
.
├── lib
│   └── browserConfig.ts   # Puppeteer launch configuration
├── src
│   ├── index.ts           # Your automation entry point
│   └── tests
│       └── index.test.ts  # Jest tests (run against a local HTTP server)
├── .env.example
├── jest.config.js
├── tsconfig.json
└── eslint.config.mjs
```

## Troubleshooting

- **`No usable sandbox!` / running as root** — set
  `PUPPETEER_CHROME_ARGS="--no-sandbox --disable-setuid-sandbox"` in `.env`
  (CI containers running as root only).
- **Chrome download fails during install** — install a system Chrome and point
  `PUPPETEER_EXECUTABLE_PATH` at it, or retry behind the proxy documented at
  <https://pptr.dev/guides/configuration#environment-variables>.
- **`Could not find Chrome`** — run `npx puppeteer browsers install chrome`.
- **Tests hang** — a previous browser process may still be running; close it and
  rerun the tests.

## Contributing

Issues and pull requests are welcome at the
[ts-puppeteer repository](https://github.com/shaonkabir8/ts-puppeteer).
