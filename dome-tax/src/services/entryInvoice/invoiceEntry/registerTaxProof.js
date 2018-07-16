import { request, config } from 'utils'

const { api } = config
const { registerTaxProof } = api

export function query (params) {
  return request({
    url: registerTaxProof+'/query',
    method: 'post',
    data: params,
    page: true //分页接口
  })
}

export function create (params) {
  return request({
    url: registerTaxProof+'/save',
    method: 'post',
    data: params,
  })
}

export function update (params) {
  return request({
    url: registerTaxProof+'/update',
    method: 'post',
    data: params,
  })
}

export function detail (params) {
  return request({
    url: registerTaxProof+`/${params.id}`,
    method: 'get',
  })
}

export function remove (params) {
  return request({
    url: registerTaxProof+`/delete`,
    method: 'post',
    data: params,
  })
}

export function unique (params) {
  return request({
    url: registerTaxProof+`/check`,
    method: 'post',
    data: params,
  })
}
export function exportData (params) {
  return request({
    url: registerTaxProof+'/export',
    method: 'post',
    data: params,
    responseType: 'blob',
  })
}
export function importData (params) {
  return request({
    url: registerTaxProof+'/import',
    method: 'post',
    data: params,
    // responseType: 'blob',
    type:true,
  })
}
