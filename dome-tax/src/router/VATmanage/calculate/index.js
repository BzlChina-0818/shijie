import { PATH } from "utils"

const path = PATH.VAT_CALCULATE
export default [

  /*销项基础表*/
  {
    path:path+'/outputTable',

    models:()=>[import('../../../models/VATmanage/calculate/VATCalculationSheet/list')],
    component:()=>import('../../../routes/VATmanage/calculate/outputTable')
  }, {
    path:path+'/outputTable/detail',
    models:()=>[import('../../../models/VATmanage/calculate/VATCalculationSheet/detail')],
    component:()=>import('../../../routes/VATmanage/calculate/outputTable/detail')
  },
  {
    path: path + '/outputTable/create',
    models: () => [import('../../../models/VATmanage/calculate/VATCalculationSheet/detail')],
    component: () => import('../../../routes/VATmanage/calculate/outputTable/create'),
  },
  // 增值税汇总传递单
  {
    path:path+'/summaryTransfer',
    models:()=>[import('models/VATmanage/calculate/summaryTransfer/list')],
    component:()=>import('routes/VATmanage/calculate/summaryTransfer')
  }, {
    path:path+'/summaryTransfer/detail',
    models:()=>[import('models/VATmanage/calculate/summaryTransfer/detail')],
    component:()=>import('routes/VATmanage/calculate/summaryTransfer/detail')
  },
  {
    path:path+'/summaryTransfer/create',
    models:()=>[import('models/VATmanage/calculate/summaryTransfer/create')],
    component:()=>import('routes/VATmanage/calculate/summaryTransfer/create')

  },

/*进项基础表*/
  {
    path:path+'/incomeTable',
    models:()=>[import('../../../models/VATmanage/calculate/VATCalculationSheet/list')],
    component:()=>import('../../../routes/VATmanage/calculate/incomeTable')
  }, {
    path:path+'/incomeTable/detail',
    models:()=>[import('../../../models/VATmanage/calculate/VATCalculationSheet/detail')],
    component:()=>import('../../../routes/VATmanage/calculate/incomeTable/detail')
  },
  {
    path:path+'/incomeTable/create',
    models:()=>[import('../../../models/VATmanage/calculate/VATCalculationSheet/detail')],
    component:()=>import('../../../routes/VATmanage/calculate/incomeTable/create')
  },

  // 增值税纳税信息表汇总
]
