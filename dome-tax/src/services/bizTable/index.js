import { request, config } from 'utils'

const { customerFormAPI} = config
const { bizTable } = customerFormAPI

export function query (params) {
  return request({
    url: bizTable+'/list',
    method: 'post',
    data: params,
    page:true,
  })
}
export function queryCode (bizTableName) {
  return request({
    url: `${bizTable}/${bizTableName}`,
    method: 'get',

  })
}

export function create (params) {
  return request({
    url: bizTable+'/save',
    method: 'post',
    data: params,
  })
}


