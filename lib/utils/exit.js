'use strict'

const { debuglog } = require('util')
const debug = debuglog('mongodb-client::exit')

module.exports.gracefulExit = function (error, client) {
  debug('attempting graceful exit ...')

  if (client._) {
    /* log user out */
    client._.logout()

    /* close connection */
    client._.close()
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
  }

  process.exit()
}
