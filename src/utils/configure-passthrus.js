import httpVerbs from './http-verbs'
import stripTrailingSlash from './strip-trailing-slash'

export default function configurePassthrus({ configs, server, handler }) {
  configs.forEach(({ definition }) => {
    if (typeof definition === 'string') {
      server.passthrough(definition)
    }
  })

  httpVerbs.forEach((method) => {
    configs.forEach(({ namespace }) => {
      server[method](`${stripTrailingSlash(namespace)}/*catchall`, handler)
    })
  })
}
