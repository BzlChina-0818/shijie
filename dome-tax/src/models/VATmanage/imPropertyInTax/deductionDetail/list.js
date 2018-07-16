/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config,unix2Locale } from 'utils'
//import { query } from 'services/VATmanage/imPropertyInTax/deductionDetail'
import { pageModel } from '../../../common'

import { PATH } from "utils"
import downloadjs from "downloadjs";

/**
 * @description 增值税管理>不动产进项税管理>分期抵扣明细
 * @author wangliang
 */
export default modelExtend(pageModel, {
  namespace: 'deductionDetail',

  state: {
   
  },

  subscriptions: {
    setup ({ dispatch, history }) {
     /*  history.listen((location) => {
        if (location.pathname === path+'/deductionDetail') {
          let payload =  {
              page: 1,
              pageSize: 10,
              // 查询字段
              groupNo:null,
              status:null,
              // sort: {
              //   "direction": "DESC",
              //   "property": "id"
              // },
              ...queryString.parse(location.search)
          }
          dispatch({
            type: 'query',
            payload,
          })
        }
      }) */
    },
  },

  effects: {

    * query ({ payload = {} }, { call, put }) {
      /* const respData = yield call(query, payload)
      if (respData.success) {
        let data = respData.data
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.content,
            pagination: data.pagination,
          },
        })
      } */
    },


  },

  reducers: {
    
  },
})
