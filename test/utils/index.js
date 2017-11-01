'use strict'

const path = require('path')
const pkg = require('../../package')

module.exports = {
  getSRI: require(path.normalize(path.join(__dirname, '../../', pkg.main)))
}
