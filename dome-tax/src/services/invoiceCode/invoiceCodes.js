import {request,config} from 'utils'
const {api,apiPrefix}=config
const {invoiceCode,province,city} =api


/*获取list*/
export function query (params) {
  return request({
    url: `${invoiceCode}/page-list`,
    method: 'post',
    data: params,
    page: true,
  })
}
/*删除*/
export function remove (params) {
  return request({
    url: `${invoiceCode}/${params.id}`,
    method: 'delete',
    data: params,
  })
}
/*获取id*/
export function queryId (params) {
  return request({
    url: `${invoiceCode}/${params.id}`,
    method: 'get',
  })
}
/*获取省*/
export function queryProvince(params) {
  return request({
    url:province,
    method:'get'
  })
}
/*获取市*/
export function queryCity(provCode) {
  return request({
    url:`${city}/${provCode}`,
    method:'get'
  })
}
export function search() {
  return request({
    url:``,
    method:''
  })

}
