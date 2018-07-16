import { PATH } from "utils"

const path = PATH.VAT_TAXBASE
export default [
  {
    path:path+'/salesInvoiceTax',
    models:()=>[import('models/VATmanage/taxBase/salesInvoiceTax/list')],
    component:()=>import('routes/VATmanage/taxBase/salesInvoiceTax')
  }, {
    path:path+'/salesInvoiceTax/detail',
    models:()=>[import('models/VATmanage/taxBase/salesInvoiceTax/detail')],
    component:()=>import('routes/VATmanage/taxBase/salesInvoiceTax/detail')
  },
  {
    path:path+'/planPayment/create',
    models:()=>[import('models/VATmanage/taxBase/planPayment/create')],
    component:()=>import('routes/VATmanage/taxBase/planPayment/create')
  }, {
    path:path+'/planPayment/update',
    models:()=>[import('models/VATmanage/taxBase/planPayment/create')],
    component:()=>import('routes/VATmanage/taxBase/planPayment/create')
  },{
    path:path+'/planPayment/detail',
    models:()=>[import('models/VATmanage/taxBase/planPayment/detail')],
    component:()=>import('routes/VATmanage/taxBase/planPayment/detail')
  },
]
