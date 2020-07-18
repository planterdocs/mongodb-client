'use strict'

const { debuglog } = require('util')
const debug = debuglog('mongodb-client::on-update')

module.exports.onUpdate = function (opResult) {
  debug('update successful!')
}
