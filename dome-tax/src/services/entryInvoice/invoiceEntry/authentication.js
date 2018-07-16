import { request, config } from 'utils'

const { entryInvoiceAPI } = config
const { workFLow, authentica } = entryInvoiceAPI

// 全局请求列表
export function query (params) {
  return request({
    url: authentica + '/list',
    method: 'POST',
    data: params,
    page:true,
  })
}

// 导出
export function fileEduce (params) {
  return request({
    url: authentica + '/export',
    method: 'post',
    data: params,
  })
}

export function particiPant(params) {
  return request({
    url:  `${workFLow}/taskuser/query`,
    method: 'post',
    data: params
  })
}

/* 匹配 */

export function match(params){
  return request({
    url:  `${authentica}/match`,
    method: 'post',
    data: params
  })
}

export function listDelete(params){
  return request({
    url:  `${authentica}/delete`,
    method: 'post',
    data: params
  })
}

export function importData(params){
  console.log(`${authentica}/import`)
  return request({
    url:  `${authentica}/import`,
    method: 'post',
    data: params
  })
}
