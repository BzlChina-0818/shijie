import customerForm from './customerForm'
import dynamicTemplate from './dynamicTemplate'
import invoiceEntry from './entryInvoice/invoiceEntry'
import inquiryStatistics from './entryInvoice/inquiryStatistics'
import specialCertification from './entryInvoice/specialCertification'
import generalTicketInspection from './entryInvoice/generalTicketInspection'
import obtainedEntry from './entryInvoice/obtainedEntry'

/*发票详情模板*/
import invoiceTemplate from './invoiceTemplate'


// 业务配置
import capability from './businessConfig/capability'
import baseInfo from './businessConfig/baseInfo'


// 增值税管理
import imPropertyInTax from './VATmanage/imPropertyInTax'
import outputTable from './VATmanage/calculate'
import VATTaxBase from './VATmanage/taxBase'
import VATDeclare from './VATmanage/declare'

// 税金管理
import taxBase from './taxManage/taxBase'
import taxCalculation from './taxManage/taxCalculation'
import taxManageAccrued from './taxManage/accrued'
import taxDeclaration from './taxManage/taxDeclaration'


// 我的待办
import myTodo from './myTodo/todo'

export default [
  {
    path: '/dashboard',
    models: () => [import('models/dashboard')],
    component: () => import('routes/dashboard/'),
  },
  {
    path: '/login',
    models: () => [import('models/login')],
    component: () => import('routes/login/'),
  }, {
    path: '/flow',
    models: () => [import('models/flow')],
    component: () => import('routes/flow'),
  }, {
    path: '/process',
    models: () => [import('models/process')],
    component: () => import('routes/process'),
  }, {
    path: '/invoiceCode',
    models: () => [import('models/invoiceCode/list')],
    component: () => import('routes/invoiceCode/'),
  },
  {
    path: '/invoiceCode/create',
    models: () => [import('models/invoiceCode/create')],
    component: () => import('routes/invoiceCode/create/'),
  }, {
    path: '/invoiceCode/update',
    models: () => [import('models/invoiceCode/create')],
    component: () => import('routes/invoiceCode/create/'),
  }, {
    path: '/invoiceCode/detail',
    models: () => [import('models/invoiceCode/create')],
    component: () => import('routes/invoiceCode/create/'),
  },
  {
    path: '/printingPool',
    models: () => [import('models/printingPool/list')],
    component: () => import('routes/printingPool/')
  },
  {
    path: '/printingPool/create',
    models: () => [import('models/printingPool/create')],
    component: () => import('routes/printingPool/create/')
  },
  {
    path: '/printingPool/:id',
    models: () => [import('models/printingPool/detail')],
    component: () => import('routes/printingPool/detail/')
  }, {
    path: '/ticketServer',
    models: () => [import('models/ticketServer/list')],
    component: () => import('routes/ticketServer/')
  },
  {
    path: '/ticketServer/:id',
    models: () => [import('models/ticketServer/operation')],
    component: () => import('routes/ticketServer/operation/')
  },
  {
    path: '/printingTerminal',
    models: () => [import('models/printingTerminal/list')],
    component: () => import('routes/printingTerminal/')
  },
  {
    path: '/printingTerminal/create',
    models: () => [import('models/printingTerminal/create')],
    component: () => import('routes/printingTerminal/create/')
  },
  {
    path: '/printi/dashboardngTerminal/:id',
    models: () => [import('models/printingTerminal/detail')],
    component: () => import('routes/printingTerminal/detail/')
  },
  {
    path: '/commodity',
    models: () => [import('models/commodity/list')],
    component: () => import('routes/commodity/')
  },
  {
    path: '/commodity/create',
    models: () => [import('models/commodity/create')],
    component: () => import('routes/commodity/create')
  },
  {
    path: '/commodity/update',
    models: () => [import('models/commodity/create')],
    component: () => import('routes/commodity/create')
  },
  {
    path: '/commodity/detail',
    models: () => [import('models/commodity/create')],
    component: () => import('routes/commodity/create')
  },
  {
    path: '/invoiceDetail',
    models: () => [import('models/invoiceDetail/list')],
    component: () => import('routes/invoiceDetail/')
  },
  {
    path: '/invoiceDetail/create',
    models: () => [import('models/invoiceDetail/create')],
    component: () => import('routes/invoiceDetail/create')
  },
  {
    path: '/invoiceDetail/update',
    models: () => [import('models/invoiceDetail/create')],
    component: () => import('routes/invoiceDetail/create')
  },
  {
    path: '/invoiceDetail/detail',
    models: () => [import('models/invoiceDetail/create')],
    component: () => import('routes/invoiceDetail/create')

  },
  {
    path: '/addInvoiceDetail',
    models: () => [import('models/addInvoiceDetail')],
    component: () => import('routes/addInvoiceDetail/')
  },
  {
    path: '/reportFormTpl',
    models: () => [import('models/reportFormTpl/list')],
    component: () => import('routes/reportFormTpl/')
  },
  {
    path: '/reportFormTpl/create',
    models: () => [import('models/reportFormTpl/create')],
    component: () => import('routes/reportFormTpl/create')
  },
  {
    path: '/reportFormTpl/update',
    models: () => [import('models/reportFormTpl/create')],
    component: () => import('routes/reportFormTpl/create')
  },
  {
    path: '/reportFormTpl/formTpl',
    models: () => [import('models/reportFormTpl/formTpl')],
    component: () => import('routes/reportFormTpl/formTpl')

  },
  ...customerForm,
  ...dynamicTemplate,
  ...invoiceEntry,
  ...inquiryStatistics,
  ...specialCertification,
  ...generalTicketInspection,
  ...obtainedEntry,
  ...VATTaxBase,
  ...taxBase,
  ...taxCalculation,
  ...imPropertyInTax,
  ...capability,
  ...outputTable,
  ...baseInfo,
  ...myTodo,
  ...taxManageAccrued,
  ...invoiceTemplate,
  ...VATDeclare,
  ...taxDeclaration,
]


