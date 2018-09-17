import axios from 'axios'
import URL from './urls.js'

export default {
  getProducts () {
    return axios.get(URL.product_all).then(res => {
      return res.data
    })
  },
  clearProducts () {
    return axios.get(URL.product_clear).then(res => {
      return res.data
    })
  }
}
