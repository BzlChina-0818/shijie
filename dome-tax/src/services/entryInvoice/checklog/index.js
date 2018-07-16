import {request,config} from 'utils'
const {entryInvoiceAPI,apiPrefix}=config
const {checklog} =entryInvoiceAPI
/*获取list*/
export function query (params) {
  return request({
    url: `${checklog}/list`,
    method: 'post',
    data: params,
    page: true,
  })
}
export function detail (params) {
  return request({
    url: `${checklog}/${params.id}`,
    method: 'get',
  })
}
/*导出*/
export function exportData (params) {
  return request({
    url: `${checklog}/export`,
    method: 'post',
    data: {...params},
    responseType: 'blob',
  })
}
