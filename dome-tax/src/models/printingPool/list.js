/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'

import {query,remove} from 'services/printingPool'
import { pageModel } from '../common'

// const { query } = usersService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'printingPool',

  state: {
    currentItem: {},
    modalVisible: false,
    // modalType: 'create',
    selectedRows: [],
    printingName:'',
    // isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/printingPool') { 
          let page={number: 0, size: 10}
          const newPage=queryString.parse(location.search)
          if(newPage.page){
              page.number=Number(newPage.page)-1
              page.size=Number(newPage.pageSize)
          }
          // const payload = queryString.parse(location.search) || { page: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload:{
              "sort":{
                "direction":"asc",
                "property":"startTime"
              },
              page:page
            }
          })
        }
      })
    },
  },

  effects: {
    * query ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload)
      let list = data.data
      console.log(list)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: list.content,
            pagination: {
              current: Number(payload.page.number)+1 || 1,
              pageSize: Number(payload.page.size) || 10,
              total: list.totalElements,
            },
          },
        })
      }
    },

    * delete ({ payload }, { call, put, select }) {
      const data = yield call(remove, { id: payload })
      // const { selectedRowKeys } = yield select(_ => _.user)
      if (data.success) {
        yield put({ type: 'updateState', payload: { id: payload } })
      } else {
        throw data
      }
    },

    // * multiDelete ({ payload }, { call, put }) {
    //   const data = yield call(usersService.remove, payload)
    //   if (data.success) {
    //     yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
    //   } else {
    //     throw data
    //   }
    // },

    // * create ({ payload }, { call, put }) {
    //   const data = yield call(create, payload)
    //   if (data.success) {
    //     yield put({ type: 'hideModal' })
    //   } else {
    //     throw data
    //   }
    // },

    // * update ({ payload }, { select, call, put }) {
    //   const id = yield select(({ user }) => user.currentItem.id)
    //   const newUser = { ...payload, id }
    //   const data = yield call(update, newUser)
    //   if (data.success) {
    //     yield put({ type: 'hideModal' })
    //   } else {
    //     throw data
    //   }
    // },

  },

  reducers: {

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state,{ payload }) {
      return { ...state,...payload, modalVisible: false }
    },

    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
