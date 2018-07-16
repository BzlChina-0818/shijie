import {request,config} from 'utils'
const {VATmanageAPI}=config
const {summaryTransfer} =VATmanageAPI
/*获取list*/
export function query (params) {
  return request({
    url: `${summaryTransfer}/list`,
    method: 'post',
    data: params,
    page: true,
  })
}

export function create (params) {
  return request({
    url: summaryTransfer+'/save',
    method: 'post',
    data: params,
  })
}

export function update (params) {
  return request({
    url: summaryTransfer+'/update',
    method: 'post',
    data: params,
  })
}

export function detail (params) {
  return request({
    url: `${summaryTransfer}/${params.id}`,
    method: 'get',
  })
}
/*导出*/
export function exportData (params) {
  return request({
    url: `${summaryTransfer}/download`,
    method: 'get',
    responseType: 'blob',
  })
}

export function remove (params) {
  return request({
    url: summaryTransfer+`/delete/${params.id}`,
    method: 'post',
  })
}

export function sum (params) {
  return request({
    url: summaryTransfer+'/sum/list',
    method: 'post',
    data: params,
  })
}

export function sumExportData (params) {
  return request({
    url: `${summaryTransfer}/sum/export`,
    method: 'post',
    data: params,
    responseType: 'blob',
  })
}

