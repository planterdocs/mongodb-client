'use strict'

const { debuglog } = require('util')
const debug = debuglog('mongodb-client::read')

module.exports.setCollection = async function (name) {
  debug('setting current collection ...')

  if (!this.db) {
    console.error('cannot set collection -- not connected!')
    return
  }

  try {
    const collection = await this.db.collection(name)
    this.emit('set-collection', collection)
  } catch (error) {
    console.error(error)
  }
}
