import { request, config } from 'utils'

const { taxManageAPI } = config
const { stampDuty } = taxManageAPI

export function query (params) {
  return request({
    url: stampDuty + '/list-page',
    method: 'post',
    data: params,
    page:true,
  })
}

export function detail (params) {
  return request({
    url: stampDuty + '/detail/' + params.id,
    method: 'get', 
  })
}

export function create (params) {
  return request({
    url: stampDuty + '/create',
    method: 'get',
    data: params,
  })
}

export function batchesDelete(params){
  return request({
    url: stampDuty + '/criteria-delete',
    method: 'post',
    data: params,
  })
}

export function everyDelete(params){
  return request({
    url: stampDuty + '/batch-delete',
    method: 'post',
    data: params,
  })
}

export function fileEduce(params){
  return request({
    url: stampDuty + '/export-excel',
    method: 'post',
    data:params,
    responseType:'blob',
  })
}

export function save(params){
  return request({
    url: stampDuty + '/add-update',
    method: 'post',
    data:params,
  })
}