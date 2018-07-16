/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
//import { create, remove, update } from 'services/user'
import {query,remove} from '../../services/ticketServer/index'
import { pageModel } from '../common'

// const { query } = usersService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'ticketServer',

  state: {
    currentItem: {},
    modalVisible: false,
    // modalType: 'create',
    selectedRows: [],
    filterObject:{},
    // isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: { 
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/ticketServer') {
          const payload = queryString.parse(location.search) || { page: 1, pageSize: 10 }
          //console.log(payload)
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
    //  console.log(payload)
    let {page=1, pageSize=10, ...other} = payload
    //  payload ={
    //     page:{
    //       number:page,
    //       size:pageSize,
    //     },
    //     condition:other
    //   }
      const data = yield call(query, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
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
  },
})
