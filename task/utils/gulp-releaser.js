'use strict'

const path = require('path')
const through = require('through2')
const shell = require('shelljs')
const log = require('fancy-log')
const replaceWith = require('./replace-with')

const PLUGIN_NAME = 'gulp-releaser'

const DEFAULT_REGENERATE_LOCK = true

function getTemplate (object, defaultValue) {
  if (typeof object === 'function') {
    return object()
  }

  if (typeof object === 'string') {
    return object
  }

  return defaultValue
}

/**
 * @typedef {Object} gulpReleaserOptions
 *
 * @property {boolean}         [regenerateLock=true]   -
 * @property {string|Function} [commitMessageTemplate] - "Release {{ version }}"
 * @property {string|Function} [tagMessageTemplate]    - "{{ version }}"
 * @property {boolean}         [pushTags=true]         -
 */

/**
 * @param {gulpReleaserOptions} [options]
 *
 * @returns {DestroyableTransform}
 */
function gulpReleaser (options) {
  options = options || {}

  return through.obj(function (file, enc, cb) {
    const root = path.dirname(file.path)

    shell.cd(root)
    const cwd = shell.pwd().toString()

    log('Change directory to: "' + cwd + '"')

    // check whether the current branch is "master"
    shell.exec('git rev-parse --abbrev-ref HEAD', { silent: true }, function (code, stdout, stderr) {
      if (code && stderr) {
        throw new Error(PLUGIN_NAME + ': ' + stderr)
      }

      const branch = stdout.trim()

      if (branch !== 'master') {
        throw new Error(PLUGIN_NAME + ': The current branch must be master, got: ' + branch)
      }
    })

    log('Current branch is master')

    // regenerate lock file
    const regenerateLock = typeof options.regenerateLock === 'boolean'
      ? options.regenerateLock
      : DEFAULT_REGENERATE_LOCK

    if (regenerateLock) {
      log('Regenerate package-lock.json')

      shell.exec('npm install', { silent: true })

      if (shell.error()) {
        throw new Error(PLUGIN_NAME + ': ' + shell.error())
      }
    }

    // commit and push
    const commitMessageTemplate = getTemplate(options.commitMessageTemplate, 'Release {{ version }}')
    const tagMessageTemplate = getTemplate(options.tagMessageTemplate, '{{ version }}')
    const pushTags = typeof options.pushTags === 'boolean' ? options.pushTags : true

    const pkg = require(file.path)
    const version = pkg.version

    shell.exec('git add .')
    shell.exec('git commit -m \'' + replaceWith(commitMessageTemplate, { version: version }) + '\'')
    shell.exec('git tag ' + replaceWith(tagMessageTemplate, { version: version }))
    shell.exec('git push -u origin master')

    if (pushTags) {
      shell.exec('git push --tags')
    }

    if (shell.error()) {
      throw new Error(PLUGIN_NAME + ': ' + shell.error())
    }

    // publish
    shell.exec('npm publish')

    if (shell.error()) {
      throw new Error(PLUGIN_NAME + ': ' + shell.error())
    }

    cb()
  })
}

module.exports = gulpReleaser
