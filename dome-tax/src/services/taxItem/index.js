import { request, config } from 'utils'

const { api } = config
const { taxItem } = api

export function query (params) {
  return request({
    url: taxItem+'/list',
    method: 'post',
    data: params,
  })
}

export function create (params) {
  return request({
    url: taxItem+'/save',
    method: 'post',
    data: params,
  })
}
