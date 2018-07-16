import { PATH } from "utils"
const path = PATH.TAX_CALCULATION
export default [
  {
    path: path + '/house',
    models:()=>[import('../../models/taxManage/taxCalculation/house/list')],
    component:()=>import('../../routes/taxManage/taxCalculation/house')
  },
  {
    path: path + '/stampDuty',
    models:()=>[import('models/taxManage/taxCalculation/stampDuty/list')],
    component:()=>import('routes/taxManage/taxCalculation/stampDuty')
  },
  {
    path: path + '/stampDuty/detail',
    models:()=>[import('models/taxManage/taxCalculation/stampDuty/detail')],
    component:()=>import('routes/taxManage/taxCalculation/stampDuty/detail')
  },
  {
    path: path + '/house',
    models:()=>[import('models/taxManage/taxCalculation/stampDuty/list')],
    component:()=>import('routes/taxManage/taxCalculation/stampDuty')
  },
  {
    path: path + '/house/detail',
    models:()=>[import('models/taxManage/taxCalculation/stampDuty/detail')],
    component:()=>import('routes/taxManage/taxCalculation/stampDuty/detail')
  },
  {
    path: path + '/surtax',
    models:()=>[import('models/taxManage/taxCalculation/stampDuty/list')],
    component:()=>import('routes/taxManage/taxCalculation/stampDuty')
  },
  {
    path: path + '/surtax/detail',
    models:()=>[import('models/taxManage/taxCalculation/stampDuty/detail')],
    component:()=>import('routes/taxManage/taxCalculation/stampDuty/detail')
  },
  {
    path: path + '/urbanUseTax',
    models:()=>[import('models/taxManage/taxCalculation/stampDuty/list')],
    component:()=>import('routes/taxManage/taxCalculation/stampDuty')
  },
  {
    path: path + '/urbanUseTax/detail',
    models:()=>[import('models/taxManage/taxCalculation/stampDuty/detail')],
    component:()=>import('routes/taxManage/taxCalculation/stampDuty/detail')
  },
  {
    path: path + '/localTax',
    models:()=>[import('models/taxManage/taxCalculation/stampDuty/list')],
    component:()=>import('routes/taxManage/taxCalculation/stampDuty')
  },
  {
    path: path + '/localTax/detail',
    models:()=>[import('models/taxManage/taxCalculation/stampDuty/detail')],
    component:()=>import('routes/taxManage/taxCalculation/stampDuty/detail')
  },
  
  {
    path: path + '/tableMonitor',
    models:()=>[import('models/taxManage/taxCalculation/tableMonitor/list')],
    component:()=>import('routes/taxManage/taxCalculation/tableMonitor')
  },
  {
    path: path + '/tableMonitor/detail',
    models:()=>[import('models/taxManage/taxCalculation/tableMonitor/detail')],
    component:()=>import('routes/taxManage/taxCalculation/tableMonitor/detail')
  },
]
