import axios from 'axios'

const getSearchResult = function (params) {
  let url = 'https://176.122.157.73:5000/api/search'
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