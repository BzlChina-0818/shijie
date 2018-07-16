import {request, config} from 'utils'

const {api} = config
const {invoiceCode: details} = api

export function query(params) {
  return request({
    url: details,
    method: 'post',
    data: params,
  })
}

export function remove(params) {
  return request({
    url: details,
    method: 'delete',
    data: params,
  })
}

export function create(params) {
  return request({
    url: `${details}/save`,
    method: 'post',
    data: params,
  })
}

export function update(params) {
  return request({
    url: details,
    method: 'patch',
    data: params,
  })
}

