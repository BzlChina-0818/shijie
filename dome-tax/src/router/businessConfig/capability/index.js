import { PATH } from "utils"
const path = PATH.BUS_CAPABILITY

export default [
  {
    path: path + '/indexDefinition',
    models:()=>[import('models/businessConfig/capability/indexDefinition/list')],
    component:()=>import('routes/businessConfig/capability/indexDefinition')
  },
  {
    path: path + '/indexDefinition/create',
    models:()=>[import('models/businessConfig/capability/indexDefinition/create')],
    component:()=>import('routes/businessConfig/capability/indexDefinition/create')
  },
]
