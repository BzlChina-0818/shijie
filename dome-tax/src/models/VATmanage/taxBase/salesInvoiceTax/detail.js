import pathToRegexp from 'path-to-regexp'
import {query,detail } from 'services/VATmanage/taxBase/salesInvoiceTax'
import queryString from "query-string";
import modelExtend from "dva-model-extend";
import {pageModel} from "../../../common";
import { queryURL } from 'utils'
import { PATH } from "utils"
const path = PATH.VAT_TAXBASE

/**
 * @description（增值税管理>增值税税基管理>销项发票税基）
 * @author linxiaonan
 * @backEnd chenhao
 */
export default modelExtend(pageModel, {
  namespace: 'salesInvoiceTaxDetail',
  state: {
    updateData:{},
    pageType:'create',

  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        const pathname = location.pathname
        if ( pathname === path + '/salesInvoiceTax/detail') {
          const payload = {
            id :queryURL('id') //获取id
          }
          dispatch({
            type: 'detail',
            payload,
          }).then(data => {
            dispatch({
              type: 'updateState',
              payload:{
                updateData:data,
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
  },
  reducers: {}
})
