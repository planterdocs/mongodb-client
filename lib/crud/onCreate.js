'use strict'

const { debuglog } = require('util')
const debug = debuglog('mongodb-client::on-create')
const print = console.log

module.exports.onConnected = function (client) {
  debug('on connected')

  print('\n---------------------------')
  print(' Mongodb-Client Connected')
  print('---------------------------\n')

  this.db = client.db(this.dbName)
}

module.exports.onCreateCollection = function (collection) {
  this.collection = collection

  console.log(`created collection ${collection.s.namespace.collection}`)
}
