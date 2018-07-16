import { request, config } from 'utils'

const { api } = config
const { process } = api

export function query (params) {
  return request({
    url: process,
    method: 'post',
    data: params,
  })
}