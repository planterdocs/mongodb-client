'use strict'

const { debuglog } = require('util')
const debug = debuglog('mongodb-client::update')

module.exports.updateFirst = async function (filter, update, options) {
  debug('update first ...')

  if (!this.collection || this.collection.name) {
    this.errorHandler.throw(
      new Error('cannot update first -- collection not set')
    )
    return
  }

  try {
    const opResult = await this.collection.updateOne(filter, update, options)
    this.emit('update', opResult)
  } catch (error) {
    this.errorHandler.throw(error)
  }
}

module.exports.updateMany = async function (filter, update, options) {
  debug('update first ...')

  if (!this.collection || this.collection.name) {
    this.errorHandler.throw(
      new Error('cannot update first -- collection not set')
    )
    return
  }

  try {
    const opResult = await this.collection.updateMany(filter, update, options)
    this.emit('update', opResult)
  } catch (error) {
    this.errorHandler.throw(error)
  }
}
