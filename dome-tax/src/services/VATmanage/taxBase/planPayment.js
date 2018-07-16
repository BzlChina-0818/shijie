import { request, config } from 'utils'

const { VATmanageAPI } = config
const { VATPlanPayment } = VATmanageAPI

export function query (params) {
  return request({
    url: VATPlanPayment+'/list',
    method: 'post',
    data: params,
    page: true //分页接口
  })
}

export function create (params) {
  return request({
    url: VATPlanPayment+'/save',
    method: 'post',
    data: params,
  })
}

export function update (params) {
  return request({
    url: VATPlanPayment+`/update/${params.bizData.id}`,
    method: 'post',
    data: params,
  })
}

export function detail (params) {
  return request({
    url: VATPlanPayment+`/${params.id}`,
    method: 'get',
  })
}

export function remove (params) {
  return request({
    url: VATPlanPayment+`/delete/${params.id}`,
    method: 'get',
  })
}

export function saveAndUpdate (params) {
  const {id,...other} = params
  return request({
    url: VATPlanPayment+`/detail/save/${id}`,
    method: 'post',
    data: other,
  })
}

