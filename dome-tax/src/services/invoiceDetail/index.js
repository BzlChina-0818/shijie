import { request, config } from 'utils'
const { invoiceDetailAPI } = config
const { VAT }=invoiceDetailAPI
//各个种类发票详情接口
export function queryVAT (params) {
    return request({
      url: VAT+`/${params.formId}`,
      method: 'get', 
    })
} 
  