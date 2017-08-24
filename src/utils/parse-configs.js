import generateRouter from './generate-router'

export default async function parseConfigs({ configs }) {
  const routers = await Promise.all(configs.map(generateRouter))

  // Return array of routers sorted by longest to shortest namespace
  return routers.sort((r1, r2) => r2.namespace.length - r1.namespace.length)
}
