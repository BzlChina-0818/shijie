import pathToRegexp from 'path-to-regexp'
import {applyForDetail,save,submitNext,send,updateFormstatus } from 'services/entryInvoice/invoiceEntry/creditNote'
import {taskuser,submit } from 'services/workFlow'

import queryString from "query-string";
import modelExtend from "dva-model-extend";
import {pageModel} from "../../../../common";
import { queryURL } from 'utils'
import { PATH } from "utils"
const path = PATH.ENTRY_INVOICE
/**
 * @description（进项发票管理>发票录入>红字发票申请）
 * @author linxiaonan
 * @backEnd wangweiqiang
 */
export default modelExtend(pageModel, {
  namespace: 'applyForDetail',
  state: {
    formData: {},
    pageType:'create',
    isDisabled:false,

    modalVisible:false,
    isSave:false,
    workData:{},
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        const pathname = location.pathname
        if ( pathname === path + '/creditNote/applyFor/detail') {
          const payload = {
            id :queryURL('id'), //获取id
          }
          dispatch({
            type: 'detail',
            payload,
          }).then(data => {
            dispatch({
              type: 'updateState',
              payload:{
                formData:data,
              }
            })
          })
        }
      })

    },
  },

  effects: {
    * detail ({ payload }, { call }) {
      const data = yield call(applyForDetail, payload)
      if (data.success) {
        return data.data
      } else {
        throw data
      }
    },
    * create ({ payload }, { call }) {
      const data = yield call(save, payload)
      if (data.success) {
        return data
      } else {
        throw data
      }
    },

    /*发送*/
    * send ({ payload }, { call }) {
      const data = yield call(taskuser, payload)
      if (data.success) {
        return data
      } else {
        throw data
      }
    },
    /*提交下一步*/
    * submitNext ({ payload }, { call }) {
      const data = yield call(submit, payload)
      if (data.success) {
        return data
      } else {
        throw data
      }
    },
    /*修改红字发票申请单审核状态*/
    * updateFormstatus ({ payload }, { call }) {
      const data = yield call(updateFormstatus, payload)
      if (data.success) {
        return data
      } else {
        throw data
      }
    },
  },
  reducers: {

    showModal(state, {payload}) {
      return {...state, ...payload, modalVisible: true}
    },

    hideModal(state) {
      return {...state, modalVisible: false}
    },
  }
})
