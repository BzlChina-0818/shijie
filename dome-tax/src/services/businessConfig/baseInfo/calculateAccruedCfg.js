import { request, config } from 'utils'
const { businessConfigAPI } = config
const { calculateAccruedCfg } = businessConfigAPI

export function query (params) {
  return request({
    url: calculateAccruedCfg + '/list',
    method: 'post',
    data: params,
    page: true,
  })
}

export function create (params) {
  return request({
    url: calculateAccruedCfg + '/save',
    method: 'post',
    data: params,
  })
}

export function detail (params) {
  return request({
    url: calculateAccruedCfg + `/${params.id}`,
    method: 'get',
  })
}

export function exportData (params) {
  return request({
    url: calculateAccruedCfg+'/export-excel',
    method: 'get',
    data: {...params},
    responseType: 'blob',
  })
}
