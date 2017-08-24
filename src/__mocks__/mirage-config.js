// This file exports a mock mirage server.
// There is currently no support for dynamic routes!

import httpVerbs from '../utils/http-verbs'

export default class MirageConfig {
  constructor() {
    this.handlers = {}
    this.pretender = {}
    this._passthroughs = new Set()

    httpVerbs.forEach((verb) => {
      this[verb] = (...args) => this.mirage(verb, ...args)
    })
  }

  passthrough(route) {
    this._passthroughs.add(route)
  }

  get passthroughs() {
    return this._passthroughs.values()
  }

  mirage(verb, url, handler, mirageMockOptions = {}) {
    this.handlers[verb] = this.handlers[verb] || {}
    if (handler) {
      this.handlers[verb][url] = handler
      return undefined
    }
    return this.handlers[verb][url]({}, mirageMockOptions)
  }
}
