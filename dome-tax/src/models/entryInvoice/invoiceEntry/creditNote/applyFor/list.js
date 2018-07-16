import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config,unix2Locale } from 'utils'

import { pageModel } from '../../../../common'
import { queryApplyFor} from 'services/entryInvoice/invoiceEntry/creditNote'
import { PATH } from "utils"
import { queryTaxpayerBody,querySalesUnit } from 'services/baseAPI'

import downloadjs from "downloadjs";
const path = PATH.ENTRY_INVOICE
/**
 * @description（进项发票管理>发票录入>红字发票申请）
 * @author linxiaonan
 * @backEnd wangweiqiang
 */
export default modelExtend(pageModel, {

  namespace: 'applyFor',

  state: {
    modalVisible: '',
    filterData:{},
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === path+'/creditNote/applyFor') {
          const {createTime,salesDeptName, ...other} = queryString.parse(location.search)
          //需要修改的点
             const timeRange = {
               startMakeDate:createTime&&createTime[0]||null,
               endMakeDate:createTime&&createTime[1]||null,
             }
          let payload={
            invoiceCode: "",
            invoiceNum: "",
            salesTaxPayerNo: "",
            ...other,
            ...timeRange
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
      const respData = yield call(queryApplyFor, payload)
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
        filterData: {
          ...state.filterData,
          ...payload,
        },
      }
    }
  },

})
