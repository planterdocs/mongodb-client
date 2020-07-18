'use strict'

const { debuglog } = require('util')
const debug = debuglog('mongodb-client::on-delete')

module.exports.onDelete = function (opResult) {
  debug('delete successful!')

  debug(opResult)
}
