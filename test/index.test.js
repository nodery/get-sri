const tap = require('tap')
const path = require('path')
const fs = require('fs')
const pkg = require('../package')
const getSRI = require(path.normalize(path.join(__dirname, '../', pkg.main)))

tap.test(pkg.name, function (t) {
  t.test('error', function (t) {
    var message

    try {
      getSRI()
    } catch (error) {
      message = error.message
    }
    t.equal(message, 'The string parameter must be a string type, got: undefined')

    try {
      getSRI(0)
    } catch (error) {
      message = error.message
    }
    t.equal(message, 'The string parameter must be a string type, got: number')

    try {
      getSRI('')
    } catch (error) {
      message = error.message
    }
    t.equal(message, 'The string parameter must have a .length > 0')

    t.end()
  })

  t.test('algorithm', function (t) {
    var hash

    hash = getSRI('-', getSRI.SHA256, true)
    t.equal(hash.indexOf('sha256-'), 0)

    hash = getSRI('-', getSRI.SHA384, true)
    t.equal(hash.indexOf('sha384-'), 0)

    hash = getSRI('-', getSRI.SHA512, true)
    t.equal(hash.indexOf('sha512-'), 0)

    hash = getSRI('-', 'no-hash', true)
    t.equal(hash.indexOf('sha256-'), 0)

    t.end()
  })

  t.test('prefix', function (t) {
    t.equal(getSRI('-', getSRI.SHA256), 'OXPgIukyIPkhLBjQ0MVDrnwwnkZkDak6SgMU3pmfURI=')
    t.equal(getSRI('-', getSRI.SHA256, false), 'OXPgIukyIPkhLBjQ0MVDrnwwnkZkDak6SgMU3pmfURI=')
    t.equal(getSRI('-', getSRI.SHA256, true), 'sha256-OXPgIukyIPkhLBjQ0MVDrnwwnkZkDak6SgMU3pmfURI=')

    t.end()
  })

  t.test('files', function (t) {
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

    for (let i = 0, len = files.length; i < len; i += 2) {
      const content = fs.readFileSync(path.join(fixtures, files[i])).toString()
      const hash = files[i + 1]

      t.equal(getSRI(content, getSRI.SHA384, true), hash)
    }

    t.end()
  })

  t.end()
})
