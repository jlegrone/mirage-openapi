import Response from './response'

function generateRouteHandler(operation) {
  return (
    mirageSchema,
    { url, params = {}, requestHeaders = {}, requestBody = '{}', files = [] },
  ) => {
    const body = JSON.parse(requestBody)
    const contentType = requestHeaders['Content-Type']

    const validationResult = operation.validateRequest({
      body,
      headers: requestHeaders,
      query: params,
      url,
      files,
    })

    if (validationResult.errors.length > 0) {
      return new Response(400, { 'Content-Type': 'application/json' }, validationResult)
    }

    const sortedResponses = operation
      .getResponses()
      .sort((resA, resB) => resA.statusCode - resB.statusCode)

    const response = sortedResponses[0]
    const responseBody = response.getExample(contentType) || response.getSample()

    return new Response(
      Number(response.statusCode),
      { 'Content-Type': 'application/json' },
      responseBody,
    )
  }
}

export default generateRouteHandler
