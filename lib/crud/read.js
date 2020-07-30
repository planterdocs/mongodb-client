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

module.exports.countOf = async function (query, options) {
  debug('getting count of ...')

  if (!this.db) {
    this.errorHandler.throw(
      new Error('cannot get count -- not connected to db!')
    )
  }

  if (!this.collection || !this.collectionName) {
    this.errorHandler.throw(new Error('cannot get count -- no collection set!'))
  }

  if (!query) query = {}
  if (!options) options = {}

  try {
    const numberOfDocs = await this.collection.countDocuments(query, options)
    return numberOfDocs
  } catch (error) {
    this.errorHandler.throw(error)
  }
}

module.exports.findDocs = async function (query) {
  if (!this.db) {
    this.errorHandler.throw(
      new Error('cannot get count -- not connected to db!')
    )
  }

  if (!this.collection || !this.collectionName) {
    this.errorHandler.throw(new Error('cannot get count -- no collection set!'))
  }

  try {
    const docs = await this.collection.find(query).toArray()

    if (!docs) {
      return []
    }

    return docs
  } catch (err) {
    this.errorHandler.throw(err)
  }
}

module.exports.setDb = async function (name) {
  debug('setting current db ...')

  if (!name) {
    this.errorHandler.throw(new Error('cannot set db -- no args!'))
    return
  }

  /* check before create new */
  this.db = this._.db(name)
}

module.exports.getDbName = function () {
  debug('getting db name ...')

  if (this.db == null || !this.db.s) return null
  return this.db.s.namespace.db
}
