import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import {config, unix2Locale} from 'utils'

import {pageModel} from '../../../../common'
import {queryInquire,remove,} from 'services/entryInvoice/invoiceEntry/creditNote'

import {PATH} from "utils"
/**
 * @description（进项发票管理>发票录入>红字发票申请查询）
 * @author linxiaonan
 * @backEnd wangweiqiang
 */

const path = PATH.ENTRY_INVOICE
export default modelExtend(pageModel, {
  namespace: 'inquire',
  state: {
    modalVisible: '',
    filterData:{},
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname === path + '/creditNote/inquire') {
          const {createTime,salesDeptName, ...other} = queryString.parse(location.search)
          //需要修改的点
             const timeRange = {
               startTime:createTime&&createTime[0]||null,
               endTime:createTime&&createTime[1]||null,
             }
          console.log(other);
          let payload = {
            redApplyNum: "",
            salesTaxPayerNo: "",
            ...other,
              ...timeRange,
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
    * query({payload = {}}, {call, put}) {
      const respData = yield call(queryInquire, payload)
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
      const data = yield call(remove, { id: payload.id })
      if (data.success) {
        yield put({ type: 'updateState', payload: { id: payload } })
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
        filterData: {
          ...state.filterData,
          ...payload,
        },
      }
    }
  },

})
