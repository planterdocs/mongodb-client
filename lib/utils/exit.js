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
      '\n-------------------------------------' +
        ' Mongodb-Client Experienced an Error' +
        '-------------------------------------\n'
    )

    console.error(error)

    debug('\n')

    throw error
  }
}
