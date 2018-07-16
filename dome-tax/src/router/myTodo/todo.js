import { PATH } from "utils"

const path = PATH.TODO_LIST
/**
 * 我的待办路由配置
 */
export default [
  {
    path:path,
    models:()=>[import('models/myTodo/todo/list')],
    component:()=>import('routes/myTodo/todo/')
  },

]
