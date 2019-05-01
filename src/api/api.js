import axios from 'axios'
import baseUrl from './baseUrl.js'

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