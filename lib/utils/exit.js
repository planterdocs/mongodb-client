'use strict'

const { debuglog } = require('util')
const debug = debuglog('mongodb-client::exit')
const print = console.log

module.exports.gracefulExit = function (error, client) {
  debug('exiting ... gracefully! :)')

  process.exitCode = 777

  if (client._) {
    /* log user out */
    client._.logout()

    /* close connection */
    client._.close()
  }

  client.removeAllListeners()

  print('\n-------------------------------------')
  print(' Mongodb-Client Experienced an Error')
  print('-------------------------------------\n')

  console.error(error)

  print('\n')

  process.exit()
}
