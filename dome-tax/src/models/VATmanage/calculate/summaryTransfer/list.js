/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config,unix2Locale } from 'utils'
import { remove, query, sum, update, exportData } from 'services/VATmanage/calculate/summaryTransfer'
import { pageModel } from '../../../common'

import { PATH } from "utils"
import downloadjs from "downloadjs";

const path = PATH.VAT_CALCULATE
/**
 * @description 增值税管理>增值税计算>增值税汇总传递单
 * @author guoqianyuan
 * @backEnd chenhao
 */
export default modelExtend(pageModel, {
  namespace: 'summaryTransfer',

  state: {
    modalVisible:false,
    sumModalVisible:false,
    selectedRows:[],
    sumFormData:{}
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === path+'/summaryTransfer') {
          let payload =  {
              page: 1,
              pageSize: 10,
              // 查询字段
              period:null,
              taxPayerNo:null,
              isSum:null,
              transferType:null,
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
      const data = yield call(remove, { id: payload })
      const { list } = yield select(_ => _.summaryTransfer)
      if (data.success) {
        yield put({ type: 'updateState', payload: { list: list.filter(_ => _.id !== payload) } })
      } else {
        throw data
      }
    },

    * exportData ({ payload }, { call,put }) {
      const data = yield call(exportData, payload)
      const fileName = `增值税传递单取数规则查询.xlsx`   //暂定文件名
      downloadjs(data, fileName, "application/octet-stream");
    },

    * sum ({ payload }, { call, put }) {
      const data = yield call(sum, payload)
      if (data.success) {
        return data
      } else {
        throw data
      }
    },

    * update ({ payload }, { call, put }) {
      const data = yield call(update, payload)
      if (data.success) {
        return data
      } else {
        throw data
      }
    },

  },

  reducers: {

  },
})
