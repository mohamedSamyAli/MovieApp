


import axios from "axios"
import { baseURL, apiKey } from '../BackendConstantes';
//const axios = require('axios')
const instance = axios.create();

instance.defaults.baseURL = baseURL
instance.defaults.params = {}
instance.defaults.params["api_key"] = apiKey // add api_key to all requests query params


instance.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    console.log(error)

    if (!expectedError) {
        //alert('UNEXPEXTED_ERROR');
    }
    else if (error.message== "cancellation") {

    }
    else {
        alert(error?.response?.data); 
    }
    return Promise.reject(error);
});

export default instance