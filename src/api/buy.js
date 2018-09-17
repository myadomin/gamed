import axios from 'axios'
import URL from './urls.js'

export default {
  getProductsBuySuccess () {
    return axios.get(URL.product_buy_success).then(res => {
      return res.data
    })
  },
  getProductsBuyFail () {
    return axios.get(URL.product_buy_fail).then(res => {
      return res.data
    })
  }
}
