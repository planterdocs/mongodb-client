'use strict'

const { debuglog } = require('util')
const debug = debuglog('mongodb-client::on-create')
const print = console.log

module.exports.onCreateCollection = function (collection) {
  debug('collection created!')

  this.collection = collection
  this.collectionName = collection.s.namespace.collection

  print(`created collection ${this.collectionName}`)
}

module.exports.onInsert = function (opResult) {
  debug('insert successful!')

  debug(opResult)
}
