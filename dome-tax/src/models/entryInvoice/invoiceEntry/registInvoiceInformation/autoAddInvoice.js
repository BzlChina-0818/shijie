/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils' 
import { queryAutoInvoice,autoSave} from 'services/entryInvoice/invoiceEntry/registInvoiceInformation'
import { taxPayer,partner } from 'services/standardData'
import { pageModel } from '../../../common'
import { PATH } from "utils"

export default modelExtend(pageModel, {
  namespace: 'autoAddInvoice',
  state: {
    formData: {},
    selectedIds:[]
  },
  subscriptions: { 
    setup ({ dispatch, history }) {
      history.listen((location) => { 
        //登记信息发票自动添加
        if (location.pathname === '/entryInvoice/invoiceEntry/registInvoiceInformation/autoAddInvoice') {
          const {createTime, ...other} = queryString.parse(location.search)
          const timeRange = {
            startTime:createTime&&createTime[0]||null,
            endTime:createTime&&createTime[1]||null,
          }
          let payload = {
              page: 1,
              pageSize: 10,
              // 查询字段
              // ...other,
              // ...timeRange
          }
          dispatch({
            type: 'queryAutoInvoice',
            payload,
          })
        }
      })
    },
  },
  effects: {
    * queryAutoInvoice ({ payload = {} }, { call, put }) {
      const respData = yield call(queryAutoInvoice, payload)
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
    //保存或修改
    * autoSave ({ payload }, { call }) {
        const data = yield call(autoSave, payload)
        if (data.success) {
          return data
        } else {
          throw data
        }
    },
  },

  reducers: {
   
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
