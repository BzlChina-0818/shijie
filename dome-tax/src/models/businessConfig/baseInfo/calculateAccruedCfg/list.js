/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config,unix2Locale } from 'utils'
import { remove, query, exportData } from 'services/businessConfig/baseInfo/calculateAccruedCfg'
import { queryBiztaxList } from 'services/baseAPI'

import { pageModel } from '../../../common'

import { PATH } from "utils"
import downloadjs from "downloadjs";

const path = PATH.BUS_BASEINFO

/**
 * @description 业务配置>基础信息配置>计算表计提配置管理
 * @author guoqianyuan
 */
export default modelExtend(pageModel, {
  namespace: 'calculateAccruedCfg',

  state: {
    modalVisible:"",
    currentCoaTypeInput:"",
    taxTypeList:[],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === path+'/calculateAccruedCfg') {

          let payload =  {
              page: 1,
              pageSize: 10,
              // 查询字段
              taxPayerNo:null,
              taxNo:null,
              drSegCode:null,
              crSegCode:null,
              ...queryString.parse(location.search)
          }
          dispatch({
            type: 'query',
            payload,
          })
          dispatch({
            type: 'taxType',
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
      const data = yield call(remove, { housedutyCode: payload })
      const { list } = yield select(_ => _.calculateAccruedCfg)
      if (data.success) {
        yield put({ type: 'updateState', payload: { list: list.filter(_ => _.housedutyCode !== payload) } })
      } else {
        throw data
      }
    },

    // 税种
    * taxType ({}, { call, put }) {
      const data = yield call(queryBiztaxList)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload:{
            taxTypeList:data.data
          }
        })
      } else {
        throw data
      }
    },

    * exportData ({ payload }, { call }) {
      const data = yield call(exportData, {...payload})
      const fileName = `计算表计提配置.xlsx`   //暂定文件名
      downloadjs(data, fileName, "application/octet-stream");
    },

  },

  reducers: {

  },
})
