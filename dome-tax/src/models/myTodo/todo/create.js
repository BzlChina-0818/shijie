import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { pageModel } from '../../common'


import { PATH } from "utils"
const path = PATH.TODO_LIST

import { create, update, detail, generate } from 'services/myTodo/todo'
/**
 * @description 我的待办>我的待办
 * @author guoqianyuan
 */
export default modelExtend(pageModel, {

  namespace: 'hirePurchaseConfigCreate',

  state: {
    formData: {},
    pageType:'create',
    modalInputConfig : {},
    detailDatas: [],
    count: 1,
    detailList: [],
    modalVisible:false,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        // 非创建页面
        const { pathname, search } = location
        const locationState = queryString.parse(search)
        if (pathname === path+'/myTodoList/update'||pathname === path+'/myTodoList/detail') {
          dispatch({
            type: 'updateState',
            payload:{
              pageType:pathname.split('/')[3]
            }
          })
          const payload = {
            housedutyCode :locationState.housedutyCode
          }
          dispatch({
            type: 'detail',
            payload,
          })
        }else if(pathname === path+'/myTodoList/create'){
          dispatch({
            type: 'generate',
          })
          dispatch({
            type: 'updateState',
            payload:{
              pageType:"create",
              formData:{}
            }
          })
        }
      })
    },
  },

  effects: {

    * create ({ payload }, { call }) {
      const data = yield call(create, payload)
      if (data.success) {
        return data
      } else {
        throw data
      }
    },

    * update ({ payload }, { call }) {
      const data = yield call(update, payload)
      if (data.success) {
        return data
      } else {
        throw data
      }
    },

    * detail ({ payload }, { call, put }) {
      const data = yield call(detail, payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload:{
            formData:data.data,
            detailDatas: data.data.detailList
          }
        })
      } else {
        throw data
      }
    },
    // 唯一数据源名称
    * generate ({ }, { call, put }) {
      const data = yield call(generate)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload:{
            formData:{
              housedutyCode:data.data
            },
          }
        })
      } else {
        throw data
      }
    },
  },

  reducers: {

  },
})
