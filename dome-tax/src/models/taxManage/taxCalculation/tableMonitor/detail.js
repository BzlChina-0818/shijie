import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { pageModel } from '../../../common'


import { PATH } from "utils"
const path = PATH.TAX_CALCULATION

import { detail } from 'services/taxManage/taxCalculation/stampDuty'

/*
 * @description 业务配置>基础信息配置>计算表计提配置管理>详情
 * @author sunxianlu
 * @backEnd wangweiqiang
 */

// itemType
export default modelExtend(pageModel, {

  namespace: 'taxCalculationStampDutyDetail',

  state: {
    detailData: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        // 非创建页面
        const { pathname, search } = location
        const locationState = queryString.parse(search)
        // if (pathname === path+'/stampDuty/detail') {
        //   const payload = {
        //     formId :locationState.formId
        //   }
        //   dispatch({
        //     type: 'detail',
        //     payload,
        //   })
        // }
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
