const crypto = require('crypto')

/**
 * Generates the SRI hash of the given string.
 *
 * @param {string}  string               - The string to use to calculate the SRI hash.
 * @param {string}  [algorithm='sha256'] - The hash algorithm to use to generate the SRI hash.
 * @param {boolean} [prefix=false]       - Whether to prefix the algorithm type to the generated hash
 *                                         (e.g.: 'sha256-...').
 *
 * @returns {string} The generated SRI string.
 */
function getSRI (string, algorithm = 'sha256', prefix = false) {
  if (typeof string !== 'string') {
    throw new Error(`The string parameter must be a string type, got: ${typeof string}`)
  }

  if (string.length < 1) {
    throw new Error(
      `The string parameter must have a .length > 0`)
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

  return prefix ? `${algorithm}-${hash}` : hash
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
