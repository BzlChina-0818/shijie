/*
import { request, config } from 'utils'

const { taxManageAPI } = config
const { additional } = taxManageAPI

export function query (params) {
  return request({
    url: additional + '/computation-list',
    method: 'post',
    data: params,
    page:true,
  })
}
export function create (params) {
  return request({
    url: additional + '/save',
    method: 'post',
    data: params,
  })
}
export function remove (params) {
  return request({
    url: additional+`/computation-batch-delete`,
    method: 'post',
    data: params,
  })
}
export function detail (params) {
  return request({
    url: additional + `/declaration-detail/${params.formId}`,
    method: 'get',
  })
}
*/
