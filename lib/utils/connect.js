'use strict'

const { exit } = require('./exit')

const { debuglog } = require('util')
const debug = debuglog('mongodb-client::connect')

module.exports.onConnected = function (client) {
  if (this.dbName) {
    this.db = client.db(this.dbName)
  }

  this._ = client

  debug(
    '\n---------------------------\n' +
      ' Mongodb-Client Connected\n' +
      '---------------------------'
  )

  if (this.collectionName) {
    this.setCollection(this.collectionName)
  }
}

module.exports.connect = async function () {
  debug('connecting ...')

  try {
    const client = await this._.connect()
    this.emit('connected', client)
  } catch (error) {
    exit(error, this)
  }
}
