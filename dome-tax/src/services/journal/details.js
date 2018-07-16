import { request, config } from 'utils'

const { customerFormAPI } = config
const { journal } = customerFormAPI

export function get (params) {
  return request({
    url: journal + '/' + params.jdId,
    method: 'get',
    //data:params
  })
}


