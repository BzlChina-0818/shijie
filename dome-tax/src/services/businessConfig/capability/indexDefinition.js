import { request, config } from 'utils'

const { businessConfigAPI } = config
const { define } = businessConfigAPI

export function query (params) {
  return request({
    url: define + '/list',
    method: 'post',
    data: params,
    page:true,
  })
}

export function create (params) {
  return request({
    url: define + '/add',
    method: 'post',
    data: params,
  })
}