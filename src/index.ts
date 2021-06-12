/*
 * @title ts-puppeteer 🚀
 * @desc 📝 A minimal boilerplate for Puppeteer and typescript.🚀
 * @version 1.0.0
 * @author 🧑‍💻 Shaon Kabir <shaonkabir8>
 */

// Let's scraping

import debug from 'debug';
import puppeteer from 'puppeteer';
import options from '../lib/headerConfig';

const print = debug('app:status');

(async () => {
	print('🎉 Launch new Browser and create new Tab');
	const browser = await puppeteer.launch(options);
	const [page] = await browser.pages();

	// Write your code here instead of Navigating into `google.com` 🚀

	print('🚀 Navigate into Google.com');
	await page.goto('https://google.com', { waitUntil: 'domcontentloaded'});

	print('☑️ Broser Closed');
	browser.close();

})();
