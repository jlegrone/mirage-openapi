import MirageOpenAPI from './mirage-openapi'

module.exports = function mirageOpenAPI({ server, configs }) {
  return new MirageOpenAPI({ server, configs })
}
