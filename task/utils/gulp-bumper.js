'use strict'

const path = require('path')

const through = require('through2')
const PluginError = require('plugin-error')
const isBinary = require('file-is-binary')
const semver = require('semver')
const log = require('fancy-log')

function gulpBumper (bumpType) {
  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      cb(null, file)
      return
    }

    if (file.isStream()) {
      cb(new PluginError('gulp-bumper', 'Streaming not supported'))
      return
    }

    if (isBinary(file)) {
      const fileName = path.basename(file.path)

      cb(new PluginError('gulp-bumper', 'File "' + fileName + '" on "' + file.path + '" must be a text file'))
      return
    }

    const originalContent = file.contents.toString()

    var pkg

    try {
      pkg = JSON.parse(originalContent)
    } catch (error) {
      cb(new PluginError('gulp-bumper', error, {fileName: file.path}))
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
        bumpType = 'patch'
        break

      default:
        bumpType = 'patch'
        break
    }

    const spacesPattern = /^{\s*[\r\n]+(\s+)/
    const matches = originalContent.match(spacesPattern) || []
    const spaces = matches[1] || ''
    const numSpaces = spaces.length || 2

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
      this.emit('error', new PluginError('gulp-bumper', error, {fileName: file.path}))
    }

    cb()
  })
}

gulpBumper.MAJOR = 'major'

gulpBumper.MINOR = 'minor'

gulpBumper.PATCH = 'patch'

module.exports = gulpBumper
