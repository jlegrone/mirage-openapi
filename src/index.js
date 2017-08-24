import MirageOpenAPI from './mirage-openapi'

export default function initialize({ server, configs }) {
  return new MirageOpenAPI({ server, configs })
}
