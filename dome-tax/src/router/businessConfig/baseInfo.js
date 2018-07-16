import { PATH } from "utils"
const path = PATH.BUS_BASEINFO

const filePath_calculateAccruedCfg = "businessConfig/baseInfo/calculateAccruedCfg"

export default [
  {
    path:path+'/calculateAccruedCfg',
    models:()=>[import(`models/${filePath_calculateAccruedCfg}/list`)],
    component:()=>import(`routes/${filePath_calculateAccruedCfg}`)
  }, {
    path:path+'/calculateAccruedCfg/create',
    models:()=>[import(`models/${filePath_calculateAccruedCfg}/create`)],
    component:()=>import(`routes/${filePath_calculateAccruedCfg}/create`)
  }, {
    path:path+'/calculateAccruedCfg/update',
    models:()=>[import(`models/${filePath_calculateAccruedCfg}/create`)],
    component:()=>import(`routes/${filePath_calculateAccruedCfg}/create`)
  }, {
    path:path+'/calculateAccruedCfg/detail',
    models:()=>[import(`models/${filePath_calculateAccruedCfg}/create`)],
    component:()=>import(`routes/${filePath_calculateAccruedCfg}/create`)
  },
]
