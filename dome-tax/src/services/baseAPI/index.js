import {request,config} from 'utils'
const {apiPrefix}=config
/**
 * 组织公司查询
 * @用于：1.组织结构modal
 */
export function queryGroupList () {
  return request({
    url: `${apiPrefix}/sys/group-tree/list`,
    method: 'get',
  })
}
//查询字段字典表
export function getDict (params) {
  return request({
    url: `${apiPrefix}/dict/get-dict/${params.dictId}`,
    method: 'get',
  })
}
//销货单位
export function querySalesUnit (params){
  return request({
    url: `${apiPrefix}/partner/list`,
    method: 'post',
    data:params,
    page:true,
  })
}
/**
 * 税种
 * @用于：1.业务配置>计算表计提配置管理>新增
 */
export function queryBiztaxList (params){
  return request({
    url: `${apiPrefix}/biz-tax/list`,
    method: 'post',
    data:params,
  })
}
//纳税人主体
export function queryTaxpayerBody (params){
  return request({
    url: `${apiPrefix}/taxpayer/list`,
    method: 'post',
    data:params,
    page:true
  })
}
/**
 * 税目
 * @用于：1.业务配置>计算表计提配置管理>新增
 */
export function queryBiztaxItemList (params){
  return request({
    url: `${apiPrefix}/biz-tax/item/list`,
    method: 'post',
    data:params,
    page:true
  })
}
/**
 * 表类型
 * @用于：1.业务配置>计算表计提配置管理>新增
 */
export function getBiztaxFormType (params){
  return request({
    url: `${apiPrefix}/biz-tax/formType/${params.taxNo}`,
    method: 'get',
  })
}

/**
 * 科目组合
 * @param params
 * @returns {*}
 */
export function queryBizCoaList (params){
  return request({
    url: `${apiPrefix}/biz-coa/list`,
    method: 'post',
    data:params,
    page:true
  })
}

/**
 * @用于：1.业务配置>指标定义>新增 计算公式-常值
 */

export function queryLiteralList (params){
  return request({
    url: `${apiPrefix}/index/define/const/query`,
    method: 'post',
    data:params,
    page:true
  })
}

/**
 * @用于：1.业务配置>指标定义>新增 计算公式-指标
 */

export function queryIndexList (params){
  return request({
    url: `${apiPrefix}/index/define/list`,
    method: 'post',
    data:params,
    page:true
  })
}