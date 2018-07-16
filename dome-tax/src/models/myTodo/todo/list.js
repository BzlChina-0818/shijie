/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config,unix2Locale } from 'utils'
import { remove, query } from 'services/myTodo/todo'
import { queryBiztaxList } from 'services/baseAPI'
import { pageModel } from '../../common'

import { PATH } from "utils"
import downloadjs from "downloadjs";

const path = PATH.TODO_LIST
/**
 * @description 我的待办>我的待办
 * @author guoqianyuan
 */
export default modelExtend(pageModel, {
  namespace: 'myTodoList',

  state: {
    modalVisible:false,
    taxTypeList:[]
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === path) {
          const {applyCompName, ...other} = queryString.parse(location.search)

          let payload =  {
              page: 1,
              pageSize: 10,
              // 查询字段
              ...other
          }
          dispatch({
            type: 'query',
            payload,
          })
          dispatch({
            type: 'taxType',
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
      const { list } = yield select(_ => _.myTodoList)
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

  },

  reducers: {

  },
})
