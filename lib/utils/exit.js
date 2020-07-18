'use strict'

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

    debug(
      '\n----------------------------------------\n' +
        ' Mongodb-Client exited due to an Error\n' +
        '----------------------------------------'
    )

    console.error(error)

    debug('\n')

    throw error
  } else if (client.errorHandler.threwInSession) {
    const errCount = client.errorHandler.errorCache.length
    process.exitCode = errCount || 127

    debug(
      `\n---------------------------------------------------------------${'-'.repeat(
        errCount
      )}\n` +
        ` Mongodb-Client exited, but your session experienced ${errCount} error(s)\n` +
        `---------------------------------------------------------------${'-'.repeat(
          errCount
        )}`
    )
  } else {
    process.exitCode = 0

    debug(
      '\n------------------------------\n' +
        ' Mongodb-Client exited safely\n' +
        '------------------------------'
    )
  }
}
