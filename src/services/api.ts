// import axios from 'axios'
import axios from 'axios'

const API_KEY = process.env.REACT_APP_API_KEY

const api = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/place',
  params: {
    key: `${API_KEY}`
  }
})

export default api
