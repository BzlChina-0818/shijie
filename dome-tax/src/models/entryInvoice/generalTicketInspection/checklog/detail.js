import pathToRegexp from 'path-to-regexp'
import {query,detail } from 'services/entryInvoice/checklog'
import queryString from "query-string";
import modelExtend from "dva-model-extend";
import {pageModel} from "../../../common";
import { queryURL } from 'utils'
import { PATH } from "utils"
const path = PATH.GENERAL_TICKET_INSPECTION
/**
 * @description（进项发票管理>普票查验>普调查验日志）
 * @author linxiaonan
 * @backEnd   chenhao
 */

export default modelExtend(pageModel, {
  namespace: 'checklogDetail',
  state: {
    updateData: {},
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        const pathname = location.pathname
        if ( pathname === path + '/checklog/detail') {
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
