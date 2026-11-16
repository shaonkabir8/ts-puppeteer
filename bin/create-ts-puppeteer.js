#!/usr/bin/env node
'use strict';

/**
 * create-ts-puppeteer
 * Scaffolds a ready-to-run Puppeteer + TypeScript + Jest project.
 *
 * Usage:
 *   yarn create ts-puppeteer <projectName>
 *   npm create ts-puppeteer@latest <projectName>
 *   npx create-ts-puppeteer <projectName>
 */

const fs = require('node:fs');
const path = require('node:path');

const VALID_NAME = /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;

function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      fs.chmodSync(destPath, 0o644);
    }
  }
}

function main() {
  const projectName = process.argv[2];

  if (!projectName) {
    console.error('✖ Usage: yarn create ts-puppeteer <projectName>');
    process.exit(1);
  }

  if (!VALID_NAME.test(projectName)) {
    console.error(
      `✖ "${projectName}" is not a valid project name.\n` +
        '  Use lowercase letters, digits and dashes (optionally "@scope/name").',
    );
    process.exit(1);
  }

  const targetDir = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
    console.error(`✖ Directory "${projectName}" already exists and is not empty.`);
    process.exit(1);
  }

  const templateDir = path.join(__dirname, '..', 'templates');
  copyDir(templateDir, targetDir);

  // Patch the package.json of the freshly created project.
  const packageJsonPath = path.join(targetDir, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  packageJson.name = projectName;
  packageJson.version = '1.0.0';
  fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`, 'utf8');

  // Patch the project README title.
  const readmePath = path.join(targetDir, 'README.md');
  const readme = fs.readFileSync(readmePath, 'utf8').replace(/# PROJECT_NAME/g, `# ${projectName}`);
  fs.writeFileSync(readmePath, readme, 'utf8');

  console.log(`✅ Created ${projectName} at ${targetDir}`);
  console.log('');
  console.log('Next steps:');
  console.log(`  cd ${projectName}`);
  console.log('  npm install     # or: yarn');
  console.log('  npm start       # or: yarn start  → runs the demo automation');
  console.log('  npm test        # or: yarn test   → runs the Jest suite');
  console.log('  npm run build   # or: yarn build  → compiles to dist/');
}

main();
