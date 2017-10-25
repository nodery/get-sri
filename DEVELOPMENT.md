Development Guide
=================

**Discuss, Clone, Develop, Commit, Benefit**

Tools
-----

 - Tasks: [**Gulp**][1]
 - Tests: [**Tap**][2]
 - Style: [**StandardJS**][3]
 - Catalyst: [**Coffee**][4]

Structure
---------

 - **dist**: generated code for distribution
 - **doc**: generated API documentation based on the JSDoc in the source
 - **src**: project source
 - **task**: organized Gulp tasks
 - **test**: organized unit tests

Main NPM commands
-----------------

```bash
# Check coding style according to StandardJS
npm run lint

# Fix coding style according to StandardJS
npm run lint:fix

# Generate the build for distribution from the source
npm run build

# Generate the documentation from the distribution version
npm run build:doc

# Run lint check, build dist and doc and run the unit tests
npm run test
```

HAVE FUN!
---------

 [1]: https://gulpjs.com
 [2]: https://www.node-tap.org
 [3]: https://standardjs.com
 [4]: https://twitter.com/richardszkcs/status/1006990821709766658
