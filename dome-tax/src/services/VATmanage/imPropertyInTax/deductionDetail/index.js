import { request, config } from 'utils'

const { VATmanageAPI } = config
const { deductionDetail } = VATmanageAPI

export function query (params) {
  return request({
    //url: deductionDetail+'/list',
    method: 'post',
    data: params,
    page: true //分页接口
  })
}