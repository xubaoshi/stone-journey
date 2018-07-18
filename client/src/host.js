let baseUrl = '/'

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://127.0.0.1:7001'
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'https://xubaoshi.top'
}
export {
  baseUrl
}
