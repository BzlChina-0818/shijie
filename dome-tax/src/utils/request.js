import axios from 'axios'
import qs from 'qs'
import lodash from 'lodash'
import pathToRegexp from 'path-to-regexp'
import { message as Message } from 'antd'


const fetch = (options) => {
  let {
    method = 'get',
    data,
    url,
    page = false,// 是否为分页查询
    responseType = false,  //响应参数例如blob
    requestType = false,  //请求参数例如form
  } = options
  if(page){
    // 处理分页接口的入参
    let {
          page=1, pageSize=10, condition,
          sort = {
          "direction": "DESC",
          "property": ""
          },
          ...other
        } = data
    data ={
      page:{
        number:Number(page)-1,
        size:pageSize,
      },
      sort,
      condition:condition?condition:other
    }
  }
  const cloneData = lodash.cloneDeep(data)

  if(responseType==='blob'){
    axios.defaults.responseType='blob';
  }

  // const cloneData = lodash.cloneDeep(data)
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: cloneData,
      })
    case 'delete':
      return axios.delete(url, {
        data: cloneData,
      })
    case 'post':
      if(requestType==='form'){
        return axios.post(url, data, {headers:{'Content-Type':'multipart/form-data'}})
      }else{
        return axios.post(url, cloneData)
      }
    case 'put':
      return axios.put(url, cloneData)
    case 'patch':
      return axios.patch(url, cloneData)
    default:
      return axios(options)
  }
}

export default function request (options) {

  return fetch(options).then((response) => {
    // todo 兼容mock和真实api
    const { statusText, status } = response
    let {
      page = false,        // 是否为分页查询
      responseType = false
    } = options
    // console.log(response)
    if(status===200){  // http 200状态
      let data = response.data
      if(responseType){
        return Promise.resolve(data)
      }
      const {message, code} = data
      if (data instanceof Array) {
        data = {
          list: data,
        }
      }
      let respData={}
      if(code&&code===1000||code===1010||code===1020){
        let oldRespData = data.data
        // 处理分页接口的出参
        if(page){
          const oldRespDataPage = oldRespData.page
          Object.assign(oldRespData,{
            pagination: {
                current: Number(oldRespDataPage.number)+1 || 1,
                pageSize: Number(oldRespDataPage.size) || 10,
                total: oldRespDataPage.totalElements,
            },
          })
        }
        respData = {
          success: true,
          message,
          ...data,
        }
      }else{
        // todo 系统或业务错误处理
        respData = {
          success: false,
          message,
          code,
          ...data,
        }
      }
      return Promise.resolve(respData)
    }else{
      Message.error(statusText)
      return Promise.reject()
    }



  }).catch((error) => {
    const { response } = error
    let msg
    let statusCode
    if (response && response instanceof Object) {
      const { data, statusText } = response
      statusCode = response.status
      msg = data.message || statusText
    } else {
      statusCode = 600
      msg = error.message || 'Network Error'
    }

    /* eslint-disable */
    return Promise.reject({ success: false, statusCode, message: msg })
  })
}
