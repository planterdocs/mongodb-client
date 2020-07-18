'use strict'

const { boxy } = require('./qtPrint')

const { debuglog } = require('util')
const debug = debuglog('mongodb-client::exit')

module.exports.exit = function (error, client) {
  debug('attempting graceful exit ...')

  /* force close connection */
  if (client._ && error) {
    client._.close(true)
  }

  client.removeAllListeners()

  if (error) {
    process.exitCode = 777

    boxy('Mongodb-Client exited due to an Error', debug)

    console.error(error)

    debug('\n')

    throw error
  } else if (client.errorHandler.threwInSession) {
    const errCount = client.errorHandler.errorCache.length
    process.exitCode = errCount || 127

    boxy(
      `Mongodb-Client exited, but your session experienced ${errCount} error(s)`,
      debug
    )
  } else {
    boxy('Mongodb-Client exited safely', debug)
  }
}
