import {request,config} from 'utils'
const {VATmanageAPI,apiPrefix}=config
const {salesInvoiceTax,} =VATmanageAPI
/*获取list*/
export function query (params) {
  return request({
    url: `${salesInvoiceTax}/list`,
    method: 'post',
    data: params,
    page: true,
  })
}

/*票面详情*/
export function detail (params) {
  return request({
    url: `${salesInvoiceTax}/${params.id}`,
    method: 'get',
  })
}
/*导出发票行*/
export function exportInvoiceLine (params) {
  return request({
    url: `${salesInvoiceTax}/export`,
    method: 'post',
    data: {...params},
    responseType: 'blob',
  })
}
/*导出商品信息*/
export function exportProductInf (params) {
  return request({
    url: `${salesInvoiceTax}/export/detail`,
    method: 'post',
    data: {...params},
    responseType: 'blob',
  })
}
/*导入*/
export function importData (params) {
  return request({
    url: `/oinv-wait-print-inv/import`,
    method: 'post',
    data: params,
    responseType: 'blob',
  })
}
