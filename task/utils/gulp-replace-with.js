'use strict'

const tap = require('gulp-tap')
const replaceWith = require('./replace-with')

/**
 * @param {Object} file
 * @param {Array}  args
 */
function replacer (file, args) {
  var content = file.contents.toString()

  args = Array.prototype.slice.call(args)

  args.forEach(function (entry) {
    if (typeof entry === 'function') {
      content = replaceWithFunction(content, entry)
    } else {
      content = replaceWithKeyValue(content, entry)
    }
  })

  file.contents = Buffer.from(content)
}

/**
 * Replaces any key-value matches in the content of the file.
 *
 * @param {string} content     - The content of the file in the Gulp stream to modify.
 * @param {Object} keyValueMap - The key-value map to us to replace the file content.
 *
 * @returns {string} The modified content of the file
 */
function replaceWithKeyValue (content, keyValueMap) {
  return replaceWith(content, keyValueMap)
}

/**
 * Replaces the content of the file by using a custom callback.
 *
 * @param {string}   content  - The content of the file in the Gulp stream to modify.
 * @param {Function} callback - The callback, which result is used to replace the file content.
 *
 * @returns {string} The modified content of the file.
 */
function replaceWithFunction (content, callback) {
  return callback(content)
}

module.exports = function () { return tap(file => replacer(file, arguments)) }
