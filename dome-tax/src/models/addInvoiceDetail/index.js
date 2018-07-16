/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import { queryVAT } from 'services/invoiceDetail'
import { pageModel } from '../common'

const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'addInvoiceDetail',

  state: { 
    invoiceData:{}
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/addInvoiceDetail') {
          const payload = {
            formId :queryString.parse(location.search).formId //获取id
          }
          dispatch({
            type: 'queryVAT',
            payload
          })
        }
      })
    },
  },

  effects: {
    * queryVAT ({ payload = {} }, { call, put }) {
      const respData = yield call(queryVAT, payload)
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
