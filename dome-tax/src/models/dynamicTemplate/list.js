/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import Lodash from 'lodash'
import { config, queryURL } from 'utils'
import { create, remove, update, query, getConfig } from 'services/dynamicTemplate'
import commonModel from './common'

import { PATH } from "utils"
const path = PATH.DYNAMIC_TEMPLATE
/**
 * @description 动态表单>动态模版实现
 * @author guoqianyuan
 */
export default modelExtend(commonModel, {
  namespace: 'dynamicTemplate',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === path) {
          //todod 根据search中的数据源类型请求配置信息

          dispatch({
            type: 'getConfig',
          }).then((tableConfig) => {
            // 整理查询关键词
            let {params} = tableConfig
            const locationSearch = queryString.parse(location.search)
            params=Lodash(params,{isShow:"1"})
            let filterParams = params.map(item =>{
              return {
                paramCode:item.parameterCode,
                paramValue:locationSearch[item.parameterCode]||null
              }
            })

            //todo 请求对应数据源列表接口
            let payload =  {
              page: 1,
              pageSize: 10,
              // 查询字段
              condition:filterParams||[],
              tableName:queryURL("tableName"),
              ...queryString.parse(location.search)
            }
            dispatch({
              type: 'query',
              payload,
            })
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
      const { selectedRowKeys } = yield select(_ => _.dynamicTemplate)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
      } else {
        throw data
      }
    },

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
