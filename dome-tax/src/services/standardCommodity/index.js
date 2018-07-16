import { request, config } from 'utils'

const { api } = config
const { standardCommodity } = api

export function query (params) {
  return request({
    url: standardCommodity+'/list',
    method: 'post',
    data: params,
  })
}
export function create (params) {
  return request({
    url: standardCommodity+'/save',
    method: 'post',
    data: params,
  }) 
}
