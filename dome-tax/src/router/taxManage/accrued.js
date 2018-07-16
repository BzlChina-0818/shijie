import { PATH } from "utils"
const path = PATH.TAX_ACCRUED

const filePath_accruedManage = "taxManage/accrued/accruedManage"

export default [
  {
    path:path+'/manage',
    models:()=>[import(`models/${filePath_accruedManage}/list`)],
    component:()=>import(`routes/${filePath_accruedManage}`)
  }, {
    path:path+'/createList',
    models:()=>[import(`models/${filePath_accruedManage}/createList`)],
    component:()=>import(`routes/${filePath_accruedManage}/CreateIndex`)
  }, {
    path:path+'/manage/create',
    models:()=>[import(`models/${filePath_accruedManage}/create`)],
    component:()=>import(`routes/${filePath_accruedManage}/create`)
  }, {
    path:path+'/manage/update',
    models:()=>[import(`models/${filePath_accruedManage}/create`)],
    component:()=>import(`routes/${filePath_accruedManage}/create`)
  }, {
    path:path+'/manage/detail',
    models:()=>[import(`models/${filePath_accruedManage}/create`)],
    component:()=>import(`routes/${filePath_accruedManage}/create`)
  },
]
