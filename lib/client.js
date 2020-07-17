'use strict'

require('dotenv').config()

const { debuglog } = require('util')
const debug = debuglog('mongodb-client::main')

const { MongoClient } = require('mongodb')

const { createCollection, insert } = require('./crud/create')
const { onCreateCollection, onInsert } = require('./listeners/onCreate')

const { setCollection } = require('./crud/read')
const { onSetCollection } = require('./listeners/onRead')

const { connect, onConnected } = require('./utils/connect')
const { close, onClose } = require('./utils/close')

const { EventEmitter } = require('events')

class Client extends EventEmitter {
  constructor (options) {
    super()

    const defaultOptions = {
      useUnifiedTopology: true
    }

    this.options = Object.assign(defaultOptions, options)

    this.dbName = process.env.DB_NAME
    this.db = null

    this.collectionName = ''
    this.collection = null

    const URI = process.env.DB_URI

    if (!URI) {
      throw new Error('DB_URI is empty')
    }

    this._ = new MongoClient(URI, this.options)

    /* connection */
    connect.bind(this)
    onConnected.bind(this)
    this.on('connected', onConnected)

    /* close */
    close.bind(this)
    onClose.bind(this)
    this.on('close', onClose)

    /* Bind CRUD functions */
    createCollection.bind(this)
    insert.bind(this)

    setCollection.bind(this)

    /* Bind CRUD listeners */
    onCreateCollection.bind(this)
    onInsert.bind(this)

    onSetCollection.bind(this)

    /* Add listeners */
    this.on('create-collection', onCreateCollection)
    this.on('insert', onInsert)
    this.on('set-collection', onSetCollection)

    debug('Mongodb-Client created!')
  }
}

module.exports = Client

Client.prototype.connect = connect

Client.prototype.close = close

// Create

Client.prototype.createCollection = createCollection

Client.prototype.insert = insert

// Read

Client.prototype.getDbName = function () {
  if (this.db == null || !this.db.s) return 'null'

  return this.db.s.namespace.db
}

Client.prototype.setCollection = setCollection

// Update

// Delete
