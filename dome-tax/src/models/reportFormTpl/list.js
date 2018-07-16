/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config,unix2Locale } from 'utils'
import { remove, query, generate } from 'services/reportFormTpl'
import { queryBiztaxList } from 'services/baseAPI'
import { pageModel } from '../common'

import { PATH } from "utils"
import downloadjs from "downloadjs";

const path = PATH.REPORT_FORM_TPL
/**
 * @description 报表模版管理
 * @author guoqianyuan
 * @backEnd congshulin
 */
export default modelExtend(pageModel, {
  namespace: 'reportFormTpl',

  state: {
    modalVisible:false,
    taxTypeList:[]
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === path) {
          // const { ...other} = queryString.parse(location.search)

          let payload =  {
              page: 1,
              pageSize: 10,
              // 查询字段
              ...queryString.parse(location.search)
          }
          dispatch({
            type: 'query',
            payload,
          })
          // dispatch({
          //   type: 'taxType',
          // })
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
      const { list } = yield select(_ => _.reportFormTpl)
      if (data.success) {
        yield put({ type: 'updateState', payload: { list: list.filter(_ => _.housedutyCode !== payload) } })
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
    // 生成模版
    * generate ({payload}, { call, put }) {
      const data = yield call(generate,payload)
      if (data.success) {
        return data
      } else {
        throw data
      }
    },

  },

  reducers: {

  },
})
