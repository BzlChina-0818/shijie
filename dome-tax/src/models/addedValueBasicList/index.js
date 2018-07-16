/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import { queryAddInvoice } from 'services/invoices'
import { pageModel } from '../common'

const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'addedValueBasicList',

  state: {
    invoiceData:{}
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/addedValueBasicList') {
          const payload = {
            formId :queryString.parse(location.state).formId //获取id
          }
          dispatch({
            type: 'queryAddInvoice',
            payload
          })
        }
      })
    },
  },

  effects: {
    * queryAddInvoice ({ payload = {} }, { call, put }) {
      const respData = yield call(queryAddInvoice, payload)
      if (respData.success) {
        let data = respData.data
        yield put({
          type: 'updateState',
          payload: {
            invoiceData:data
          },
        })
      }
    },
  },

  reducers: {

  },
})
