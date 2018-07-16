import { request, config } from 'utils'

const { customerFormAPI } = config
const { outputFormat } = customerFormAPI

export function query (params) {
    return request({
      url: outputFormat+'/list',
      method: 'post',
      data: params,
      page: true //分页接口
    })
  }
export function create (params) {
  return request({
    url: outputFormat+'/save',
    method: 'post',
    data: params,
  })
}

export function update (params) {
  return request({
    url: outputFormat+'/update',
    method: 'post',
    data: params,
  })
}

export function detail (params) {
  return request({
    url: outputFormat+`/${params.id}`,
    method: 'get',
  })
}
export function remove (params) {
  return request({
    url: outputFormat+`/delete`,
    method: 'post',
    data: params,
  })
}
export function exportData (params) {
  return request({
    url: outputFormat+'/export',
    method: 'post',
    data: params,
    responseType: 'blob',
  })
}

export function unique (params) {
  return request({
    url: outputFormat+`/check`,
    method: 'post',
    data: params,
  })
}
