import { request, config } from 'utils'

const { reportFormTplAPI } = config
const { reportFormTpl } = reportFormTplAPI

export function query (params) {
  return request({
    url: reportFormTpl+'/template/query',
    method: 'post',
    data: params,
    page: true //分页接口
  })
}

export function create (params) {
  return request({
    url: reportFormTpl+'/template/import',
    method: 'post',
    data: params,
    requestType: "form"
  })
}

export function update (params) {
  return request({
    url: reportFormTpl+'/update',
    method: 'post',
    data: params,
  })
}

export function detail (params) {
  return request({
    url: reportFormTpl+`/template/${params.id}`,
    method: 'get',
  })
}

export function remove (params) {
  return request({
    url: reportFormTpl+`/delete/${params.id}`,
    method: 'get',
  })
}
export function exportData (params) {
  return request({
    url: reportFormTpl+'/export',
    method: 'post',
    data: params,
    responseType: 'blob',
  })
}
export function importData (params) {
  return request({
    url: reportFormTpl+'/template/import',
    method: 'post',
    data: params,
  })
}
// 生成
export function generate (params) {
  return request({
    url: reportFormTpl+`/template/generate/${params.id}`,
    method: 'get',
  })
}
