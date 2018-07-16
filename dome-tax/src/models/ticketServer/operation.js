
import pathToRegexp from 'path-to-regexp'
//import { query } from '../../services/user'
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { pageModel } from '../common'

export default modelExtend(pageModel, {

  namespace: 'ticketServerOperation',

  state: {
    optionType:'creat',
    modalVisible: false,
    terminalList:[],
    terminal:{}
  },
  subscriptions: {
    setup ({ dispatch, history }) {
        history.listen((location) => {
            const query=queryString.parse(location.query)
            const queryOption=queryString.parse(location.query).optionType
            if (location.pathname === `/ticketServer/${queryOption}`) { 
              dispatch({
                type: 'updateState',
                payload:{
                    optionType:queryOption,
                    terminal:query
                }
              })
            }
          })
    },
  },

  effects: {
    * query ({
      payload,
    }, { call, put }) {
      const data = yield call(query, payload)
      const {
        success, message, status, ...other
      } = data
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: other,
          },
        })
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

