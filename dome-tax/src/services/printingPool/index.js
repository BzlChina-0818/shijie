import { request, config } from 'utils'

const { api } = config
const { printingPool } = api

export function query (params) {
  return request({
    url: printingPool,
    method: 'post',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: `${printingPool}/${params.id}`,
    method: 'delete',
    data: params, 
  })
}

export function queryId (params) {
  return request({
    url: `${printingPool}/${params.id}`,
    method: 'get',
  })
}
