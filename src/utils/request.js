import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: 'http://127.0.0.1:8080', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// Add a request interceptor
service.interceptors.request.use(function(config) {
  // Do something before request is sent
  return config
}, function(error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
service.interceptors.response.use(function(response) {
  // Do something with response data
  return response
}, function(error) {
  return Promise.reject(error)
})
