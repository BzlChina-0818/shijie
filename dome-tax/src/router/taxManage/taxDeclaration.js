import { PATH } from "utils"
const path = PATH.TAX_DECLARATION
export default [
  {
    path: path + '/localTax',
    models:()=>[import('../../models/taxManage/taxDeclaration/localTax/list')],
    component:()=>import('../../routes/taxManage/taxDeclaration/localTax')
  },
  {
    path: path + '/localTax/detail',
    models:()=>[import('../../models/taxManage/taxDeclaration/localTax/detail')],
    component:()=>import('../../routes/taxManage/taxDeclaration/localTax/detail')
  },
  {
    path: path + '/localTax/create',
    models:()=>[import('../../models/taxManage/taxDeclaration/localTax/create')],
    component:()=>import('../../routes/taxManage/taxDeclaration/localTax/create')
  },


  {
    path: path + '/declaration',
    models:()=>[import('../../models/taxManage/taxDeclaration/declaration/list')],
    component:()=>import('../../routes/taxManage/taxDeclaration/declaration')
  },
  {
    path: path + '/declaration/detail',
    models:()=>[import('../../models/taxManage/taxDeclaration/declaration/detail')],
    component:()=>import('../../routes/taxManage/taxDeclaration/declaration/detail')
  },
  {
    path: path + '/declaration/create',
    models:()=>[import('../../models/taxManage/taxDeclaration/declaration/create')],
    component:()=>import('../../routes/taxManage/taxDeclaration/declaration/create')
  },
]

