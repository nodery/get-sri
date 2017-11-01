const tap = require('tap')
const utils = require('./utils')
const getSRI = utils.getSRI

tap.test('error', function (t) {
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
