
import {detail,save,updateFormstatus} from 'services/entryInvoice/invoiceEntry/creditNote'

import modelExtend from "dva-model-extend";
import {pageModel} from "../../../../common";
import { queryURL } from 'utils'
import { PATH } from "utils"
const path = PATH.ENTRY_INVOICE
/**
 * @description（进项发票管理>发票录入>红字发票申请查询）
 * @author linxiaonan
 * @backEnd wangweiqiang
 */
export default modelExtend(pageModel, {
  namespace: 'inquireDetail',
  state: {
    formData: {},
    pageType:'create',
    isDisabled:false,

    modalVisible:false,
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        const pathname = location.pathname
        if ( pathname === path + '/creditNote/inquire/detail'||pathname === path + '/creditNote/inquire/update') {
          const payload = {
            id :queryURL('id'), //获取id
          }
          dispatch({
            type: 'updateState',
            payload:{
              pageType:pathname.split('/')[5]
            }
          })
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
      const data = yield call(detail, payload)
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
