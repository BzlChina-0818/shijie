import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { pageModel } from '../../../common'

import { PATH } from "utils"
const path = PATH.VAT_TAXBASE

import { create, update, detail } from 'services/VATmanage/taxBase/planPayment'
import { getDict } from 'services/baseAPI'
/**
 * @description 增值税管理>税基管理>预收款明细管理新增/修改
 * @author guoqianyuan
 * @backEnd liyue
 */
export default modelExtend(pageModel, {

  namespace: 'planPaymentCreate',

  state: {
    formData: {},
    pageType:'create',
    modalInputConfig : {},
    modalVisible:"",
    advancesTypeList:[]
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        // 非创建页面
        const { pathname, search } = location
        const locationState = queryString.parse(search)
        if (pathname === path+'/planPayment/update') {
          dispatch({
            type: 'updateState',
            payload:{
              pageType:'update'
            }
          })
          const payload = {
            id :locationState.id
          }
          dispatch({
            type: 'detail',
            payload,
          })
        }else if(pathname === path+'/planPayment/create'){
          dispatch({
            type: 'advancesType',
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

    * advancesType ({ }, { call, put }) {
      const data = yield call(getDict, {dictId:"advancesType"})
      if (data.success) {
        yield put({
          type: 'updateState',
          payload:{
            advancesTypeList:data.data,
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
