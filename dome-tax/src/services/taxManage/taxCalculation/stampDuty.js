import { request, config } from 'utils'

const { taxManageAPI } = config
const { stampDuty } = taxManageAPI

export function query (params) {
  return request({
    url: stampDuty + '/computation-list',
    method: 'post',
    data: params,
    page:true,
  })
} 
export function create (params) {
  return request({
    url: stampDuty + '/save',
    method: 'post',
    data: params,
  })
}
export function remove (params) {
  return request({
    url: stampDuty+`/computation-batch-delete`,
    method: 'post',
    data: params,
  })
}
export function detail (params) {
  return request({
    url: stampDuty + `/declaration-detail/${params.formId}`,
    method: 'get',
  })
}