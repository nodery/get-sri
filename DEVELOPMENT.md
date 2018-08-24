# Development Guide

**Discuss, Clone, Develop, Commit, Benefit**

## Tools

 - Tasks: [**Gulp**][1]
 - Tests: [**Tap**][2]
 - Watcher: [**Nodemon**][3]
 - Hooks: [**Husky**][4] 
 - Style: [**StandardJS**][5]
 - Catalyst: [**Coffee**][6]

## Structure

 - **doc**: API documentation based on the JSDoc in the `src` **(generated)**
 - **lib**: code to `require` and use **(generated)** 
 - **src**: project source
 - **task**: organized Gulp tasks
 - **test**: organized unit tests

## Main commands

```bash
# Check coding style according to StandardJS
npm run lint

# Fix coding style according to StandardJS
npm run lint:fix

# Generate the documentation from the distribution version
npm run doc

# Generate the build for distribution from the source
npm run build

# Build and run tests
npm run dev

# Nodemon command for development with all the tests
nodemon --exec npm run dev

# Nodemon command for development with one specific test
nodemon --exec npm run dev:one -- test/algorithm.test.js

# Run lint check, build lib and doc and run the unit tests
npm run test
```

### For owners/maintainers only:

```bash
# Release and publish (default is --patch)
npm run release
npm run release -- --patch
npm run release -- --minor
npm run release -- --major
```

# HAVE FUN!


  [1]: https://gulpjs.com
  [2]: https://www.node-tap.org
  [3]: http://nodemon.io
  [4]: https://www.npmjs.com/package/husky
  [5]: https://standardjs.com
  [6]: https://twitter.com/richardszkcs/status/1006990821709766658
