const tap = require('tap')
const utils = require('./utils')
const getSRI = utils.getSRI

tap.test('prefix', function (t) {
  t.equal(getSRI('-', getSRI.SHA256), 'OXPgIukyIPkhLBjQ0MVDrnwwnkZkDak6SgMU3pmfURI=')
  t.equal(getSRI('-', getSRI.SHA256, false), 'OXPgIukyIPkhLBjQ0MVDrnwwnkZkDak6SgMU3pmfURI=')
  t.equal(getSRI('-', getSRI.SHA256, true), 'sha256-OXPgIukyIPkhLBjQ0MVDrnwwnkZkDak6SgMU3pmfURI=')

  t.end()
})
