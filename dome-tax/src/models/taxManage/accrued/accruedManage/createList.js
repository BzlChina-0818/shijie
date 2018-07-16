/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config,unix2Locale } from 'utils'
import { remove, query } from 'services/taxManage/accrued/accruedManage'
import { queryBiztaxList } from 'services/baseAPI'
import { pageModel } from '../../../common'

import { PATH } from "utils"
import downloadjs from "downloadjs";

const path = PATH.TAX_ACCRUED
/**
 * @description 税金管理>税金计提>计提管理
 * @author guoqianyuan
 */
export default modelExtend(pageModel, {
  namespace: 'taxFeeAccruedCreateList',

  state: {
    modalVisible:false,
    taxTypeList:[],
    selectedRowKeys:[],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === path+'/createList') {
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
          dispatch({
            type: 'taxType',
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
      const { list } = yield select(_ => _.accruedManage)
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

  },

  reducers: {

  },
})
