# ts-puppeteer

> A minimal project generator for Puppeteer and TypeScript with a Jest setup 🚀

`ts-puppeteer` scaffolds a ready-to-run web-automation project: Puppeteer,
TypeScript, Jest tests, ESLint, Prettier and secure browser defaults — all
wired up, so you never repeat that setup by hand again.

## The problem it solves

Every new Puppeteer automation project starts the same way: install
`puppeteer`, `typescript`, `ts-node`, `jest`, `ts-jest`, the `@types/*`
packages, wire a `tsconfig.json`, a `jest.config.js`, linting, formatting and
a browser-launch configuration — before writing a single line of automation.
`ts-puppeteer` does that once, so you can start from a working baseline.

## Requirements

- Node.js **18 or newer** (only for the generator; created projects use
  TypeScript 5 and work best on Node 22+)
- npm ≥ 9 or yarn ≥ 1.22
- Network access to npm (Chrome for Testing is downloaded automatically on
  the created project's first install)

## Create a project

```bash
yarn create ts-puppeteer my-project
# or
npm create ts-puppeteer@latest my-project
# or
npx create-ts-puppeteer my-project
```

The command creates the project, renames its `package.json` and README to
match your project name, and prints the next steps. Then:

```bash
cd my-project
npm install     # or: yarn
npm start       # runs the demo automation
npm test        # runs the Jest suite
```

> **Note:** the `yarn create …` workflow requires the package to be published
> to npm as `create-ts-puppeteer`. Until the owner publishes it, you can run
> the generator straight from this repository:
> `npx github:shaonkabir8/ts-puppeteer my-project`

## What you get

```
.
├── lib
│   └── browserConfig.ts   # Puppeteer launch configuration (secure defaults)
├── src
│   ├── index.ts           # Your automation entry point
│   └── tests
│       └── index.test.ts  # Jest tests (run against a local HTTP server)
├── .env.example
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── jest.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## Scripts (in every created project)

| Script               | What it does                                |
| -------------------- | ------------------------------------------- |
| `npm start`          | Runs `src/index.ts` with `ts-node`          |
| `npm run build`      | Compiles TypeScript to `dist/`              |
| `npm test`           | Runs the Jest test suite                    |
| `npm run test:watch` | Runs Jest in watch mode                     |
| `npm run lint`       | Lints the project with ESLint (flat config) |
| `npm run lint:fix`   | Lints and auto-fixes                        |
| `npm run format`     | Formats the project with Prettier           |

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

### Secure browser defaults

`lib/browserConfig.ts` launches Chrome with:

- **sandbox enabled** — no `--no-sandbox` unless you opt in via
  `PUPPETEER_CHROME_ARGS`;
- **TLS verification enabled** — `ignoreHTTPSErrors: false`;
- **no spoofed identity** — no hardcoded user agent;
- **temporary profiles** — Puppeteer creates and cleans up a temporary
  profile per launch; set `PUPPETEER_PROFILE_DIR` to reuse a persistent one.

## Testing

The generated Jest suite starts a local HTTP server, drives it with the
same browser configuration your automation uses, and asserts on real page
content — no third-party websites, no network flakiness, fully reproducible
offline.

## Building

```bash
npm run build   # outputs compiled JavaScript to dist/
```

## Troubleshooting

- **`No usable sandbox!` / running as root** — set
  `PUPPETEER_CHROME_ARGS="--no-sandbox --disable-setuid-sandbox"` in `.env`
  (needed in some CI containers that run as root; keep the sandbox on your
  own machine).
- **Chrome download fails during install** — install a system Chrome and
  point `PUPPETEER_EXECUTABLE_PATH` at it, or retry behind the proxy
  documented at [pptr.dev](https://pptr.dev/guides/configuration#environment-variables).
- **`Could not find Chrome`** — run `npx puppeteer browsers install chrome`.
- **Tests hang** — a previous browser process may still be running; close it
  and rerun.

## Contributing

1. Fork / clone the repository and `npm install`.
2. Create a feature branch (`feat/my-change`).
3. Make your change with focused commits
   ([Conventional Commits](https://www.conventionalcommits.org/)).
4. Run `npm run lint && npm test` before opening a pull request.

Issues and pull requests are welcome at
<https://github.com/shaonkabir8/ts-puppeteer/issues>.

## License

MIT — see [LICENSE](LICENSE).
