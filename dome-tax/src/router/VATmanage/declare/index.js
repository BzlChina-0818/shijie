import { PATH } from "utils"

const path = PATH.GENERAL_TICKET_INSPECTION
const PATH_DECLARE = PATH.VAT_DECLARE
export default [
  {
    path:path+'/checklog',
    models:()=>[import('models/entryInvoice/generalTicketInspection/checklog/list')],
    component:()=>import('routes/entryInvoice/generalTicketInspection/checklog')
  }, 
  {
    path:path+'/checklog/detail',
    models:()=>[import('models/entryInvoice/generalTicketInspection/checklog/detail')],
    component:()=>import('routes/entryInvoice/generalTicketInspection/checklog/detail')
  },
  {
    path:PATH_DECLARE+'/consolidatedReturn',
    models:()=>[import('models/VATmanage/declare/declareForm/list')],
    component:()=>import('routes/VATmanage/declare/declareForm')
  },
  {
    path:PATH_DECLARE+'/taxReturn',
    models:()=>[import('models/VATmanage/declare/declareForm/list')],
    component:()=>import('routes/VATmanage/declare/declareForm')
  },
]
