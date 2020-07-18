'use strict'

const { debuglog } = require('util')
const debug = debuglog('mongodb-client::on-create')

module.exports.onCreateCollection = function (collection) {
  debug('collection created!')

  this.collection = collection
  this.collectionName = collection.s.namespace.collection

  debug(`created collection ${this.collectionName}`)
}

module.exports.onInsert = function (opResult) {
  debug('insert successful!')

  debug(opResult)
}
