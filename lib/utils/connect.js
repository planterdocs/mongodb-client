'use strict'

const { gracefulExit } = require('./exit')

const { debuglog } = require('util')
const debug = debuglog('mongodb-client::connect')

module.exports.onConnected = function (client) {
  this.db = client.db(this.dbName)
  this._ = client

  debug(
    `\n-------------------------------${'-'.repeat(this.dbName.length)}\n` +
      ` Mongodb-Client Connected to: ${this.dbName}\n` +
      `-------------------------------${'-'.repeat(this.dbName.length)}\n`
  )
}

module.exports.connect = async function () {
  debug('connecting ...')

  try {
    const client = await this._.connect()
    this.emit('connected', client)
  } catch (error) {
    gracefulExit(error, this)
  }
}
