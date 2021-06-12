/*
 * @fileOverview Test our codes using Jest 🎉
 * @link https://github.com/maxmindlin/ts-puppeteer-env/blob/master/src/index.test.ts
 */


import puppeteer from 'puppeteer';

let browser: puppeteer.Browser;
let page: puppeteer.Page;


beforeAll(async () => {
	browser = await puppeteer.launch();
	page = await browser.newPage();
	page.on('console', (consoleObj) => console.log(consoleObj.text()));
});

afterAll(async () => {
	await browser.close();
});

afterEach(async () => {
	await page.close();
	page = await browser.newPage();
});

// Our Test Go Here 🚀
describe('Browser tests go here', () => {
	test('test', () => {
		console.log('We\'re ready to test! 🔥 Boom 🔥');
	});
});
