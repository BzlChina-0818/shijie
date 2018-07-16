import {API_BASE} from "./common"
// const API_VAT = API_BASE + '/vat'   //增值税管理
/**
 * 增值税管理api路径
 */
export default {
  hirePurchaseConfig: `${API_BASE}/vat/cfg-house-duty`,
  salesInvoiceTax:`${API_BASE}/oinv-wait-print-inv`,
  VATCalculationSheet: `${API_BASE}/vat/issue-basic`,  //销项/进项基础表
  VATPlanPayment: `${API_BASE}/vat/plan-payment`,  // 预收款明细
  taxInformationSummary: `${API_BASE}/vat/info-sum`,  // 增值税纳税信息汇总
  summaryTransfer: `${API_BASE}/vat/transfer`
}
