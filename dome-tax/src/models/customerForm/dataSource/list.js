/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config,unix2Locale } from 'utils'
import { create, remove, update, query,exportData ,importData } from 'services/dataSource'
import { pageModel } from '../../common'

import { PATH } from "utils"
import downloadjs from "downloadjs";

const path = PATH.CUSTOMER_FORM
/**
 * @description 动态表单>数据源管理
 * @author guoqianyuan
 */
export default modelExtend(pageModel, {
  namespace: 'dataSource',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],

  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === path+'/dataSource') {
          const {createTime, ...other} = queryString.parse(location.search)
          const timeRange = {
            startTime:createTime&&createTime[0]||null,
            endTime:createTime&&createTime[1]||null,
          }
          let payload =  {
              page: 1,
              pageSize: 10,
              // 查询字段
              isValid:null,
              datasourceCode:null,
              datasourceName:null,
              ...timeRange,
              ...other
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
      const data = yield call(remove, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.dataSource)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
      } else {
        throw data
      }
    },

    * exportData ({ payload }, { call,put }) {
      //const{datasourceId}=payload.condition
      const data = yield call(exportData, payload)
      const fileName = `数据源.xlsx`   //暂定文件名
      downloadjs(data, fileName, "application/octet-stream");
    },
/*    * importData ({ payload = {} }, { call, put }) {
      console.log(payload)
      const respData = yield call(importData, payload)
      if (respData.success) {
        let data = respData.data
        console.log(data)
      }
    },*/

  },

  reducers: {

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

  },
})
