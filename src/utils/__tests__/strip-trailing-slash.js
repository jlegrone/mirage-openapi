import stripTrailingSlash from '../strip-trailing-slash'

test('returns original string when no trailing slash present', () => {
  const testString = '/foo/bar'
  expect(stripTrailingSlash(testString)).toEqual(testString)
})

test('strips trailing slash', () => {
  expect(stripTrailingSlash('/foo/bar/')).toEqual('/foo/bar')
})
