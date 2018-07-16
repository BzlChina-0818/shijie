/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config,unix2Locale } from 'utils'
import { remove, query } from 'services/VATmanage/imPropertyInTax/hirePurchaseConfig'
import { pageModel } from '../../../common'

import { PATH } from "utils"
import downloadjs from "downloadjs";

const path = PATH.VAT_IMPROPERTYINTAX
/**
 * @description 增值税管理>不动产进项税管理>分期抵扣配置
 * @author guoqianyuan
 */
export default modelExtend(pageModel, {
  namespace: 'hirePurchaseConfig',

  state: {
    modalVisible:false,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === path+'/hirePurchaseConfig') {
          let payload =  {
              page: 1,
              pageSize: 10,
              // 查询字段
              groupNo:null,
              status:null,
              // sort: {
              //   "direction": "DESC",
              //   "property": "id"
              // },
              ...queryString.parse(location.search)
          }
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {

    * query ({ payload = {} }, { call, put }) {
      const respData = yield call(query, payload)
      if (respData.success) {
        let data = respData.data
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.content,
            pagination: data.pagination,
          },
        })
      }
    },

    * delete ({ payload }, { call, put, select }) {
      const data = yield call(remove, { housedutyCode: payload })
      const { list } = yield select(_ => _.hirePurchaseConfig)
      if (data.success) {
        yield put({ type: 'updateState', payload: { list: list.filter(_ => _.housedutyCode !== payload) } })
      } else {
        throw data
      }
    },

  },

  reducers: {
    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    selectSuccess (state, { payload }){
      return {
        ...state,
        formData: {
          ...state.formData,
          ...payload,
        },
      }
    }
  },
})
