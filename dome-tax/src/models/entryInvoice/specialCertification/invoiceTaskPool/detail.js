/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils' 
import {queryId} from 'services/entryInvoice/invoiceEntry/registInvoiceInformation'
import {getDict} from 'services/baseAPI'
import { taxPayer,partner } from 'services/standardData'
import { pageModel } from '../../../common'

import { PATH } from "utils"
const path = PATH.ENTRY_INVOICE

export default modelExtend(pageModel, {
  namespace: 'invoiceTaskPoolDetail',
  state: {
    formData: {}, 
  },
  subscriptions: { 
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const { pathname, state } = location
        const locationState = queryString.parse(state)
        // 非创建页面 
        if (pathname === '/entryInvoice/specialCertification/invoiceTaskPool/detail') {
          dispatch({
            type: 'queryId',
            payload:{
              formId :locationState.id
            }
          })
        }
      })
    },
  },

  effects: {
    * queryId ({ payload = {} }, { call, put }) {
      const respData = yield call(queryId, payload)
      if (respData.success) {
        let data = respData.data
        yield put({
          type: 'updateState',
          payload: {
            formData:data
          },
        })
      }
    },
  },
  reducers: {
    
  },
})
