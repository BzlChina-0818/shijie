import { PATH } from "utils"
const path = PATH.TAXMANAGE_TAXBASE
export default [
  {
    path: path + '/house',
    models:()=>[import('models/taxManage/taxBase/houseTax/list')],
    component:()=>import('routes/taxManage/taxBase/houseTax/')
  },
  {
    path: path + '/house/detail',
    models:()=>[import('models/taxManage/taxBase/houseTax/create')],
    component:()=>import('routes/taxManage/taxBase/houseTax/create')
  },
  {
    path: path + '/house/create',
    models:()=>[import('models/taxManage/taxBase/houseTax/create')],
    component:()=>import('routes/taxManage/taxBase/houseTax/create')
  },
  {
    path: path + '/house/update',
    models:()=>[import('models/taxManage/taxBase/houseTax/create')],
    component:()=>import('routes/taxManage/taxBase/houseTax/create')
  },
  {
    path: path + '/stampDuty',
    models:()=>[import('models/taxManage/taxBase/stampDuty/list')],
    component:()=>import('routes/taxManage/taxBase/stampDuty')
  },
  { 
    path: path + '/stampDuty/create',
    models:()=>[import('models/taxManage/taxBase/stampDuty/create')],
    component:()=>import('routes/taxManage/taxBase/stampDuty/create')
  },
  {
    path: path + '/stampDuty/detail',
    models:()=>[import('models/taxManage/taxBase/stampDuty/create')],
    component:()=>import('routes/taxManage/taxBase/stampDuty/create')
  },
  {
    path: path + '/stampDuty/amend',
    models:()=>[import('models/taxManage/taxBase/stampDuty/create')],
    component:()=>import('routes/taxManage/taxBase/stampDuty/create')
  },
]