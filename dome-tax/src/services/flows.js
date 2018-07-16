import { request, config } from 'utils'

const { api } = config
const { flows } = api

export function query (params) {
  return request({
    url: flows,
    method: 'post',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: flows,
    method: 'delete',
    data: params,
  })
}
