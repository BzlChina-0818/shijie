/**
 * 前端路由路径前缀配置
 * @type {string}
 */
/** 业务配置 **/
export const BUS_CAPABILITY  = '/businessConfig/capability'
export const BUS_BASEINFO  = '/businessConfig/baseInfo'

/** 自定义模版 **/
export const CUSTOMER_FORM = '/customerForm'
export const DYNAMIC_TEMPLATE = '/dynamicTemplate'

/** 进项发票管理 **/
export const ENTRY_INVOICE = '/entryInvoice/invoiceEntry'                   // 发票录入
export const INQUIRY_STATISTICS = '/entryInvoice/inquiryStatistics'         // 查询统计
export const SPECIAL_CERTIFICATION  = '/entryInvoice/specialCertification'  // 专票认证
export const GENERAL_TICKET_INSPECTION = '/entryInvoice/generalTicketInspection'   //发票查验日志

/** 税金管理 **/
export const TAXMANAGE_TAXBASE  = '/taxManage/taxBase'           // 税基管理
export const TAX_CALCULATION  = '/taxManage/taxCalculation'      // 税金计算
export const TAX_ACCRUED  = '/taxManage/accrued'                 // 税金计提
export const TAX_DECLARATION  = '/taxManage/taxDeclaration'      // 税金申报

/** 增值税管理 **/
const VAT = '/vat'
export const VAT_TAXBASE = `${VAT}/taxBase`                      // 增值税税基管理
export const VAT_CALCULATE = `${VAT}/calculate`                  // 增值税计算
export const VAT_DECLARE = `${VAT}/declare`                      // 增值税申报
export const VAT_IMPROPERTYINTAX = `${VAT}/imPropertyInTax`      // 不动产进项税管理

/** 我的待办**/
const TODO = '/myTodo'
export const TODO_LIST = `${TODO}/list`                      // 待办
export const TODO_HAVADONE = `${TODO}/calculate`             // 已办
export const TODO_COMPLETE = `${TODO}/complete`              // 办结
export const TODO_DRAFT = `${TODO}/draft`                    // 草稿
export const TODO_PENDING = `${TODO}/pending`                // 待阅
export const TODO_READ = `${TODO}/read`                      // 已阅

/** 报表配置管理 **/
export const REPORT_FORM_TPL = `/reportFormTpl`

