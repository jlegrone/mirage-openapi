import parseConfigs from './utils/parse-configs'
import configurePassthrus from './utils/configure-passthrus'
import handlerForRequest from './utils/handler-for-request'

export default class MirageOpenAPI {
  constructor({ configs, server }) {
    this.server = server
    this.configs = configs
    this._routers = undefined

    this.initialize()
  }

  initialize() {
    const { configs, server, handler } = this
    configurePassthrus({ configs, server, handler: handler.bind(this) })
  }

  async handler(_, request) {
    const routers = await this.resolveRouters()
    const handler = handlerForRequest({ request, routers })

    return handler(_, request)
  }

  async resolveRouters() {
    if (!this._routers) {
      const { configs } = this
      this._routers = parseConfigs({ configs })
    }

    return this._routers
  }
}
