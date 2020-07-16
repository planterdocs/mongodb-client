'use strict'

const { debuglog } = require('util')
const debug = debuglog('mongodb-client::create')

module.exports.createPlant = async function () {
  console.log('noop')
}

module.exports.createUser = async function () {
  console.log('noop')
}

module.exports.createGeo = async function () {
  console.log('noop')
}

module.exports.createCollection = async function (name, options) {
  if (!this.db) {
    console.error('cannot create collection -- not connected!')
    return
  }

  debug('creating collection ...')

  try {
    const collection = await this.db.createCollection(name, options)
    this.emit('create-collection', collection)
  } catch (error) {
    console.error(error)
  }
}
