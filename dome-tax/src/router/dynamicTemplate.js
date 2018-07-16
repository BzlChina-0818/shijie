import { PATH } from "utils"

const path = PATH.DYNAMIC_TEMPLATE
export default [
  {
    path:path,
    models:()=>[import('../models/dynamicTemplate/list')],
    component:()=>import('../routes/dynamicTemplate/')
  },
  {
    path:path+'/create',
    models:()=>[import('../models/dynamicTemplate/create')],
    component:()=>import('../routes/dynamicTemplate/create')
  },
  {
    path:path+'/update',
    models:()=>[import('../models/dynamicTemplate/create')],
    component:()=>import('../routes/dynamicTemplate/create')
  },
  {
    path:path+'/detail',
    models:()=>[import('../models/dynamicTemplate/create')],
    component:()=>import('../routes/dynamicTemplate/create')
  },
]
