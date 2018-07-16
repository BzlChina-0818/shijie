import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { pageModel } from '../../../common'

import { PATH } from "utils"
const path = PATH.TAX_DECLARATION

import { create, update, detail, generate } from 'services/taxManage/taxDeclaration'
/*
 * @description 税金管理>税金申报>地方税种
 * @author linxiaonan
 * @backEnd lijinkai
 */
export default modelExtend(pageModel, {

  namespace: 'declarationCreate',

  state: {
    formData: {},
    pageType:'create',
    modalVisible:false,
    NormTypeList:[],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        // 非创建页面
        const { pathname, search } = location
        const locationState = queryString.parse(search)
        if(pathname === path+'/declaration/create'){
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
