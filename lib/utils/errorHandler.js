'use strict'

class ErrorHandler {
  constructor (logger, options) {
    if (!options) options = {}

    this.logger = logger || noop

    this.cacheErrors = options.cacheErrors || true
    this.errorCache = []
    this.threwInSession = false
  }

  cacheError (error) {
    if (error && this.cacheErrors) {
      /* attach timestamp */
      error.timestamp = Date.now()

      this.threwInSession = true

      /* add to cache */
      this.errorCache.push(error)
    }
  }
}

module.exports = ErrorHandler

ErrorHandler.prototype.throw = function (error) {
  /* cache it for later */
  this.cacheError(error)

  /* log before throwing */
  this.logger(error)

  /* now we throw for real */
  throw error
}

function noop () {
  /* woop! */
}
