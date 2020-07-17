'use strict'

const { gracefulExit } = require('./exit')

const { debuglog } = require('util')
const debug = debuglog('mongodb-client::connect')

module.exports.onClose = function (client) {
  debug('on close ...')

  gracefulExit(null, this)
}

module.exports.close = async function () {
  debug('closing connection ... ')

  try {
    const opResult = this._.close()
    this.emit('close', opResult)
  } catch (error) {
    gracefulExit(error, this)
  }
}
