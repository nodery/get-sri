'use strict'

/**
 * Replace the given string containing placeholder with the key-value pairs of the object.
 *
 * @function replaceWith
 *
 * @param {string} string      - The string to use to replace the placeholders within.
 * @param {Object} replacement - The string to use to replace the placeholders within.
 * @param {Object} options     - The string to use to replace the placeholders within.
 *
 * @returns {string} The replaced string.
 *//**
 * Replace the given string containing placeholder with the key-value pairs of the object.
 *
 * @function replaceWith
 *
 * @param {string}   string   - The string to use to replace the placeholders within.
 * @param {Function} replacer - The string to use to replace the placeholders within.
 * @param {Object}   options  - The string to use to replace the placeholders within.
 *
 * @returns {string} The replaced string.
 *//**
 * Replace the given string containing placeholder with the key-value pairs of the object.
 *
 * @function replaceWith
 *
 * @param {string} string      - The string to use to replace the placeholders within.
 * @param {RegExp} searchFor   - The string to use to replace the placeholders within.
 * @param {string} replaceWith - The key-value pairs to use to replace the placeholders with.
 *
 * @returns {string} The replaced string.
 *//**
 * Replace the given string containing placeholder with the key-value pairs of the object.
 *
 * @function replaceWith
 *
 * @param {string}  string            - The string to use to replace the placeholders within.
 * @param {string}  searchFor         - The string to use to replace the placeholders within.
 * @param {string}  replaceWith       - The key-value pairs to use to replace the placeholders with.
 * @param {boolean} [replaceAll=true] - The key-value pairs to use to replace the placeholders with.
 *
 * @returns {string} The replaced string.
 */
function replaceWith (string, searchFor, replaceWith, replaceAll) {
  // TODO: string as replacement, function as replacement, replaceAll as 3rd boolean parameter
  // TODO: set beginning/end replacement characters
  // TODO: replace patterns: {{ pattern }}, { pattern }, [ pattern ], [[ pattern ]], pattern._-pattern

  if (typeof searchFor === 'string') {
    replaceAll = typeof replaceAll === 'boolean' ? replaceAll : true

    return replaceAll
      ? string.split(searchFor).join(replaceWith)
      : string.replace(searchFor, replaceWith)
  }

  if (searchFor instanceof RegExp) {
    // TODO: note in the document, that replaceAll is ignored in favor of the RegExp /g flag
    return string.replace(searchFor, replaceWith)
  }

  if (Object.prototype.toString.call(searchFor) === '[object Object]') {
    return string.replace(/{{\s*?(\w+)\s*?}}/g, function (match, key) {
      return key in searchFor
        ? searchFor[key]
        : match
    })
  }

  if (typeof searchFor === 'function') {
    return string.replace(/{{\s*?(\w+)\s*?}}/g, searchFor)
  }

  return string
}

module.exports = replaceWith
