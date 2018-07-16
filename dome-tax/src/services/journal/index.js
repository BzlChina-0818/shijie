import { request, config } from 'utils'

const { customerFormAPI } = config
const { journal } = customerFormAPI

export function query (params) {
  return request({
    url: journal + '/list',
    method: 'post',
    data: params,
    page:true,
  })
}

export function fileExport (params){
  return request({
    url: journal + '/export',
    method: 'post',
    data: params,
    responseType: 'blob',
  })
}

