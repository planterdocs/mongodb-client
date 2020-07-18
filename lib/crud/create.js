'use strict'

const { debuglog } = require('util')
const debug = debuglog('mongodb-client::create')

module.exports.createCollection = async function (name, options) {
  if (!this.db) {
    this.errorHandler.throw(
      new Error('cannot create collection -- not connected!')
    )
    return
  }

  debug('creating collection ...')

  try {
    const collection = await this.db.createCollection(name, options)
    this.emit('create-collection', collection)
  } catch (error) {
    this.errorHandler.throw(error)
  }
}

module.exports.insert = async function (docs, options) {
  if (!this.db) {
    this.errorHandler.throw(
      new Error('cannot insert -- no documents to insert!')
    )
  }

  if (!this.collection || !this.collectionName) {
    this.errorHandler.throw(
      new Error('cannot insert -- no documents to insert!')
    )
  }

  if (!docs) {
    this.errorHandler.throw(
      new Error('cannot insert -- no documents to insert!')
    )
  }

  let result

  try {
    let opResult

    if (docs.constructor.name === 'Array' && docs.length > 1) {
      debug('insert docs ...')

      opResult = await this.collection.insertMany(docs, options)
      this.emit('insert', opResult)
    } else if (
      docs.constructor.name === 'Array' &&
      docs.length === 1 &&
      docs[0]
    ) {
      debug('insert doc ...')

      const doc = docs[0]
      opResult = await this.collection.insertOne(doc, options)
      this.emit('insert', opResult)
    } else if (docs.constructor.name === 'Object') {
      debug('insert doc ...')

      opResult = await this.collection.insertOne(docs, options)
      this.emit('insert', opResult)
    }

    result = {
      result: opResult.result,
      ops: opResult.ops,
      insertedCount: opResult.insertedCount,
      idDesignation: opResult.idDesignation
    }

    if (opResult.insertedIds) {
      result.insertedIds = opResult.insertedIds
    }

    if (opResult.insertedId) {
      result.insertedId = opResult.insertedId
    }
  } catch (error) {
    console.error(error)
    return
  }

  return result || 'noop'
}
