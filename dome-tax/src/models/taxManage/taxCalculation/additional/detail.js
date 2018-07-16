import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { pageModel } from '../../../common'


import { PATH } from "utils"
const path = PATH.TAX_CALCULATION

import { detail } from 'services/taxManage/taxCalculation/additional'

/*
 * @description 税金管理>税金计算>附加税
 * @author linxiaonan
 * @backEnd lijinkai
 */
// itemType
export default modelExtend(pageModel, {

  namespace: 'additionalDetail',

  state: {
    detailData: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        // 非创建页面
        const { pathname, search } = location
        const locationState = queryString.parse(search)
        if (pathname === path+'/additional/detail') {
          const payload = {
            formId :locationState.formId
          }
          dispatch({
            type: 'detail',
            payload,
          })
        }
      })
    },
  },

  effects: {


    * detail ({ payload }, { call, put }) {
      const data = yield call(detail, payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload:{
            detailData:data.data,
          }
        })
      } else {
        throw data
      }
    },

  },

  reducers: {

  },
})
