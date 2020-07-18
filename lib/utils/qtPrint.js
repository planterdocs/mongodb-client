'use strict'

module.exports.boxy = function (message, logger) {
  logger(
    `\n${'-'.repeat(message.length + 2)}\n ${message}\n${'-'.repeat(
      message.length + 2
    )}`
  )
}
