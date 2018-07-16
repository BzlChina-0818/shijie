import { request, config } from 'utils'

const { api } = config
const { commodity } = api

export function query (params) {
  return request({
    url: commodity+'/list',
    method: 'post',
    data: params,
    page: true //分页接口
  })
}

export function create (params) {
  return request({
    url: commodity+'/save',
    method: 'post',
    data: params,
  })
}
