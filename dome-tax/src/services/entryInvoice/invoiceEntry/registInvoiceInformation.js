import { request, config } from 'utils'

const { entryInvoiceAPI } = config
const { invoiceBatch ,invoiceLine} = entryInvoiceAPI
//发票批查询
export function query (params) {
  return request({
    url: invoiceBatch+'/query',
    method: 'post',
    data: params,
    page: true //分页接口
  })
}
 //发票批新增保存或修改
export function save (params) {
  return request({
    url: invoiceBatch+'/save',
    method: 'post',
    data: params,
  })
}
//发票批删除
export function remove (params) {
  return request({
    url: invoiceBatch+`/delete/${params.formId}`,
    method: 'get',
    // data: params,
  })
}  
//删除发票行
export function removeinvoiceLine (params) {
  return request({
    url: invoiceLine+`/delete/${params.formId}`,
    method: 'get',
    //data: params,
  })
}
//发票行查询
export function queryId (params) {
  return request({
    url: invoiceBatch+`/${params.formId}`,
    method: 'get',
    // data: params,
  })
}

//增加或修改发票行
export function saveInvoiceLine (params) {
  return request({
    url: invoiceLine+`/save`,
    method: 'post',
    data: params,
  })
}
//查询已获取登记发票列表
export function queryAutoInvoice (params) { 
  return request({
    url: invoiceLine+'/auto-save/query', 
    method: 'post',
    data: params,
    page: true //分页接口
  })
}
//发票行信息修改编辑
export function queryLineId (params) {
  return request({
    url: invoiceLine+`/${params.formId}`,
    method: 'get',
    // data: params,
  })
}
//普通发票手工查验
export function inspection (params) {
  return request({
    url: invoiceLine+`/inspection/${params.formId}`,
    method: 'get',
    // data: params,
  })
}
//自动添加保存
export function autoSave (params) {
  return request({
    url: invoiceLine+`/auto/save`,
    method: 'post',
    data: params,
  })
}
