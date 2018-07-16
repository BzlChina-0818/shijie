import { request, config } from 'utils'

const { api } = config
const { flow } = api
console.log(flow);
export function query (params) {
  return request({
    url: flow,
    method: 'get',
    data: params,
  })
}
export function remove (params) {
  let id=params.id
  return request({
    url: `${flow}/delModel/${id}`,
    method: 'delete',
    data: params,
  })
}
export function create (params) {
  return request({
  
    url: `${flow}/new`,
    method: 'post',
    data: params,
  })
}
export function issue (params) {
  return request({
    url: `${flow}/${params.id}/deployment`,
    method: 'get',
    data: params,
  })
}
export function update (params) {
  return request({
    url: flow,
    method: 'get',
    data: params,
  })
}
