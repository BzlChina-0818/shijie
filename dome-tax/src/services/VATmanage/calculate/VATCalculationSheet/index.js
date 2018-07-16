import {request, config} from 'utils'

const {VATmanageAPI, apiPrefix} = config
const {VATCalculationSheet,} = VATmanageAPI

/*获取list*/
export function query(params) {
  return request({
    url: `${VATCalculationSheet}/list`,
    method: 'post',
    data: params,
    page: true,
  })
}

/*详情*/
export function detail(params) {
  return request({
    url: `${VATCalculationSheet}/${params.id}`,
    method: 'get',
  })
}

/*新增*/
export function create(params) {
  return request({
    url: `${VATCalculationSheet}/save`,
    method: 'post',
    data: params,
  })
}
/*删除*/
export function remove(params) {
  return request({
    url: `${VATCalculationSheet}/delete/${params.id}`,
    method: "get"
  })
}


/*导出*/
export function exportData(params) {
  return request({
    url: `${VATCalculationSheet}/export`,
    method: 'post',
    data: params,
    responseType: 'blob',
  })
}
