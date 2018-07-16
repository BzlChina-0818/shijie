import { PATH } from "utils"
const path = PATH.SPECIAL_CERTIFICATION

export default [
  {
    path: path + '/certification',
    models:()=>[import('../../models/entryInvoice/specialCertification/certification/list')],
    component:()=>import('../../routes/entryInvoice/specialCertification/certification/')
  },
  {
    path: path + '/invoiceTaskPool',
    models:()=>[import('models/entryInvoice/specialCertification/invoiceTaskPool/list')],
    component:()=>import('routes/entryInvoice/specialCertification/invoiceTaskPool/')
  },
  {
    path: path + '/invoiceTaskPool/detail',
    models:()=>[import('models/entryInvoice/specialCertification/invoiceTaskPool/detail')],
    component:()=>import('routes/entryInvoice/specialCertification/invoiceTaskPool/detail')
  },
] 
