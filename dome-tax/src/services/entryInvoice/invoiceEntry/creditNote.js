import {request,config} from 'utils'
const {entryInvoiceAPI,apiPrefix}=config
const {creditNote,} =entryInvoiceAPI
/*获取红字发票查询*/
export function queryInquire (params) {
  return request({
    url: `${creditNote}/list-page`,
    method: 'post',
    data: params,
    page: true,
  })
}
//获取红字发票申请
export function queryApplyFor (params) {
  return request({
    url: `${creditNote}/iinvline-list`,
    method: 'post',
    data: params,
    page: true,
  })
}
//删除草稿
export function remove(params) {
  return request({
    url:`${creditNote}/delete/${params.id}`,
    method:'post',
    data:params,
  })
}
//红字发票申请
export function applyForDetail (params) {
  return request({
    url: `${creditNote}/redInvoiceApply-detail/${params.id}`,
    method: 'get',
  })
}
//红字发票申请单详情
export function detail (params) {
  return request({
    url: `${creditNote}/detail/${params.id}`,
    method: 'get',
  })
}

//红字发票申请单草稿保存
export function save (params) {
  return request({
    url: `${creditNote}/save-update`,
    method: 'post',
    data:params,
  })
}
//修改红字发票申请单审核状态

export function updateFormstatus (params) {
  return request({
    url: `${creditNote}/update-formstatus`,
    method: 'post',
    data:params,
  })
}
