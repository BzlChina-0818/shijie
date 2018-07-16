/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import { query } from 'services/entryInvoice/specialCertification/invoiceTaskPool'
import { query as standardEntry } from 'services/entryInvoice/standardEntry'
import { pageModel } from '../../../common'

import { PATH } from "utils"
const path = PATH.SPECIAL_CERTIFICATION

export default modelExtend(pageModel, {
  namespace: 'invoiceTaskPool',
  state: {
    currentItem: {},
    modalVisible: '',
    modalType: 'create',
    selectedRowKeys: [],
    formData:{},
    choiceModalInput:"",
    modal:{},
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        console.log(location.pathname)
        if (location.pathname === path+'/invoiceTaskPool') {
          const {createTime, ...other} = queryString.parse(location.search)
          const timeRange = {
            startPeriod:createTime&&createTime[0]||null,
            endPeriod:createTime&&createTime[1]||null,
          }
          const {applyCompName,salesTaxPayer,...other1}=other   //剔除单位名称与公司名称 用识别号去查询
          let payload =  {
              page: 1,
              pageSize: 10,
              // 查询字段
              ...timeRange,
              ...other1
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
