/*
 * @title ts-puppeteer 🚀
 * @desc A minimal demo automation script. Replace the navigation target
 *       (TARGET_URL env var or the code below) with your own automation.
 * @author 🧑‍💻 Shaon Kabir <shaonkabir8>
 */

import 'dotenv/config';
import debug from 'debug';
import puppeteer from 'puppeteer';
import browserOptions from '../lib/browserConfig';

const print = debug('app:status');

async function main(): Promise<void> {
  print('🚀 Launching browser and creating a page');
  const browser = await puppeteer.launch(browserOptions);

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
