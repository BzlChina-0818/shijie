import { request, config } from 'utils'

const { api } = config
const { printingTerminal } = api

export function query (params) {
  return request({
    url: printingTerminal,
    method: 'get',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: `${printingTerminal}/${params.id}`,
    method: 'delete',
    data: params,
  })
}

export function queryId (params) {
  return request({
    url: `${printingTerminal}/${params.id}`,
    method: 'get',
  })
}
