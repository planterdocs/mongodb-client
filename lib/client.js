'use strict'

require('dotenv').config()

const { debuglog } = require('util')
const debug = debuglog('mongodb-client::main')

const { MongoClient } = require('mongodb')

const { createCollection } = require('./crud/create')
const { onCreateCollection } = require('./crud/onCreate')

const { connect, onConnected } = require('./utils/connect')

const { EventEmitter } = require('events')

class Client extends EventEmitter {
  constructor (options) {
    super()

    if (!options) options = {}
    this.options = options

    this.dbName = process.env.DB_NAME
    this.db = null

    this.collectionName = ''
    this.collection = null

    const URI = process.env.DB_URI

    if (!URI) {
      throw new Error('DB_URI is empty')
    }

    this._ = new MongoClient(URI, this.options)

    connect.bind(this)

    /* Bind CRUD functions */
    createCollection.bind(this)

    /* Bind CRUD listeners */
    onConnected.bind(this)
    onCreateCollection.bind(this)

    /* Add listeners */
    this.on('create-collection', onCreateCollection)
    this.on('connected', onConnected)

    debug('Mongodb-Client created!')
  }
}

module.exports = Client

Client.prototype.connect = connect

// Create

Client.prototype.createCollection = createCollection

// Read

Client.prototype.getDbName = function () {
  if (this.db == null) return 'null'

  return this.db
}

// Update

// Delete
