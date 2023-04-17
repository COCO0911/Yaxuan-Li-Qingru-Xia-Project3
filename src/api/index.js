import axios from 'axios'
const http = axios.create({
  // baseURL: 'http://localhost:3408',
  baseURL: 'https://server-5k5n.onrender.com',
  // baseURL: '/api',
  // baseURL: '/',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    // 'Access-Control-Allow-Origin': '*',

    'authorization': (localStorage.getItem('token') == null ? '' : localStorage.getItem('token'))
    // 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
  },
  data: {},
  timeout: 5000,
  responseType: 'json',
  // withCredentials: true,//check if need cookies
})

http.interceptors.request.use((config) => {
  let localtoken = localStorage.getItem('token');
  if (config.headers.authorization != localtoken) {
    /* if token not same, request new token */
    config.headers.authorization = localtoken;
  }
  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

http.interceptors.response.use((response) => {
  // console.log(response);
  // if (response.data || response.data.code == '0') {
  return response.data
  // console.log(response.data.code)
  // if (response.data.code == '000') {

  // } else {
  //   return Promise.reject(response.data)
  // }
}, (error) => {
  // Do something with response error
  if (error.response) {
    switch (error.response.status) {
      case 400:
        error.message = 'Unauthorized'
        break

      case 401:
        error.message = 'Unauthorized, please log in'
        break

      case 403:
        error.message = 'Forbidden'
        break

      case 404:
        error.message = `Not found: ${error.response.config.url}`
        break

      case 408:
        error.message = 'Request Timed-out'
        break

      case 500:
        error.message = 'Internal Server Error'
        break

      case 501:
        error.message = 'Not Implemented'
        break

      case 502:
        error.message = 'Bad Gateway'
        break

      case 503:
        error.message = 'Service Unavailable'
        break

      case 504:
        error.message = 'Gateway Time-out'
        break

      case 505:
        error.message = 'HTTP Version not supported'
        break
      default:
        error.message = `connect err(${error.response.status})!`
    }
  } else {
    error.message = 'network error,failed to connect to the server!'
  }
  return Promise.reject(error)
})

export default http