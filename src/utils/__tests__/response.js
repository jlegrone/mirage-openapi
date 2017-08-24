import Response from '../response'

test('generates response object with defaults', () => {
  const response = new Response(200, undefined, undefined)
  expect(response).toMatchSnapshot()
  expect(response.toRackResponse()).toMatchSnapshot()
})

test('generates response object with custom headers and body', () => {
  const response = new Response(204, { 'Content-Type': 'test' }, { test: true })
  expect(response).toMatchSnapshot()
  expect(response.toRackResponse()).toMatchSnapshot()
})
