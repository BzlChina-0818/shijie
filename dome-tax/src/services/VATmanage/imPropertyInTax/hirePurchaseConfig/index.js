import { request, config } from 'utils'

const { VATmanageAPI } = config
const { hirePurchaseConfig } = VATmanageAPI

export function query (params) {
  return request({
    url: hirePurchaseConfig+'/list',
    method: 'post',
    data: params,
    page: true //分页接口
  })
}

export function create (params) {
  return request({
    url: hirePurchaseConfig+'/save',
    method: 'post',
    data: params,
  })
}

export function update (params) {
  return request({
    url: hirePurchaseConfig+'/update',
    method: 'post',
    data: params,
  })
}

export function detail (params) {
  return request({
    url: hirePurchaseConfig+`/detail/${params.housedutyCode}`,
    method: 'get',
  })
}

export function remove (params) {
  return request({
    url: hirePurchaseConfig+`/delete/${params.housedutyCode}`,
    method: 'get',
  })
}

export function unique (params) {
  return request({
    url: hirePurchaseConfig+`/check`,
    method: 'post',
    data: params,
  })
}
export function exportData (params) {
  return request({
    url: hirePurchaseConfig+'/export',
    method: 'post',
    data: params,
    responseType: 'blob',
  })
}
export function importData (params) {
  return request({
    url: hirePurchaseConfig+'/import',
    method: 'post',
    data: params,
    // responseType: 'blob',
    type:true,
  })
}

export function generate (params) {
  return request({
    url: hirePurchaseConfig+'/generate',
    method: 'get',
  })
}
