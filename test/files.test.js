const tap = require('tap')
const path = require('path')
const fs = require('fs')
const utils = require('./utils')
const getSRI = utils.getSRI

tap.test('prefix', function (t) {
  const fixtures = path.normalize(path.join(process.cwd(), '/test/fixtures/'))
  const files = [
    'bootstrap.min.css',
    'sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO',

    'bootstrap.min.js',
    'sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy',

    'jquery-3.3.1.slim.min.js',
    'sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo',

    'popper.min.js',
    'sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49'
  ]

  for (var i = 0, len = files.length; i < len; i += 2) {
    const content = fs.readFileSync(path.join(fixtures, files[i])).toString()
    const hash = files[i + 1]

    t.equal(getSRI(content, getSRI.SHA384, true), hash)
  }

  t.end()
})
