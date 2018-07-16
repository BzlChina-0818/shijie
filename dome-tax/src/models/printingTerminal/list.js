/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'

import {query,remove} from '../../services/printingTerminal/printingTerminal'
import { pageModel } from '../common'

// const { query } = usersService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'printingTerminal',

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
        if (location.pathname === '/printingTerminal') {
          const payload = queryString.parse(location.search) || { page: 1, pageSize: 10 }
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
      let  {page=1,pageSize=10,...other}=payload
      payload={
        page:{
          number:Number(page)-1,
          size:pageSize,
        },
        condition:other
      }
      const data = yield call(query, payload)
      let list=data.data
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list:list.content,
            pagination: {
              current: Number(payload.page.number)+1 || 1,
              pageSize: Number(payload.page.size) || 10,
              total: list.totalElenments,
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
