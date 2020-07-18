'use strict'

const { exit } = require('./exit')

const { debuglog } = require('util')
const debug = debuglog('mongodb-client::connect')

module.exports.onClose = function (opResult) {
  debug('on close ...')

  exit(null, this)
}

module.exports.close = async function () {
  debug('closing connection ... ')

  try {
    const opResult = await this._.close()
    this.emit('close', opResult)
  } catch (error) {
    exit(error, this)
  }

  return this.errorHandler.errorCache.length > 0
    ? this.errorHandler.errorCache
    : 'closed-ok'
}
