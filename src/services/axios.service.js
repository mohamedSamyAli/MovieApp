


import  axios from "axios"
import { baseURL , apiKey  } from '../BackendConstantes';
//const axios = require('axios')
const instance = axios.create(); 

instance.defaults.baseURL = baseURL
instance.defaults.params = {}
instance.defaults.params["api_key"]  = apiKey // add api_key to all requests query params


// instance.interceptors.request.use(function (config) {
// store.dispatch({type:"addReq"})
// return config;
//   }, function (error) {
//     return Promise.reject(error);
//   });

//handel all response with error status
// instance.interceptors.response.use((response)=> {
//     return response;

//   }, function (error) {

//     return Promise.reject(error);
//   })

export default instance