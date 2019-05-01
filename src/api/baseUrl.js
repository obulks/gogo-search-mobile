let baseUrl = ''

switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = 'https://176.122.157.73:5000/api'
    break
  case 'production':
    baseUrl = '/api/gogo'
    break
}

export default baseUrl