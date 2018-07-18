/* eslint-disable */
import {baseUrl} from '../host'
import qs from 'qs'
var Fly = require('flyio/dist/npm/wx')
var fly = new Fly

fly.interceptors.request.use((request) => {
  let sessionid = wx.getStorageSync('sessionid')
  // 给所有请求添加自定义header
  request.headers['X-Tag'] = 'flyio'
  request.headers['sessionid'] = sessionid
  // 打印出请求体
  // console.log(request.body)
  // 终止请求
  // var err=new Error("xxx")
  // err.request=request
  // return Promise.reject(new Error(""))

  // 可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  return request
})

fly.interceptors.response.use(
  (response) => {
    // 只将请求结果的data字段返回
    return response.data
  },
  (err) => {
    // 发生网络错误后会走到这里
    // return Promise.resolve("ssss")
  }
)

// 通用的post请求
export const baseFetcher = (params) => {
  return fly.get(`${baseUrl}${params.url}`, qs.stringify(params.data))
}
