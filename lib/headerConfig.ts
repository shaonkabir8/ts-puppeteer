/*
 * @fileOverview ⚒️ Puppeteer Configuration ⚒️ Arguments and Options to configure Puppeteer 🎉
 * @author: 🧑‍💻 Shaon Kabir <shaonkabir8>
 * @see: https://gist.github.com/tegansnyder/c3aeae4d57768c58247ae6c4e5acd3d1
 */

// Arguments to hide detection 🚨
const args = [
	'--no-sandbox',
	'--disable-setuid-sandbox',
	'--disable-infobars',
	'--window-position=0,0',
	'--ignore-certifcate-errors',
	'--ignore-certifcate-errors-spki-list',
	'--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"',
];

// set viewport
const viewport = { width: 1280, height: 768 };

const options = {
	args,
	headless: false,
	ignoreHTTPSErrors: true,
	userDataDir: './tmp',
	defaultViewport: viewport,
};

export default options;
