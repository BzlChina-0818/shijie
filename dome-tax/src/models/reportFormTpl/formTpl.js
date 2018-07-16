import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { pageModel } from '../common'


import { PATH } from "utils"
const path = PATH.REPORT_FORM_TPL

import { create, update, detail, importData } from 'services/reportFormTpl'
import { queryBiztaxList } from 'services/baseAPI'

/**
 * @description 报表模版管理
 * @author guoqianyuan
 * @backEnd congshulin
 */
export default modelExtend(pageModel, {

  namespace: 'reportFormTplConfig',

  state: {
    formData: {},
    pageType:'create',
    modalInputConfig : {},
    modalVisible:false,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const { pathname, search } = location
        const locationState = queryString.parse(search)
        if (pathname === path+'/formTpl') {

          const payload = {
            id: locationState.id
          }
          dispatch({
            type: 'detail',
            payload,
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

    * importData ({ payload }, { call }) {
      const data = yield call(importData, payload)
      if (data.success) {
        return data
      } else {
        throw data
      }
    },

    // 税种
    * taxType ({}, { call, put }) {
      const data = yield call(queryBiztaxList)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload:{
            taxTypeList:data.data
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
