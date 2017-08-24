function matchingRouter(url) {
  return ({ namespace }) => url.startsWith(namespace)
}

export default function ({ request, routers }) {
  const raiseError = (
    message = 'There is no handler available in your openAPI config for this route and HTTP method.',
  ) => {
    throw new Error(
      `MirageOpenAPI: There is no route defined which matches ${request.url}.\n${message}`,
    )
  }
  const routerConfig = routers.find(matchingRouter(request.url))

  if (!routerConfig) {
    raiseError('This url does not match any existing namespaces.')
  }

  const { router, namespace } = routerConfig
  const routeConfigs = router.recognize(request.url.replace(namespace, ''))

  if (!routeConfigs) {
    raiseError()
  }

  const [{ handler }] = Object.values(routeConfigs).filter(routeConfig => !!routeConfig.handler)

  return handler[request.method.toLowerCase()]
}
