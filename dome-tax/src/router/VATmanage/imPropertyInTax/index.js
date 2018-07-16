import { PATH } from "utils"
const path = PATH.VAT_IMPROPERTYINTAX

const filePath_hirePurchaseConfig = "VATmanage/imPropertyInTax/hirePurchaseConfig"

export default [
  {
    path:path+'/hirePurchaseConfig',
    models:()=>[import(`models/${filePath_hirePurchaseConfig}/list`)],
    component:()=>import(`routes/${filePath_hirePurchaseConfig}`)
  }, {
    path:path+'/hirePurchaseConfig/create',
    models:()=>[import(`models/${filePath_hirePurchaseConfig}/create`)],
    component:()=>import(`routes/${filePath_hirePurchaseConfig}/create`)
  }, {
    path:path+'/hirePurchaseConfig/update',
    models:()=>[import(`models/${filePath_hirePurchaseConfig}/create`)],
    component:()=>import(`routes/${filePath_hirePurchaseConfig}/create`)
  }, {
    path:path+'/hirePurchaseConfig/detail',
    models:()=>[import(`models/${filePath_hirePurchaseConfig}/create`)],
    component:()=>import(`routes/${filePath_hirePurchaseConfig}/create`)
  },
  {
    path:path+'/deductionDetail',
    models:()=>[import(`models/VATmanage/imPropertyInTax/deductionDetail/list`)],
    component:()=>import(`routes/VATmanage/imPropertyInTax/deductionDetail`)
  },
  {
    path:path+'/deductionSummary',
    models:()=>[import(`models/VATmanage/imPropertyInTax/deductionSummary/list`)],
    component:()=>import(`routes/VATmanage/imPropertyInTax/deductionSummary`)
  },
]
