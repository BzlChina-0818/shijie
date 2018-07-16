import { request, config } from 'utils'

const { taxManageAPI } = config
const { taxDeclaration } = taxManageAPI

export function query (params) {
  return request({
    url: taxDeclaration + '/list',
    method: 'post',
    data: params,
    page:true,
  })
}

export function getHouseQuery(params) {
  return request({
    url: taxDeclaration + '/get',
    method: 'post',
    data: params,
  })
}


export function everyDelete(params){
  return request({
    url: taxDeclaration + '/delete',
    method: 'POST',
    data: params,
  })
}

export function save(params){
  return request({
    url: taxDeclaration + '/add',
    method: 'POST',
    data: params,
  })
}

export function update(params){
  return request({
    url: taxDeclaration + '/update',
    method: 'POST',
    data: params,
  })
}

export function fileEduce(params){
  return request({
    url: taxDeclaration + '/export',
    method: 'POST',
    data: params,
  })
}

export function batchesDelete(params){
  return request({
    url: taxDeclaration + '/batchDelete',
    method: 'POST',
    data: params,
  })
}

export function copy(params) {
  return request({
    url: taxDeclaration + '/batchDelete',
    method: 'POST',
    data: params,
  })
}
