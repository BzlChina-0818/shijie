/* global window */
/**
 * @description 发票录入>登记信息发票>发票批查询与修改
 * 
 * @author sunxianlu
 */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import { create, remove, update, query } from 'services/entryInvoice/invoiceEntry/registInvoiceInformation'
import { taxPayer,partner } from 'services/standardData'
import { pageModel } from '../../../common'

import { PATH } from "utils"
const path = PATH.ENTRY_INVOICE
export default modelExtend(pageModel, {
  namespace: 'registInvoiceInformation',
  state: {
    modalVisible: '',
    selectedRowKeys: [],
    formData:{},
    pathType:''
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const { pathname, state } = location
        if (pathname === path+'/registInvoiceInformation'||pathname === path+'/registerTaxProof') {
          const {createTime, ...other} = queryString.parse(location.search)
          const timeRange = {
            applyStartDate:createTime&&createTime[0]||null,
            applyEndDate:createTime&&createTime[1]||null,
          }
          let payload = {
              page: 1,
              pageSize: 10,
              // 查询字段
              ...timeRange,
              ...other
          }
          dispatch({
            type: 'query',
            payload,
          })
          dispatch({
            type: 'updateState',
            payload:{
              pathType:pathname.split('/')[3],
            }
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
      const data = yield call(remove, { formId: payload })
      const { selectedRowKeys } = yield select(_ => _.registInvoiceInformation)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
      } else {
        throw data
      }
    },

  },

  reducers: {
    showModal (state, { payload }) {
      console.log(state, payload);
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
