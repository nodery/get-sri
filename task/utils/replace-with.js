/**
 * Replace the given string containing placeholder with the key-value pairs of the object.
 *
 * @param {string} string - The string to use to replace the placeholders within.
 * @param {Object} object - The key-value pairs to use to replace the placeholders with.
 *
 * @returns {string}
 */
function replaceWith (string, object) {
  string = string || ''
  object = object || {}

  return string.replace(/{{\s*?(\w+)\s*?}}/g, function (match, key) {
    if (key in object) {
      return object[key]
    }

    return match
  })
}

module.exports = replaceWith
