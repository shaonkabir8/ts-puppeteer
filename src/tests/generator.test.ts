/*
 * @fileOverview Tests for the create-ts-puppeteer generator CLI.
 * Runs the real bin against a temporary directory — no network, no browser.
 */

import { execFileSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

const BIN = path.join(__dirname, '..', '..', 'bin', 'create-ts-puppeteer.js');

function scaffold(projectName: string, options?: { cwd?: string }): string {
  const cwd = options?.cwd ?? fs.mkdtempSync(path.join(os.tmpdir(), 'ctp-test-'));
  execFileSync(process.execPath, [BIN, projectName], { cwd, stdio: 'pipe' });
  return path.join(cwd, projectName);
}

describe('create-ts-puppeteer generator', () => {
  test('scaffolds a ready-to-run project with patched package.json and README', () => {
    const target = scaffold('my-app');

    for (const file of [
      'package.json',
      'README.md',
      'tsconfig.json',
      'jest.config.js',
      'eslint.config.mjs',
      '.env.example',
      path.join('src', 'index.ts'),
      path.join('src', 'tests', 'index.test.ts'),
      path.join('lib', 'browserConfig.ts'),
    ]) {
      expect(fs.existsSync(path.join(target, file))).toBe(true);
    }

    const pkg = JSON.parse(fs.readFileSync(path.join(target, 'package.json'), 'utf8')) as {
      name: string;
      bin?: Record<string, string>;
    };
    expect(pkg.name).toBe('my-app');
    expect(pkg.bin).toBeUndefined(); // created projects are automations, not CLIs

    const readme = fs.readFileSync(path.join(target, 'README.md'), 'utf8');
    expect(readme).toMatch(/^# my-app/m);
  });

  test('prints usage and exits non-zero without a project name', () => {
    expect(() =>
      execFileSync(process.execPath, [BIN], { stdio: 'pipe' }),
    ).toThrow();
  });

  test('rejects invalid project names', () => {
    expect(() =>
      execFileSync(process.execPath, [BIN, 'Not A Valid Name!'], { stdio: 'pipe' }),
    ).toThrow();
  });

  test('refuses to overwrite a non-empty directory', () => {
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'ctp-test-'));
    fs.writeFileSync(path.join(cwd, 'existing-file.txt'), 'do not delete me');
    expect(() =>
      execFileSync(process.execPath, [BIN, 'existing-file.txt'], { cwd, stdio: 'pipe' }),
    ).toThrow();
    expect(
      fs.readFileSync(path.join(cwd, 'existing-file.txt'), 'utf8'),
    ).toBe('do not delete me');
  });

  test('shows help for --help', () => {
    const output = execFileSync(process.execPath, [BIN, '--help'], {
      stdio: ['ignore', 'pipe', 'pipe'],
    }) as Buffer;
    expect(output.toString()).toContain('Usage:');
  });
});
