'use strict'

const { debuglog } = require('util')
const debug = debuglog('mongodb-client::delete')

module.exports.deleteFirst = async function (filter, options) {
  debug('delete first ...')

  try {
    const opResult = await this.collection.deleteOne(filter, options)
    this.emit('delete', opResult)
  } catch (error) {
    this.errorHandler.throw(error)
  }
}

module.exports.deleteMany = async function (filter, options) {
  debug('delete many ...')

  try {
    const opResult = await this.collection.deleteMany(filter, options)
    this.emit('delete', opResult)
  } catch (error) {
    this.errorHandler.throw(error)
  }
}
