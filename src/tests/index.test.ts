/*
 * @fileOverview Tests for the boilerplate itself, using Jest 🎉
 * Tests run against a LOCAL HTTP server: no third-party websites required,
 * so the suite is fast and reproducible offline.
 */

import * as http from 'node:http';
import type { AddressInfo } from 'node:net';
import puppeteer from 'puppeteer';
import type { Browser, Page } from 'puppeteer';
import browserConfig from '../../lib/browserConfig';

const INDEX_HTML =
  '<!doctype html><html><head><title>ts-puppeteer test page</title></head>' +
  '<body><h1 id="greeting">Hello from ts-puppeteer</h1>' +
  '<a id="link" href="/next">Next</a></body></html>';
const NEXT_HTML = INDEX_HTML.replace('ts-puppeteer test page', 'next page');

let server: http.Server;
let baseUrl: string;
let browser: Browser;
let page: Page;

beforeAll(async () => {
  server = http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(req.url === '/next' ? NEXT_HTML : INDEX_HTML);
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address() as AddressInfo;
  baseUrl = `http://127.0.0.1:${address.port}`;

  browser = await puppeteer.launch(browserConfig);
  page = await browser.newPage();
});

afterAll(async () => {
  await page?.close();
  await browser?.close();
  await new Promise<void>((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve())),
  );
});

describe('browser automation', () => {
  test('launches a browser and reads content from a local page', async () => {
    await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });

    expect(await page.title()).toBe('ts-puppeteer test page');
    const greeting = await page.$('#greeting');
    expect(await greeting?.evaluate((node) => node.textContent)).toBe('Hello from ts-puppeteer');
  });

  test('follows a link inside the local site', async () => {
    await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      page.click('#link'),
    ]);

    expect(await page.title()).toBe('next page');
    expect(page.url()).toBe(`${baseUrl}/next`);
  });
});
