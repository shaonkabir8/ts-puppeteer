/*
 * @fileOverview Unit tests for lib/browserConfig — secure defaults & env handling.
 * No browser launch: these validate the configuration object only, so they are
 * fast and run anywhere.
 */

type LaunchOptions = import('puppeteer').LaunchOptions;

/**
 * Loads `lib/browserConfig` fresh with a controlled environment, so the
 * module-level env reads inside it see exactly `env`.
 */
function loadConfig(env: Record<string, string | undefined>): LaunchOptions {
  jest.resetModules();
  const savedChromeArgs = process.env.PUPPETEER_CHROME_ARGS;
  const savedProfileDir = process.env.PUPPETEER_PROFILE_DIR;

  delete process.env.PUPPETEER_CHROME_ARGS;
  delete process.env.PUPPETEER_PROFILE_DIR;
  for (const [key, value] of Object.entries(env)) {
    if (value !== undefined) process.env[key] = value;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('../../lib/browserConfig').default as LaunchOptions;
  } finally {
    if (savedChromeArgs === undefined) delete process.env.PUPPETEER_CHROME_ARGS;
    else process.env.PUPPETEER_CHROME_ARGS = savedChromeArgs;
    if (savedProfileDir === undefined) delete process.env.PUPPETEER_PROFILE_DIR;
    else process.env.PUPPETEER_PROFILE_DIR = savedProfileDir;
  }
}

describe('browserConfig secure defaults', () => {
  test('keeps the sandbox on by default (no --no-sandbox injected)', () => {
    const config = loadConfig({});
    expect(config.headless).toBe(true);
    expect(config.args).toEqual([]);
  });

  test('ignores blank/whitespace arguments', () => {
    const config = loadConfig({ PUPPETEER_CHROME_ARGS: '   ' });
    expect(config.args).toEqual([]);
  });

  test('passes explicit Chrome arguments through when opted in', () => {
    const config = loadConfig({
      PUPPETEER_CHROME_ARGS: '--no-sandbox --disable-setuid-sandbox',
    });
    expect(config.args).toEqual(['--no-sandbox', '--disable-setuid-sandbox']);
  });

  test('uses a temporary profile by default (no userDataDir pinned)', () => {
    const config = loadConfig({});
    expect(config.userDataDir).toBeUndefined();
  });

  test('honours PUPPETEER_PROFILE_DIR for a persistent profile', () => {
    const config = loadConfig({ PUPPETEER_PROFILE_DIR: '/tmp/ctp-profile' });
    expect(config.userDataDir).toBe('/tmp/ctp-profile');
  });
});
