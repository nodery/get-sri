/**
 * Generates the SRI hash of the given string to use with CDN resources without publishing the content to a CDN.
 *
 * @author Richard Szakacs <richardszkcs@gmail.com> (www.richardszkcs.com)
 * @version 1.0.2
 * @license MIT
 *
 * @module get-sri
 */

const crypto = require('crypto')

/**
 * Generates the SRI hash of the given string.
 *
 * @alias module:get-sri
 *
 * @param {string}  string               - The string to use to calculate the SRI hash.
 * @param {string}  [algorithm='sha256'] - The hash algorithm to use to generate the SRI hash.
 * @param {boolean} [prefix=false]       - Whether to prefix the algorithm type to the generated hash
 *                                         (e.g.: 'sha256-...').
 *
 * @returns {string} The generated SRI string.
 *
 * @example
 * const getSRI = require('get-sri')
 *
 * // returns the SRI hash without prefix ('sha256' by default)
 * getSRI('... file content as string ...') // 'OXPgIukyI[...]6SgMU3pmfURI='
 *
 * // returns the SRI hash with prefix ('sha256' by default, can be 'sha256', 'sha384', or 'sha512')
 * getSRI('... file content as string ...', getSRI.SHA256, true) // 'sha256-OXPgIukyI[...]6SgMU3pmfURI='
 */
function getSRI (string, algorithm, prefix) {
  if (typeof string !== 'string') {
    throw new Error('The string parameter must be a string type, got: ' + typeof string)
  }

  if (string.length < 1) {
    throw new Error('The string parameter must have a .length > 0')
  }

  switch (algorithm) {
    case getSRI.SHA256:
    case getSRI.SHA384:
    case getSRI.SHA512:
      break

    default:
      algorithm = getSRI.SHA256
      break
  }

  const hash = crypto.createHash(algorithm).update(string).digest('base64')

  prefix = typeof prefix === 'boolean' ? prefix : false

  return prefix ? algorithm + '-' + hash : hash
}

/**
 * The 'sha256' hash algorithm constant.
 *
 * @const {string}
 */
getSRI.SHA256 = 'sha256'

/**
 * The 'sha384' hash algorithm constant.
 *
 * @const {string}
 */
getSRI.SHA384 = 'sha384'

/**
 * The 'sha512' hash algorithm constant.
 *
 * @const {string}
 */
getSRI.SHA512 = 'sha512'

module.exports = getSRI
