'use strict'

const { gracefulExit } = require('./exit')

const { debuglog } = require('util')
const debug = debuglog('mongodb-client::connect')
const print = console.log

module.exports.onConnected = function (client) {
  print('\n---------------------------\n')
  print(' Mongodb-Client Connected\n')
  print('---------------------------\n')

  this.db = client.db(this.dbName)
  this._ = client
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
