import Mirage from 'mirage-config' // eslint-disable-line
import configurePassthrus from '../configure-passthrus'

const configs = [
  {
    definition: 'http://petstore.swagger.io/v2/swagger.json',
    namespace: 'http://petstore.swagger.io/v2',
  },
]
const server = new Mirage()
const handler = () => null

test('adds openAPI config url passthrough', () => {
  configurePassthrus({ configs, server, handler })
  expect(server.passthroughs).toMatchSnapshot()
})
