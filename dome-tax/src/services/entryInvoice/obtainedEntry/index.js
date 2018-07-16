import { request, config } from 'utils'

const { entryInvoiceAPI } = config
const { obtainedEntry, } = entryInvoiceAPI

// 全局请求列表
export function query (params) {
  return request({
    url: obtainedEntry + '/list',
    method: 'POST',
    data: params,
    page:true,
  })
}
export function detail (params) {
  return request({
    url: obtainedEntry+`/${params.id}`,
    method: 'get',
  })
}

// 导出
export function exportData (params) {
  return request({
    url: obtainedEntry+'/export',
    method: 'post',
    data: {...params},
    responseType: 'blob',
  })
}

