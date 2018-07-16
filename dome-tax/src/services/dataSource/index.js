import { request, config } from 'utils'
const { customerFormAPI } = config
const { dataSource } = customerFormAPI

export function query (params) {
  return request({
    url: dataSource+'/list',
    method: 'post',
    data: params,
    page: true //分页接口
  })
}

export function create (params) {
  return request({
    url: dataSource+'/save',
    method: 'post',
    data: params,
  })
}

export function update (params) {
  return request({
    url: dataSource+'/update',
    method: 'post',
    data: params,
  })
}

export function detail (params) {
  return request({
    url: dataSource+`/${params.id}`,
    method: 'get',
  })
}

export function remove (params) {
  return request({
    url: dataSource+`/delete`,
    method: 'post',
    data: params,
  })
}

export function unique (params) {
  return request({
    url: dataSource+`/check`,
    method: 'post',
    data: params,
  })
}
export function exportData (params) {
  return request({
    url: dataSource+'/export',
    method: 'post',
    data: params,
    responseType: 'blob',
  })
}
export function importData (params) {
  return request({
    url: dataSource+'/import',
    method: 'post',
    data: params,
    // responseType: 'blob',
    type:true,
  })
}
