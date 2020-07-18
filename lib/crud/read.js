'use strict'

const { debuglog } = require('util')
const debug = debuglog('mongodb-client::read')

module.exports.setCollection = async function (name) {
  debug('setting current collection ...')

  if (!this.db) {
    this.errorHandler.throw(
      new Error('cannot set collection -- not connected!')
    )
    return
  }

  try {
    const collection = await this.db.collection(name)
    this.emit('set-collection', collection)
  } catch (error) {
    this.errorHandler.throw(error)
  }
}

module.exports.setDb = async function (name) {
  debug('setting current db ...')
}

module.exports.getDbName = function () {
  debug('getting db name ...')

  if (this.db == null || !this.db.s) return null
  return this.db.s.namespace.db
}
