'use strict'

const { debuglog } = require('util')
const debug = debuglog('mongodb-client::on-create')
const print = console.log

module.exports.onCreateCollection = function (collection) {
  debug('')
  this.collection = collection

  print(`created collection ${collection.s.namespace.collection}`)
}
