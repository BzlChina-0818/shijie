import { request, config } from 'utils'

const { api } = config
const { ticketServer } = api

export function query (params) {
  return request({
    url: ticketServer,
    method: 'get',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: `${ticketServer}/${params.id}`,
    method: 'delete',
    data: params, 
  })
}

export function queryId (params) {
  return request({
    url: `${ticketServer}/${params.id}`,
    method: 'get',
  })
}
