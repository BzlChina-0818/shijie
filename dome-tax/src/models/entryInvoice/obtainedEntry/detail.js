import pathToRegexp from 'path-to-regexp'
import {query,detail } from 'services/entryInvoice/obtainedEntry'
import queryString from "query-string";
import modelExtend from "dva-model-extend";
import {pageModel} from "../../common";
import { queryURL } from 'utils'
/**
 * @description（进项发票管理>专用发票获取>已获取进项发票管理）
 * @author linxiaonan
 * @backEnd liyue
 */
export default modelExtend(pageModel, {
  namespace: 'obtainedEntryDetail',
  state: {
    updateData: {},

  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        const pathname = location.pathname
        if ( pathname === '/entryInvoice/obtainedEntry/detail') {
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
