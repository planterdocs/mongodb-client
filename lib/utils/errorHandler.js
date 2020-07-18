'use strict'

class ErrorHandler {
  constructor (logger) {
    this.logger =
      logger ||
      function noop () {
        /* woop! */
      }
    this.errorCache = []
    this.threwInSession = false
  }

  cacheError (error) {
    if (error) this.errorCache.push({ error, timestamp: Date.now() })
  }
}

module.exports = ErrorHandler

ErrorHandler.prototype.throw = function (error) {
  /* cache it for later */
  this.cacheError(error)

  /* log before throwing */
  this.logger(error)

  /* set our field */
  this.threwInSession = true

  /* now we throw for real */
  throw error
}
