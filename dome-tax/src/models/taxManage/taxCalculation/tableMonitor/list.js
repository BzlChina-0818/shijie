/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config,unix2Locale } from 'utils'
import { query,remove } from 'services/taxManage/taxCalculation/stampDuty'
import {getDict} from 'services/baseAPI'
import { pageModel } from '../../../common'
import { PATH } from "utils"

const path = PATH.TAX_CALCULATION

/*
 * @description 业务配置>基础信息配置>计算表计提配置管理
 * @author sunxianlu
 * @backEnd wangweiqiang
 */
export default modelExtend(pageModel, {
  namespace: 'taxCalculationTableMonitor',

  state: {
    modalVisible:"",
    currentCoaTypeInput:"",
    selectedRowKeys:[],
    taxNos:[],
    deaconTypes:[],
    deaconResults:[]
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === path+'/tableMonitor') {
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
          dispatch({
            type: 'getTaxNO',
            payload:{
                dictId:'taxNo'
            }
          })
          dispatch({
            type: 'getDeaconTypes',
            payload:{
                dictId:'deaconType'
            }
          })
          dispatch({
            type: 'getDeaconResults',
            payload:{
                dictId:'deaconResult'
            }
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
    //获取税种类型
    * getTaxNO ({ payload = {} }, { call, put }) {
    const data = yield call(getDict, payload)
      if (data.success) {
      yield put({
          type: 'updateState',
          payload:{
            taxNos:data.data,
          }
      })
      } else {
      throw data
      }
    },
    //执行状态
    * getDeaconTypes ({ payload = {} }, { call, put }) {
    const data = yield call(getDict, payload)
      if (data.success) {
      yield put({
          type: 'updateState',
          payload:{
            deaconTypes:data.data,
          }
      })
      } else {
      throw data
      }
    },
    //运行结果
    * getDeaconResults ({ payload = {} }, { call, put }) {
    const data = yield call(getDict, payload)
      if (data.success) {
      yield put({
          type: 'updateState',
          payload:{
            deaconResults:data.data,
          }
      })
      } else {
      throw data
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
