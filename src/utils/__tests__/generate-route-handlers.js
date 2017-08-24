import SwaggerApi from 'sway'
import generateRouteHandlers from '../generate-route-handlers'
import definition from '../../__tests__/data/petstore.swagger-v2.json'

let handlerObjects
beforeAll(async () => {
  const api = await SwaggerApi.create({ definition })
  handlerObjects = generateRouteHandlers({ api })
})

describe('generate route handlers', () => {
  test('generates handler objects', () => {
    expect(handlerObjects).toHaveLength(14)
    expect(handlerObjects).toMatchSnapshot()
  })

  test('generates valid methods', () => {
    const validMethodRegex = /^(get|post|patch|put|delete|options|head)$/

    handlerObjects.forEach(({ handler }) => {
      Object.keys(handler).forEach((method) => {
        expect(method).toMatch(validMethodRegex)
      })
    })
  })

  test('generates valid paths', () => {
    handlerObjects.forEach(({ path }) => {
      expect(path).not.toMatch(/{(.*?)}/g)
    })
  })

  test('generates valid handlers', () => {
    handlerObjects.forEach(({ handler }) => {
      expect(handler).toBeTruthy()
    })
  })
})
