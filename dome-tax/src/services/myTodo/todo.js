import { request, config } from 'utils'

const { processAPI } = config
const { workFLow } = processAPI

export function query (params) {
  return request({
    url: workFLow+'/biz/mytodo',
    method: 'post',
    data: params,
    page: true //分页接口
  })
}

export function create (params) {
  return request({
    url: workFLow+'/save',
    method: 'post',
    data: params,
  })
}

export function update (params) {
  return request({
    url: workFLow+'/update',
    method: 'post',
    data: params,
  })
}

export function detail (params) {
  return request({
    url: workFLow+`/detail/${params.housedutyCode}`,
    method: 'get',
  })
}

export function remove (params) {
  return request({
    url: workFLow+`/delete/${params.housedutyCode}`,
    method: 'get',
  })
}

export function unique (params) {
  return request({
    url: workFLow+`/check`,
    method: 'post',
    data: params,
  })
}
export function exportData (params) {
  return request({
    url: workFLow+'/export',
    method: 'post',
    data: params,
    responseType: 'blob',
  })
}
export function importData (params) {
  return request({
    url: workFLow+'/import',
    method: 'post',
    data: params,
    // responseType: 'blob',
    type:true,
  })
}

export function generate (params) {
  return request({
    url: workFLow+'/generate',
    method: 'get',
  })
}
