import Mirage from 'mirage-config' // eslint-disable-line
import mirageOpenAPI from '../index'
import definition from './data/petstore.swagger-v2.json'

let server
let instance
let routers

const fakeRequest = ({
  method = 'GET',
  requestHeaders = { 'Content-Type': 'application/json' },
  url = 'http://petstore.swagger.io/v2/',
}) => ({
  method,
  requestHeaders,
  url,
})

beforeAll(async () => {
  const configs = [
    { definition, namespace: 'http://petstore.swagger.io/v2' },
    { definition, namespace: '/' },
  ]
  server = new Mirage()
  instance = mirageOpenAPI({ configs, server })
  routers = await instance.resolveRouters()
})

describe('mirage openAPI instance', () => {
  test('generates router', () => {
    expect(routers).toHaveLength(2)
    expect(routers[0].namespace).toEqual('http://petstore.swagger.io/v2')
  })

  test('matches existing route', () => {
    const [{ router }] = routers
    const matches = router.recognize('/pet')
    expect(matches).toMatchSnapshot()
  })

  test('matches existing dynamic route', () => {
    const [{ router }] = routers
    const matches = router.recognize('/pet/0')
    expect(matches).toMatchSnapshot()
  })

  test('does not match missing route', () => {
    const [{ router }] = routers
    const matches = router.recognize('/foo')
    expect(matches).toEqual(undefined)
  })

  test('throws error for missing namespace', () => {
    const response = instance.handler({}, fakeRequest({ url: 'http://example.com' }))
    return expect(response).rejects.toMatchSnapshot()
  })

  test('throws error for missing route', () => {
    const response = instance.handler({}, fakeRequest({ url: 'http://petstore.swagger.io/v2/foo' }))
    return expect(response).rejects.toMatchSnapshot()
  })

  test('throws error for missing route method', () => {
    const response = instance.handler({}, fakeRequest({ url: 'http://petstore.swagger.io/v2/pet' }))
    return expect(response).rejects.toMatchSnapshot()
  })

  test('responds with example data', async () => {
    const response = await instance.handler(
      {},
      fakeRequest({ url: 'http://petstore.swagger.io/v2/store/inventory' }),
    )

    expect(response.headers['Content-Type']).toBe('application/json')
    expect(response.code).toBe(200)
    expect(response.data).toMatchSnapshot()
  })

  test('responds with sample data', async () => {
    const response = await instance.handler(
      {},
      fakeRequest({ url: 'http://petstore.swagger.io/v2/pet/1' }),
    )

    expect(response.headers['Content-Type']).toBe('application/json')
    expect(response.code).toBe(200)
    expect(response).toHaveProperty('data')
    expect(response.data).toHaveProperty('name')
  })

  test('validates bad requests', async () => {
    const response = await instance.handler(
      {},
      fakeRequest({ url: 'http://petstore.swagger.io/v2/pet', method: 'POST' }),
    )

    expect(response.headers['Content-Type']).toBe('application/json')
    expect(response.code).toBe(400)
    expect(response.data).toMatchSnapshot()
  })
})
