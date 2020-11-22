import axios from 'axios';
import { notification, message } from 'antd'
import {Toast} from "antd-mobile"
import { getCookie } from "../utils/myCookie"
import NProgress from 'nprogress';

const instance = axios.create({
  timeout: 1000,
  // baseURL: 'http://120.53.2.185'
  // baseURL: process.env.NODE_ENV === 'production' ? 'https://exam.jasonandjay.com/' : 'http://120.53.2.185'
  baseURL: 'http://120.53.2.185'

})

instance.interceptors.request.use((request: any) => {
  NProgress.start()
  // request.headers['authorization'] = window.sessionStorage.getItem('token') ? window.sessionStorage.getItem('token') : '';
   request.headers['authorization'] = getCookie('token') ? getCookie('token') : '';
  return request;
}, error => {
  return Promise.reject(error)
})
instance.interceptors.response.use((response: any) => {
  if(response.data.status === 500){
    Toast.info(response.data.msg)
    // return response.data = {
    //   ...response.data,
    //   status:500,
    //   msg:'失败了'
    // }
  }
  NProgress.done();
  // if (response.data.code === 1) {
  //   return response;
  // } else if (response.data.code === 0) {
  //   Toast.info (response.data.msg)  
  //   return Promise.resolve({ data: { code: undefined } })
  // } else {
  //   Toast.info (response.data.msg)  
  //   return Promise.resolve({ data: { code: undefined } })
  // }
  return response.data
}, error => {

  if (error) {
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      message.warn('请检查网络再重新连接')
      return Promise.resolve({ data: { code: undefined } })
    } else if (error.response) {
      const code: number | undefined = error.response.status;
      switch (code) {
        case 401:
          // window.location.replace('#/Login');
          return Promise.reject('401 权限不够');
        case 404:
          // window.location.pathname = '#/NoFound';
          return Promise.reject('404 找不到页面');
        case 500:
          // window.location.pathname = `${encodeURI('#')}/NoServer`;
          return Promise.reject('500 服务器崩溃了');
        default:
          // window.location.pathname = '/NoServer';
          return Promise.reject('其他错误');
      }
    } else {
      // notification.warn({
      //   message: error.toString(),
      // })
      message.warn('您的操作过于频繁')
      return Promise.resolve({ data: { code: undefined } });
    }

  } else {
  }

})

export default instance
