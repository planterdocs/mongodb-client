'use strict'

const { debuglog } = require('util')
const debug = debuglog('mongodb-client::on-read')

module.exports.onSetCollection = function (collection) {
  this.collection = collection
  this.collectionName = collection.s.namespace.collection

  debug(`collection set to ${this.collectionName}`)
}
