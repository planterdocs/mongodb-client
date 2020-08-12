'use strict'

require('dotenv').config()

const { debuglog } = require('util')
const debug = debuglog('mongodb-client::main')

const { MongoClient } = require('mongodb')

const { createCollection, insert } = require('./crud/create')
const { onCreateCollection, onInsert } = require('./listeners/onCreate')

const { setCollection, getDbName, setDb, countOf, findDocs } = require('./crud/read')
const { onSetCollection } = require('./listeners/onRead')

const { updateFirst, updateMany } = require('./crud/update')
const { onUpdate } = require('./listeners/onUpdate')

const { deleteFirst, deleteMany } = require('./crud/delete')
const { onDelete } = require('./listeners/onDelete')

const { connect, onConnected } = require('./utils/connect')
const { close, onClose } = require('./utils/close')

const ErrorHandler = require('./utils/errorHandler')

const { EventEmitter } = require('events')

class Client extends EventEmitter {
  constructor (options) {
    super()

    const defaultOptions = {
      useUnifiedTopology: true
    }

    const URI = process.env.DB_URI || options.DB_URI

    if (!URI) {
      throw new Error('DB_URI is empty')
    }

    delete options.DB_URI

    this.dbName = process.env.DB_NAME || options.DB_NAME || ''
    this.db = null

    this.collectionName = options.collectionName || ''
    this.collection = null

    this.options = Object.assign(defaultOptions, options)

    const logger = options.logger || debug
    this.errorHandler = new ErrorHandler(logger, { cacheErrors: true })

    this._ = new MongoClient(URI, this.options)

    this.on('connected', onConnected)
    this.on('close', onClose)

    /* Add listeners */
    this.on('create-collection', onCreateCollection)
    this.on('insert', onInsert)
    this.on('set-collection', onSetCollection)
    this.on('update', onUpdate)
    this.on('delete', onDelete)

    this._collection = {
      name: '',
      set: setCollection.bind(this)
    }

    debug('Mongodb-Client created!')
  }
}

module.exports = Client

/* Client Ops */

Client.prototype.connect = connect

Client.prototype.close = close

/* Create */

Client.prototype.createCollection = createCollection

Client.prototype.insert = insert

/* Read */

Client.prototype.getDbName = getDbName

Client.prototype.setDb = setDb

Client.prototype.setCollection = setCollection

Client.prototype.set = setCollection

Client.prototype.countOf = countOf

Client.prototype.findDocs = findDocs

/* Update */

Client.prototype.updateFirst = updateFirst

Client.prototype.updateMany = updateMany

/* Delete */

Client.prototype.deleteFirst = deleteFirst

Client.prototype.deleteMany = deleteMany
