import { request, config } from 'utils'

const { taxManageAPI } = config
const { accruedManage } = taxManageAPI

export function query (params) {
  return request({
    url: accruedManage + '/list',
    method: 'post',
    data: params,
    page:true,
  })
}

export function getHouseQuery(params) {
  return request({
    url: accruedManage + '/get',
    method: 'post',
    data: params,
  })
}


export function everyDelete(params){
  return request({
    url: accruedManage + '/delete',
    method: 'POST',
    data: params,
  })
}

export function save(params){
  return request({
    url: accruedManage + '/add',
    method: 'POST',
    data: params,
  })
}

export function update(params){
  return request({
    url: accruedManage + '/update',
    method: 'POST',
    data: params,
  })
}

export function fileEduce(params){
  return request({
    url: accruedManage + '/export',
    method: 'POST',
    data: params,
  })
}

export function batchesDelete(params){
  return request({
    url: accruedManage + '/batchDelete',
    method: 'POST',
    data: params,
  })
}

export function copy(params) {
  return request({
    url: accruedManage + '/batchDelete',
    method: 'POST',
    data: params,
  })
}
