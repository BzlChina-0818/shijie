import {request, config} from 'utils'

const {VATmanageAPI, apiPrefix} = config
const {taxInformationSummary,} = VATmanageAPI

console.log(taxInformationSummary);

/*获取list*/
export function query(params) {
  return request({
    url: `${taxInformationSummary}/list`,
    method: 'post',
    data: params,
    page: true,
  })
}

/*详情*/
export function detail(params) {
  return request({
    url: `${taxInformationSummary}/${params.id}`,
    method: 'get',
  })
}

/*新增*/
export function create(params) {
  return request({
    url: `${taxInformationSummary}/save`,
    method: 'post',
    data: params,
  })
}
/*删除*/
export function remove(params) {
  return request({
    url: `${taxInformationSummary}/delete/${params.id}`,
    method: "get"
  })
}


/*导出*/
export function exportData(params) {
  return request({
    url: `${taxInformationSummary}/export`,
    method: 'post',
    data: params,
    responseType: 'blob',
  })
}
