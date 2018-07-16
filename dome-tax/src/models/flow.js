import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import {config} from 'utils'
import * as usersService from 'services/flows'
import {pageModel} from './common'
import {create, remove, update, issue} from 'services/flow'

const {query} = usersService
const {prefix} = config


export default modelExtend(pageModel, {

  namespace: 'flow',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname === '/flow') {
          let payload =
            {
              "bizData": {"name": "", "key": "", "desc": ""}
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
    * query({
              payload = {},
            }, {call, put}) {
      const data = yield call(query, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.page.content,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      } else {
        throw data
      }
    },

    * delete({payload}, {call, put, select}) {
      const data = yield call(remove, {id: payload})
      const {selectedRowKeys} = yield select(_ => _.flow)

      if (data.success) {

        yield put({type: 'updateState', payload: {selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload)}})
      } else {
        throw data
      }
    },

    * create({payload}, {call, put}) {
      const data = yield call(create, payload)
      console.log(data)
      if (data.success) {
        yield put({type: 'hideModal'})
      } else {
        throw data
      }
    },
    * issue({payload}, {call, put}) {
      const data = yield call(issue, payload)
      if (data.success) {
        //console.log(data)
      } else {
        throw data
      }
    },


  },
  reducers: {
    issue(state, {payload}) {
      return {...state, ...payload, modalVisible: false}
    },

    showModal(state, {payload}) {
      return {...state, ...payload, modalVisible: true}
    },

    hideModal(state) {
      return {...state, modalVisible: false}
    },


    querySuccess(state, {payload}) {
      const {list, pagination} = payload
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }
    },
  },
})
