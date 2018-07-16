import { request, config } from 'utils'

const { entryInvoiceAPI } = config
const { cewm } = entryInvoiceAPI;
export function getQuery (params) {
  return request({
    url: cewm + '/list',
    method: 'POST',
    data: params,
    page:true
  })
}

export function detailList(params){
  return request({
    url: cewm + '/get',
    method: 'POST',
    data: params
  })
}

export function fileEduce(params){
  //console.log(params)
  /* return request({
    url: cewm + '/get',
    method: 'POST',
    data: params,
    responseType:'blob',
  }) */
}
