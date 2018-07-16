import { request, config } from 'utils'

const { dynamicAPI } = config
const { dynamic } = dynamicAPI

export function getConfig (params) {
  return request({
    url: dynamic+`/${params.tableName}/config`,
    method: 'get',
  })
}

export function query (params) {
  const {tableName,...other} = params
  return request({
    url: dynamic+`/${tableName}/list`,
    method: 'post',
    data: other,
    page: true //分页接口
  })
}

export function create (params) {
  const {tableName,...other} = params

  return request({
    url: dynamic+`/${tableName}/save`,
    method: 'post',
    data: other,
  })
}

export function update (params) {
  const {tableName,...other} = params

  return request({
    url: dynamic+`/${tableName}/update`,
    method: 'post',
    data: other,
  })
}

export function detail (params) {
  const {tableName,...other} = params

  return request({
    url: dynamic+`/${tableName}/detail`,
    method: 'post',
    data: other,
  })
}

export function remove (params) {
  return request({
    url: dynamic+`/${params.tableName}/delete`,
    method: 'post',
    data: params,
  })
}

