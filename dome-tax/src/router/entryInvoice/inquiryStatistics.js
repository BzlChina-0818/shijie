import { PATH } from "utils"
const path = PATH.INQUIRY_STATISTICS
export default [
  {
    path: path + '/statusWarning',
    models:()=>[import('../../models/entryInvoice/inquiryStatistics/statusWarning/list')],
    component:()=>import('../../routes/entryInvoice/inquiryStatistics/statusWarning/')
  },
  {
    path: path + '/statusWarning/detail/:id',
    models:()=>[import('../../models/entryInvoice/inquiryStatistics/statusWarning/detail')],
    component:()=>import('../../routes/entryInvoice/inquiryStatistics/statusWarning/detail')
  },
]