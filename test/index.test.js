const tap = require('tap')
const path = require('path')
const pkg = require('../package')
const getSRI = require(path.normalize(`${__dirname}/../${pkg.main}`))

tap.test(pkg.name, function(t) {
  t.test('error', function(t) {
    let message

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

  t.test('algorithm', function(t) {
    let hash

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

  t.test('prefix', function(t) {
    t.equal(getSRI('-', getSRI.SHA256, false), 'OXPgIukyIPkhLBjQ0MVDrnwwnkZkDak6SgMU3pmfURI=')
    t.equal(getSRI('-', getSRI.SHA256, true), 'sha256-OXPgIukyIPkhLBjQ0MVDrnwwnkZkDak6SgMU3pmfURI=')

    t.end()
  })

  t.end()
})
