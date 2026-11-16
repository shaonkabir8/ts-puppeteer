/*
 * @title PROJECT_NAME 🚀
 * @desc A minimal Puppeteer + TypeScript automation script.
 *       Replace the navigation target (TARGET_URL in .env or the code below)
 *       with your own automation.
 */

import 'dotenv/config';
import debug from 'debug';
import puppeteer from 'puppeteer';
import browserConfig from '../lib/browserConfig';

const print = debug('app:status');

async function main(): Promise<void> {
  print('🚀 Launching browser and creating a page');
  const browser = await puppeteer.launch(browserConfig);

  try {
    const [page] = await browser.pages();

    // Write your automation code here instead of visiting example.com 🚀
    const targetUrl = process.env.TARGET_URL ?? 'https://example.com';
    print(`🌐 Navigating to ${targetUrl}`);
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
    print(`☑️ Page title: ${await page.title()}`);
  } finally {
    print('🧹 Closing browser');
    await browser.close();
  }
}

main().catch((error) => {
  print(`❌ ${error instanceof Error ? (error.stack ?? error.message) : error}`);
  process.exitCode = 1;
});
