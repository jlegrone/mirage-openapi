/* eslint-disable no-param-reassign */

import generateRouteHandler from './generate-route-handler'

function accumulateHandlers(handlers, operation) {
  const path = operation.pathObject.path.replace(/{(.*?)}/g, ':$1')

  if (!handlers[path]) {
    handlers[path] = {}
  }
  handlers[path][operation.method] = generateRouteHandler(operation)

  return handlers
}

export default function generateRouteHandlers({ api }) {
  const handlers = api.getOperations().reduce(accumulateHandlers, {})

  return Object.entries(handlers).map(([path, handler]) => ({ path, handler }))
}
