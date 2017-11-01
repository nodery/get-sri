const tap = require('tap')
const utils = require('./utils')
const getSRI = utils.getSRI

tap.test('algorithm', function (t) {
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
