const { debuglog } = require('util')
const debug = debuglog('mongodb-client::on-create')
const print = console.log

module.exports.onSetCollection = function (collection) {
  debug('collection set ...')

  this.collection = collection
  this.collectionName = collection.s.namespace.collection

  print(`collection set to ${this.collectionName}`)
}
