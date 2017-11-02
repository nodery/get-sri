'use strict'

const path = require('path')
const through = require('through2')
const PluginError = require('plugin-error')
const isBinary = require('file-is-binary')
const semver = require('semver')
const log = require('fancy-log')

const PLUGIN_NAME = 'gulp-bumper'

const DEFAULT_NUM_SPACES = 2

/**
 * @typedef {Object} gulpBumperOptions
 *
 * @property {number}  [numSpaces=2]
 */

/**
 * @param {string}            [bumpType]
 * @param {gulpBumperOptions} [options]
 *
 * @returns {DestroyableTransform}
 */
function gulpBumper (bumpType, options) {
  options = options || {}

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      cb(null, file)
      return
    }

    if (file.isStream()) {
      cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'))
      return
    }

    const filePath = file.path

    if (isBinary(file)) {
      const fileName = path.basename(filePath)

      cb(new PluginError(PLUGIN_NAME, 'File "' + fileName + '" on "' + filePath + '" must be a text file'))
      return
    }

    const originalContent = file.contents.toString()

    var pkg

    try {
      pkg = JSON.parse(originalContent)
    } catch (error) {
      cb(new PluginError(PLUGIN_NAME, error, { fileName: filePath }))
    }

    const argv = process.argv[process.argv.length - 1]

    bumpType = typeof bumpType === 'string' ? bumpType : argv
    bumpType = bumpType.toLowerCase()

    switch (bumpType) {
      case 'major':
      case '-major':
      case '--major':
        bumpType = 'major'
        break

      case 'minor':
      case '-minor':
      case '--minor':
        bumpType = 'minor'
        break

      case 'patch':
      case '-patch':
      case '--patch':
      default:
        bumpType = 'patch'
        break
    }

    const spacesPattern = /^{\s*[\r\n]+(\s+)/
    const matches = originalContent.match(spacesPattern) || []
    const spaces = matches[1] || ''

    var numSpaces = spaces.length || DEFAULT_NUM_SPACES

    if (typeof options.numSpaces === 'number' && options.numSpaces > 0 && options.numSpaces <= 8) {
      numSpaces = options.numSpaces
    }

    const finalNewlinePattern = /}[\r\n]+$/
    const hasFinalNewline = finalNewlinePattern.test(originalContent)

    try {
      const oldVer = pkg.version
      const newVer = semver.inc(oldVer, bumpType)

      pkg.version = newVer

      var content = JSON.stringify(pkg, null, numSpaces)

      if (hasFinalNewline) {
        content += '\n'
      }

      log('Increased version to ' + newVer + ' (' + bumpType + ') from ' + oldVer)

      file.contents = Buffer.from(content)
      this.push(file)
    } catch (error) {
      this.emit('error', new PluginError(PLUGIN_NAME, error, { fileName: filePath }))
    }

    cb()
  })
}

gulpBumper.MAJOR = 'major'

gulpBumper.MINOR = 'minor'

gulpBumper.PATCH = 'patch'

gulpBumper.DEFAULT = gulpBumper.PATCH

module.exports = gulpBumper
