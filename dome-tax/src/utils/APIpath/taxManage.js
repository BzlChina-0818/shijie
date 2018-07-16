import {API_BASE} from "./common"
import {apiPrefix} from "./common"
/**
 * 税金管理api路径
 */
export default {
  accruedManage: `${API_BASE}/biz-prov`,
  houseTax:`${API_BASE}/taxfee`,
  stampDuty:`${API_BASE}/txbs-stamp`,
  taxDeclaration:`${apiPrefix}/taxfee/delaration`,
}
