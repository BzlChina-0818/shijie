import {API_BASE,API_BASE_IINV} from "./common"
/**
 * 进项发票管理api路径
 */
export default {

  hirePurchaseConfig: `${API_BASE}/cfg-house-duty`,
  outputTable: `${API_BASE}/issue-basic`,
  summaryTransfer: `${API_BASE}/summaryTransfer`,  //增值税汇总传递单
  criscTm: `${API_BASE_IINV}/pool`,
  workFLow: `${API_BASE}/process`,                 //税控认证结算导入及匹配
  authentica: `${API_BASE_IINV}/import`,  
  /* 查询统计 */
  cewm:`${API_BASE_IINV}/line`,     
  invoiceBatch:`${API_BASE}/iinv/invoice`,//发票批
  invoiceLine:`${API_BASE}/iinv/line`,//发票行

  /*已获取进项发票管理*/
  obtainedEntry: `${API_BASE}/iinv/imp-invoice`,
  /*蓝/红字发票查询*/
  creditNote: `${API_BASE}/iinv-return`,
  //日志
  checklog: `${API_BASE}/checklog`,
  //发票认证任务池
  invoiceTaskPool:`${API_BASE}/accept-invoice/auth`
}
