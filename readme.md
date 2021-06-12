# Puppeteer Boilerplate with TypeScript :heart:

> A Minimal boilerplate for Puppeteer and typescript with jest setup ❤️

## Story Behind the repo :nerd:

Since last couple of mounts, my (boss ❤️ brother)[https://github.com/entprtaher] started to mentoring mine along with my team mate :blessing: about learning :robot: web automation using Puppeteer. :rocket: It's amazing :heart:

Nowadays I started to adapt myself with `Typescript` instead of writing Vanilla JavaScript :rocket:

Thats why, Everytime I just have to install `puppeteer` first, then `node-ts`,...? <...?.> 😱 I forgot to install `debug` ~ `tslint-plugin-prettier"` ~ `pre-commit` ....

Doing boring 🤮 task continiously isn't smart at all.
After all, I'm learning to automate :robot: web this days :heart:

### So, in every crowler project, I follow the steps:

1. Clone the repo:

```bash

git clone https://github.com/shaonkabir8/boilerplate-typescript-puppeteer.git

```

2. remove `git info` to start a new project :boom:

```

rm -rf .git

```

3. Insall `dependencies` and `devDependencies`

```bash

yarn

```

4. Write my code here `src/index.ts`

Obviously, I do add,modify or delete contents from:
\t - `src directory`
\t - scripts from `package.json`

Finally, It's time to run our crowler. :boom:

5.

```bash

yarn start

```

// Friday Task:

- Create <npm package>
- Write a blog on dev.to describing how I create a tiny boilerplate package for my daily needs.

## Usages

```js

  yarn create ts-puppeteer projectName

```

## Basic structure

A basic **Typescript Puppeteer Boilerplate** initially looks like this:

```
.
├── dist
│   ├── lib
│   │   └── headerConfig.js
│   └── src
│       ├── index.js
│       └── tests
│            └── index.test.js
├── lib
│   └── headerConfig.ts
├── src
│   ├── index.ts
│   └── tests
│       └── index.test.ts
├── .env
├── .gitignore
├── .prettierrc
├── jest.config.js
├── LICENSE
├── package.json
├── readme.md
├── tsconfig.json
├── tslint.json
└── yarn.lock

```


## Notes:
- This repo is created to automate my daily works according to puppereer-typescript and jest setup. Actually my boss (Taher)[https://github.com/entprtaher], CEO of CodeEatingsAnts and CO-Founder of Automatio.co started to mentoring my team mates for a big dil. I just stared to adapt myself with Typescript🔥 && Obviously I just love fall in love with Typescript 🚀

So, Let's have a look what's inside of our `package.json`.

```json

  "dependencies": {
    "debug": "^4.3.1",
    "dotenv": "^8.2.0",
    "puppeteer": "^1.18.1",
    "typescript": "^3.5.3"
  },
  "devDependencies": {
    "@types/debug": "^4.1.5",
    "@types/jest": "^26.0.20",
    "@types/node": "^10.14.13",
    "@types/puppeteer": "^1.12.4",
    "jest": "^26.6.3",
    "jest-puppeteer": "^4.4.0",
    "pre-commit": "^1.2.2",
    "prettier": "^1.19.1",
    "ts-jest": "^26.4.4",
    "ts-node": "^7.0.1",
    "tslint": "^5.18.0",
    "tslint-config-prettier": "^1.18.0",
    "tslint-plugin-prettier": "^2.0.1",
    "eslint": "^6.7.2",
    "husky": "^3.1.0",
    "lint-staged": "^9.5.0"
  }

```   