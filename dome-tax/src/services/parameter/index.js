import {request,config} from 'utils'
const {customerFormAPI,apiPrefix}=config
const {parameter} =customerFormAPI
/*获取list*/
export function query (params) {
  return request({
    url: `${parameter}/list-page`,
    method: 'post',
    data: params,
    page: true,
  })
}
/*新增*/
export function create(params) {
  return request({
    url: `${parameter}/save`,
    method: 'post',
    data: params,
  })
}
/*修改*/
export function update(params) {
  return request({
    url: `${parameter}/update`,
    method: 'post',
    data: params,
  })
}
export function detail (params) {
  return request({
    url: `${parameter}/${params.id}`,
    method: 'get',
  })
}
