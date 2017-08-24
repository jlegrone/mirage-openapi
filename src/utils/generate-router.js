import SwaggerApi from 'sway'
import RouteRecognizer from 'route-recognizer'
import generateRouteHandlers from './generate-route-handlers'

export default async function generateRouter({ definition, namespace }) {
  const api = await SwaggerApi.create({ definition })
  const handlers = generateRouteHandlers({ api })
  const router = new RouteRecognizer()

  handlers.forEach(({ path, handler }) => {
    router.add([{ path, handler }])
  })

  return { namespace, router }
}
