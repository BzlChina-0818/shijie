/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config,unix2Locale } from 'utils'
import { create, remove, update, query,exportData ,importData } from 'services/entryInvoice/invoiceEntry/registerTaxProof'
import { pageModel } from '../../../common'

import { PATH } from "utils"
import downloadjs from "downloadjs";

const path = PATH.ENTRY_INVOICE

export default modelExtend(pageModel, {
  namespace: 'registerTaxProof',

  state: {

  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === path+'/registerTaxProof') {
          let payload =  {
              page: 1,
              pageSize: 10,
              // 查询字段
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
      const data = yield call(remove, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.registerTaxProof)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
      } else {
        throw data
      }
    },

  },

  reducers: {

  },
})
