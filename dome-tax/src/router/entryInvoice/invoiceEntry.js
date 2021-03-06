import { PATH } from "utils"
const path = PATH.ENTRY_INVOICE 
const filePath_registerTaxProof = "entryInvoice/invoiceEntry/registInvoiceInformation"

export default [
  {
    path:path+'/registInvoiceInformation',
    models:()=>[import('models/entryInvoice/invoiceEntry/registInvoiceInformation/list')],
    component:()=>import('routes/entryInvoice/invoiceEntry/registInvoiceInformation')
  },
  {
    path:path+'/registInvoiceInformation/create',
    models:()=>[import('models/entryInvoice/invoiceEntry/registInvoiceInformation/create')],
    component:()=>import('routes/entryInvoice/invoiceEntry/registInvoiceInformation/create')
  },
  {
    path:path+'/registInvoiceInformation/update',
    models:()=>[import('models/entryInvoice/invoiceEntry/registInvoiceInformation/create')],
    component:()=>import('routes/entryInvoice/invoiceEntry/registInvoiceInformation/create')
  },
  {
    path:path+'/registInvoiceInformation/addInvoice/update',
    models:()=>[import('models/entryInvoice/invoiceEntry/registInvoiceInformation/addInvoice')],
    component:()=>import('routes/entryInvoice/invoiceEntry/registInvoiceInformation/addInvoice')
  },{
    path:path+'/registInvoiceInformation/addInvoice/create',
    models:()=>[import('models/entryInvoice/invoiceEntry/registInvoiceInformation/addInvoice')],
    component:()=>import('routes/entryInvoice/invoiceEntry/registInvoiceInformation/addInvoice')
  },
  {
    path:path+'/registInvoiceInformation/autoAddInvoice',
    models:()=>[import('models/entryInvoice/invoiceEntry/registInvoiceInformation/autoAddInvoice')],
    component:()=>import('routes/entryInvoice/invoiceEntry/registInvoiceInformation/autoAddInvoice')
  },
  {
    path: path + '/authentication',
    models:()=>[import('models/entryInvoice/invoiceEntry/authentication/list')],
    component:()=>import('routes/entryInvoice/invoiceEntry/authentication/')
  },
  /*红字发票*/
  {
    path:path+'/creditNote/inquire',
    models:()=>[import('models/entryInvoice/invoiceEntry/creditNote/inquire/list')],
    component:()=>import('routes/entryInvoice/invoiceEntry/creditNote/inquire')
  },
  {
    path:path+'/creditNote/inquire/detail',
    models:()=>[import('models/entryInvoice/invoiceEntry/creditNote/inquire/detail')],
    component:()=>import('routes/entryInvoice/invoiceEntry/creditNote/inquire/detail')
  },
  {
    path:path+'/creditNote/inquire/update',
    models:()=>[import('models/entryInvoice/invoiceEntry/creditNote/inquire/detail')],
    component:()=>import('routes/entryInvoice/invoiceEntry/creditNote/inquire/detail')
  },
  {
    path: path +'/creditNote/applyFor',
    models:()=>[import('models/entryInvoice/invoiceEntry/creditNote/applyFor/list')],
    component:()=>import('routes/entryInvoice/invoiceEntry/creditNote/applyFor')
  },
  {
    path:path+'/creditNote/applyFor/detail',
    models:()=>[import('models/entryInvoice/invoiceEntry/creditNote/applyFor/detail')],
    component:()=>import('routes/entryInvoice/invoiceEntry/creditNote/applyFor/detail')
  },

  //登记代扣代缴税收缴款凭证
  {
    path:path+'/registerTaxProof',
    models:()=>[import(`models/${filePath_registerTaxProof}/list`)],
    component:()=>import(`routes/${filePath_registerTaxProof}`)
  },
  {
    path:path+'/registerTaxProof/create',
    models:()=>[import(`models/${filePath_registerTaxProof}/create`)],
    component:()=>import(`routes/${filePath_registerTaxProof}/create`)
  },
  {
    path:path+'/registerTaxProof/update',
    models:()=>[import(`models/${filePath_registerTaxProof}/create`)],
    component:()=>import(`routes/${filePath_registerTaxProof}/create`)
  },
  {
    path:path+'/registerTaxProof/addInvoice/update',
    models:()=>[import(`models/${filePath_registerTaxProof}/addInvoice`)],
    component:()=>import(`routes/${filePath_registerTaxProof}/addInvoice`)
  },
  {
    path:path+'/registerTaxProof/addInvoice/create',
    models:()=>[import(`models/${filePath_registerTaxProof}/addInvoice`)],
    component:()=>import(`routes/${filePath_registerTaxProof}/addInvoice`)
  }
]
