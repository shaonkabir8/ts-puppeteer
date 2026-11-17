/*
 * @fileOverview 🛠️ Puppeteer launch configuration 🛠️
 *
 * Secure defaults first:
 *   - Chrome's sandbox stays ENABLED (no `--no-sandbox`).
 *   - TLS/HTTPS certificate errors are NOT ignored (Puppeteer 23+ removed the
 *     `ignoreHTTPSErrors` option; the browser always verifies certificates).
 *   - No hardcoded user agent or browser identity.
 *   - No fixed userDataDir: Puppeteer creates a temporary profile
 *     per launch and cleans it up automatically.
 *
 * Escape hatch for locked-down environments (CI containers running as root):
 *   PUPPETEER_CHROME_ARGS="--no-sandbox --disable-setuid-sandbox"
 * Any extra Chrome arguments must be opted into explicitly.
 *
 * Optional persistent profile directory via PUPPETEER_PROFILE_DIR;
 * by default a temporary profile is used and removed on close.
 * @see https://developer.chrome.com/docs/chromium/linux-sandbox
 */

import 'dotenv/config';
import type { LaunchOptions } from 'puppeteer';

/**
 * Builds the Puppeteer {@link LaunchOptions} used by every launch in this
 * project, from two optional environment variables:
 *
 * - `PUPPETEER_CHROME_ARGS` — space-separated extra Chrome arguments
 *   (e.g. `--no-sandbox --disable-setuid-sandbox` in root-owned CI containers).
 * - `PUPPETEER_PROFILE_DIR` — absolute path to a persistent browser profile.
 *   When unset, Puppeteer uses a temporary profile and removes it on close.
 *
 * The environment is read once at import time, matching how the demo script
 * and the Jest suite consume this module.
 */
const extraChromeArgs = (process.env.PUPPETEER_CHROME_ARGS ?? '')
  .split(' ')
  .map((arg) => arg.trim())
  .filter(Boolean);

const browserConfig: LaunchOptions = {
  headless: true,
  args: extraChromeArgs,
  defaultViewport: { width: 1280, height: 768 },
};

if (process.env.PUPPETEER_PROFILE_DIR) {
  browserConfig.userDataDir = process.env.PUPPETEER_PROFILE_DIR;
}

export default browserConfig;
