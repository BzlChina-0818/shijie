import { PATH } from "utils"

const path = PATH.GENERAL_TICKET_INSPECTION
export default [
  {
    path:path+'/checklog',
    models:()=>[import('../../models/entryInvoice/generalTicketInspection/checklog/list')],
    component:()=>import('../../routes/entryInvoice/generalTicketInspection/checklog')
  }, {
    path:path+'/checklog/detail',
    models:()=>[import('../../models/entryInvoice/generalTicketInspection/checklog/detail')],
    component:()=>import('../../routes/entryInvoice/generalTicketInspection/checklog/detail')
  },
]
