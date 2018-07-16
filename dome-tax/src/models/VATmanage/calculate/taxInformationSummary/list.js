/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config,unix2Locale } from 'utils'
import { remove, query } from 'services/VATmanage/calculate/taxInformationSummary'
import { pageModel } from '../../../common'
import {getDict } from 'services/baseAPI'
import { PATH } from "utils"
import downloadjs from "downloadjs";

const path = PATH.VAT_CALCULATE
/**
 * @description 增值税管理>增值税计算>增值税纳税信息表汇总
 * @author linxiaonan
 * @backEnd  liyue
 */
export default modelExtend(pageModel, {
  namespace: 'taxInformationSummary',

  state: {
    modalVisible:false,
    selectedRows:[],
    tableTypeList:[],
    reportedList:[],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === path+'/taxInformationSummary') {
          const {createTime, ...other} = queryString.parse(location.search)

          let payload =  {
              page: 1,
              pageSize: 10,
              // 查询字段
            period:null,
            applyDate:null,
            tableType:null,
            reported:null,
            ...other
          }
          dispatch({
            type: 'query',
            payload,
          })
          dispatch({
            type: 'getDictTableType',
            payload: {
              dictId:'tableType'
            }
          })
          dispatch({
            type: 'getDictReported',
            payload: {
              dictId:'reported'
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

    * delete ({ payload }, { call, put, select }) {
      const data = yield call(remove, { id: payload })
      const { list } = yield select(_ => _.taxInformationSummary)
      if (data.success) {
        yield put({ type: 'updateState', payload: { list: list.filter(_ => _.id !== payload) } })
      } else {
        throw data
      }
    },
    * getDictTableType ({ payload = {} }, { call, put }) {
      const data = yield call(getDict, payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload:{
            tableTypeList:data.data,
          }
        })
      } else {
        throw data
      }
    },
    * getDictReported ({ payload = {} }, { call, put }) {
      const data = yield call(getDict, payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload:{
            reportedList:data.data,
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
