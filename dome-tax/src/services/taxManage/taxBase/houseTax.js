import { request, config } from 'utils'

const { taxManageAPI } = config
const { houseTax } = taxManageAPI

export function query (params) {
  return request({
    url: houseTax + '/house/list',
    method: 'post',
    data: params,
    page:true,
  })
}

export function gethouseTaxQuery(params) {
  return request({
    url: houseTax + '/house/get',
    method: 'post',
    data: params,
  })
}


export function everyDelete(params){
  return request({
    url: houseTax + '/house/delete',
    method: 'POST',
    data: params,
  })
}

export function setAdd(params){
  console.log(params)
  return request({
    url: houseTax + '/house/add',
    method: 'post',
    data: params,
  })
}
// 修改
export function setUpdate(params){
  return request({
    url: houseTax + '/house/update',
    method: 'post',
    data: params,
  })
}

export function fileEduce(params){
  return request({
    url: houseTax + '/house/export',
    method: 'POST',
    data: params,
    responseType:'blob',
  })
}

export function getCopy(params){
  return request({
    url: houseTax + '/house/copy',
    method: 'POST',
    data: params,
  })
}

export function batchesDelete(params) {
  return request({
    url: houseTax + '/house/batchDelete',
    method: 'POST',
    data: params,
  })
}