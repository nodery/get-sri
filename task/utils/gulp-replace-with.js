'use strict'

const path = require('path')

const through = require('through2')
const PluginError = require('plugin-error')
const isBinary = require('file-is-binary')
const replaceWithFn = require('./replace-with')

const PLUGIN_NAME = 'gulp-replace-with'

function gulpReplaceWith (searchFor, replaceWith, replaceAll) {
  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      cb(null, file)
      return
    }

    if (file.isStream()) {
      cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'))
      return
    }

    if (isBinary(file)) {
      const fileName = path.basename(file.path)

      cb(new PluginError(PLUGIN_NAME, 'File "' + fileName + '" on "' + file.path + '" must be a text file'))
      return
    }

    try {
      let content = file.contents.toString()

      content = typeof searchFor === 'function'
        ? searchFor(content)
        : replaceWithFn(content, searchFor, replaceWith, replaceAll)

      file.contents = Buffer.from(content)
      this.push(file)
    } catch (error) {
      this.emit('error', new PluginError(PLUGIN_NAME, error, {fileName: file.path}))
    }

    cb()
  })
}

module.exports = gulpReplaceWith
