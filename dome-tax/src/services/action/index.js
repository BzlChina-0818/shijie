import {request,config} from 'utils'
const {customerFormAPI}=config
const {action} =customerFormAPI
/*获取list*/
export function query (params) {
  return request({
    url: `${action}/list`,
    method: 'post',
    data: params,
    page: true,
  })
}

/*新增*/
export function create(params) {
  return request({
    url: `${action}/save`,
    method: 'post',
    data: params,
  })
}
/*修改*/
export function update(params) {
  return request({
    url: `${action}/update`,
    method: 'post',
    data: params,
  })
}
export function detail (params) {
  return request({
    url: `${action}/${params.id}`,
    method: 'get',
  })
}
export function exportData (params) {
  return request({
    url: action+'/export',
    method: 'post',
    data: params,
    responseType: 'blob',
  })
}
export function importData (params) {
  return request({
    url: action+'/import',
    method: 'post',
    data: params,
    // responseType: 'blob',
    type:true,
  })
}

export function unique (params) {
  return request({
    url: action+`/unique`,
    method: 'post',
    data: params,
  })
}
