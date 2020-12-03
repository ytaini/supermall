import Axios from 'axios'

export function request(config) {
  
  const instance = Axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  instance.interceptors.request.use(config => {
    return config
  },err => {
    console.log('err :>> ', err);
  })

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log('err :>> ', err);
  })

  return instance(config) 
  
} 
