import { request, config } from 'utils'

const { entryInvoiceAPI } = config
const { invoiceTaskPool } = entryInvoiceAPI

export function query (params) {
  return request({
    url: invoiceTaskPool+'/list',
    method: 'post',
    data: params,
    page: true //分页接口
  })
} 

export function create (params) {
  return request({
    url: invoiceTaskPool+'/save',
    method: 'post',
    data: params,
  })
}

export function update (params) {
  return request({
    url: invoiceTaskPool+'/update',
    method: 'post',
    data: params,
  })
}

export function detail (params) {
  return request({
    url: invoiceTaskPool+`/${params.id}`,
    method: 'get',
  })
}

export function remove (params) {
  return request({
    url: invoiceTaskPool+`/delete/${params.formId}`,
    method: 'get',
    // data: params,
  })
}

export function unique (params) {
  return request({
    url: invoiceTaskPool+`/check`,
    method: 'post',
    data: params,
  })
}
