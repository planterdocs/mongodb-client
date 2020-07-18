'use strict'

const { debuglog } = require('util')
const debug = debuglog('mongodb-client::update')

module.exports.updateFirst = async function (filter, update, options) {
  debug('update first ...')

  if (!this.collection || this.collection.name) {
    console.error('cannot update first -- collection not set')
    return
  }

  try {
    const opResult = await this.collection.updateOne(filter, update, options)
    this.emit('update', opResult)
  } catch (error) {
    console.error(error)
  }
}

module.exports.updateMany = async function (filter, update, options) {
  debug('update first ...')

  if (!this.collection || this.collection.name) {
    console.error('cannot update first -- collection not set')
    return
  }

  try {
    const opResult = await this.collection.updateMany(filter, update, options)
    this.emit('update', opResult)
  } catch (error) {
    console.error(error)
  }
}
