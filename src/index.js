'use strict'

const crypto = require('crypto')

/**
 * @typedef {Object} GetSriOptions
 *
 * @property {string} [string]                 - The string to use to calculate the SRI hash.
 * @property {string} [file]                   - The path of the file to load and use to calculate the SRI hash.
 * @property {string} [template='hashOnly']    - The path of the file to load and use to calculate the SRI hash.
 * @property {string} [hashAlgorithm='sha256'] - The hash algorithm to use to generate the SRI hash.
 */

/**
 * Generates the SRI hash of the given string or file.
 *
 * @param {string}               string
 * @param {string|GetSriOptions} [hashAlgorithmOrOptions='sha256']
 *
 * @returns {string} The generated SRI string
 */
function getSRI (string, hashAlgorithmOrOptions = 'sha256') {
  return crypto.createHash(hashAlgorithm).update(stringOrOptions).digest('base64')
}

/**
 * The default template to use, when returning the SRI hash.
 *
 * @const {string}
 */
getSRI.TEMPLATE_HASH_ONLY = 'hashOnly'

/**
 * The SRI hash prefixed with the algorithm type
 *
 * @const {string}
 */
getSRI.TEMPLATE_PREFIXED_HASH = 'prefixedHash'

/**
 * The <link> tag embedded the SRI hash into.
 *
 * @const {string}
 */
getSRI.TEMPLATE_LINK_TAG = 'linkTag'

/**
 * The <script> tag embedded the SRI hash into.
 *
 * @const {string}
 */
getSRI.TEMPLATE_SCRIPT_TAG = 'scriptTag'

/**
 * The 'sha256' algorithm constant.
 *
 * @const {string}
 */
getSRI.SHA256 = 'sha256'

/**
 * The 'sha384' algorithm constant.
 *
 * @const {string}
 */
getSRI.SHA384 = 'sha384'

/**
 * The 'sha512' algorithm constant.
 *
 * @const {string}
 */
getSRI.SHA512 = 'sha512'

module.exports = getSRI
