/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config,unix2Locale } from 'utils'
import { query,remove } from 'services/taxManage/taxCalculation/stampDuty'
import { pageModel } from '../../../common'
import { PATH } from "utils"

const path = PATH.TAX_CALCULATION

/*
 * @description 业务配置>基础信息配置>计算表计提配置管理
 * @author sunxianlu
 * @backEnd wangweiqiang
 */
export default modelExtend(pageModel, {
  namespace: 'taxCalculationStampDuty',

  state: {
    modalVisible:"",
    currentCoaTypeInput:"",
    selectedRowKeys:[]
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === path+'/stampDuty') {
          let payload =  {
              page: 1,
              pageSize: 10,
              // 查询字段
              period:null,
              taxPayerNo:null,
              formStatus:null,
              profsnlId:null,
              ...queryString.parse(location.search)
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
      const respData = yield call(query, payload)
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
        const data = yield call(remove, {ids:payload })
        const { selectedRowKeys } = yield select(_ => _.taxCalculationStampDuty)
        if (data.success) {
          yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
        } else {
          throw data
        }
      },
  },

  reducers: {

  },
})
