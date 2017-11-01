'use strict'

const path = require('path')
const through = require('through2')
const PluginError = require('plugin-error')
const isBinary = require('file-is-binary')
const Vinyl = require('vinyl')
const jsdoc2md = require('jsdoc-to-markdown')

const PLUGIN_NAME = 'gulp-jsdoc2md'

/**
 * @typedef {Object} gulpJsdoc2MdOptions
 *
 * @property {string}  [name="API.md"] - The name of the combined markdown file
 * @property {boolean} [combine=true]  - Combine multiple generated markdowns into one
 * @property {boolean} [gfm=false]     - GitHub flavored markdown-specific rendering
 */

/**
 * @param {string|string[]} files
 * @param {boolean} gfm
 *
 * @returns {string}
 */
function generateDoc (files, gfm) {
  return jsdoc2md.renderSync({
    files: files,
    'no-gfm': !gfm // https://github.com/jsdoc2md/jsdoc-to-markdown/issues/110
  })
}

/**
 * @param {gulpJsdoc2MdOptions} [options]
 *
 * @returns {*}
 */
function gulpJsdoc2Md (options) {
  options = options || {}

  const name = typeof options.name === 'string' ? options.name : 'API.md'
  const combine = typeof options.combine === 'boolean' ? options.combine : true
  const gfm = typeof options.gfm === 'boolean' ? options.gfm : false
  const paths = []

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      cb(null, file)
      return
    }

    if (file.isStream()) {
      cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'))
      return
    }

    const fileName = path.basename(file.path)
    const fileExt = path.extname(file.path)

    if (isBinary(file) || fileExt !== '.js') {
      cb(new PluginError(PLUGIN_NAME, 'File "' + fileName + '" on "' + file.path + '" must be a JavaScript file'))
      return
    }

    if (combine) {
      paths.push(file.path)
    } else {
      const filePath = path.relative(file.base, file.path).replace(/\.js$/, '.md')

      this.push(new Vinyl({
        path: filePath,
        contents: Buffer.from(generateDoc(file.path, gfm))
      }))
    }

    cb()
  }, function (cb) {
    if (combine) {
      this.push(new Vinyl({
        path: name,
        contents: Buffer.from(generateDoc(paths, gfm))
      }))
    }

    cb()
  })
}

module.exports = gulpJsdoc2Md
