import axios from 'axios'
import {CryptoCurrency} from '../interfaces/cryptocurrency.interface'

const instance = axios.create({
  baseURL: 'https://api.coincap.io/v2/assets',
})

export const api = {
  getCryptocurrencyData: () => {
    return instance
      .get<{
        data: CryptoCurrency[]
      }>('')
      .then(response => {
        return response.data.data
      })
  },
}
