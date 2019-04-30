import axios from 'axios'

let baseUrl = 'https://176.122.157.73:5000/api'

const getSearchResult = function (params) {
  let url = baseUrl + '/search'
  return axios.get(url, {
    params: {
      q: params.searchText,
      p: params.page
    }
  })
}

export {
  getSearchResult
}