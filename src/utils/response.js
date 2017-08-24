export default class Response {
  constructor(code, headers = {}, data = {}) {
    this.code = code
    this.headers = headers
    this.data = data
  }

  toRackResponse() {
    const { headers } = this
    if (headers['Content-Type'] === undefined) {
      headers['Content-Type'] = 'application/json'
    }

    return [this.code, this.headers, this.data]
  }
}
