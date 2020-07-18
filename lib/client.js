'use strict'

require('dotenv').config()

const { debuglog } = require('util')
const debug = debuglog('mongodb-client::main')

const { MongoClient } = require('mongodb')

const { createCollection, insert } = require('./crud/create')
const { onCreateCollection, onInsert } = require('./listeners/onCreate')

const { setCollection, getDbName } = require('./crud/read')
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

    const URI = process.env.DB_URI || options.DB_URI

    if (!URI) {
      throw new Error('DB_URI is empty')
    }

    this.dbName = process.env.DB_NAME || options.DB_NAME
    this.db = null

    this.collectionName = options.collectionName
    this.collection = null

    const defaultOptions = {
      useUnifiedTopology: true
    }

    this.options = Object.assign(defaultOptions, options)

    const logger = options.logger || debuglog('mongodb-client::error-logger')
    this.errorHandler = new ErrorHandler(logger)

    this._ = new MongoClient(URI, this.options)

    /* connection ops */
    connect.bind(this)
    onConnected.bind(this)
    this.on('connected', onConnected)

    /* close ops */
    close.bind(this)
    onClose.bind(this)
    this.on('close', onClose)

    /* Bind CRUD functions */
    createCollection.bind(this)
    insert.bind(this)

    setCollection.bind(this)
    getDbName.bind(this)

    updateFirst.bind(this)
    updateMany.bind(this)

    deleteFirst.bind(this)
    deleteMany.bind(this)

    /* Bind CRUD listeners */
    onCreateCollection.bind(this)
    onInsert.bind(this)

    onSetCollection.bind(this)

    onUpdate.bind(this)

    onDelete.bind(this)

    /* Add listeners */
    this.on('create-collection', onCreateCollection)
    this.on('insert', onInsert)
    this.on('set-collection', onSetCollection)
    this.on('update', onUpdate)
    this.on('delete', onDelete)

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

Client.prototype.setCollection = setCollection

/* Update */

Client.prototype.updateFirst = updateFirst

Client.prototype.updateMany = updateMany

/* Delete */

Client.prototype.deleteFirst = deleteFirst

Client.prototype.deleteMany = deleteMany
