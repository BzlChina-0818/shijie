import {API_BASE} from "./common"
/**
 * 自定义表单管理api路径
 */
export default {
  dataSource: `${API_BASE}/data-source`,
  journal: `${API_BASE}/runlog`,
  parameter: `${API_BASE}/report-param`,// 动态表单参数列表
  action: `${API_BASE}/function`, // 功能定义
  bizTable: `${API_BASE}/cfg-table`,
  outputFormat:`${API_BASE}/output-def`
}
