'use strict'

const { exit } = require('./exit')
const { boxy } = require('./qtPrint')

const { debuglog } = require('util')
const debug = debuglog('mongodb-client::connect')

module.exports.onConnected = function (client) {
  if (this.dbName) {
    this.db = client.db(this.dbName)
  }

  this._ = client

  boxy('Mongodb-Client Connected', debug)

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
