import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
axios.defaults.headers.common['Accept'] = `application/json`
axios.defaults.headers.common['Content-Type'] = `application/json`
axios.defaults.withCredentials = false
axios.defaults.timeout = 20000

export default axios
