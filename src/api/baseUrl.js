let baseUrl = ''

switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = 'https://176.122.157.231:5000/api'
    break
  case 'production':
    baseUrl = '/api/gogo'
    break
}

export default baseUrl
