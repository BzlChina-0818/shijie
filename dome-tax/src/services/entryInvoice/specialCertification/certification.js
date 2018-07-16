import { request, config } from 'utils'

const { entryInvoiceAPI } = config
const { criscTm } = entryInvoiceAPI

// 全局请求列表
export function query (params) {
  console.log(params)
  return request({
    url: criscTm + '/monitor',
    method: 'POST',
    data: params,
    page:true,
  })
}

export function fileEduce(params){
  console.log(params)
  /* return request({
    url: criscTm + '/monitor',
    method: 'POST',
    data: params
  }) */
}
