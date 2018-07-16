
import pathToRegexp from 'path-to-regexp'
//import { query } from '../../services/user'
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { pageModel } from '../common'

export default modelExtend(pageModel, {

  namespace: 'ticketServerCreate',

  state: {
    optionStatus:'creat',
    modalVisible: false,
    terminalList:[],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      // const payload = queryString.parse(location.search)
      // if(payload.optionStatus==='update'){
      //   history.listen(({ pathname }) => {
      //     if (location.pathname === '/printingPool/create') {
      //       // const payload = queryString.parse(location.search).optionStatus
      //       // dispatch({
      //       //   type: 'query',
      //       //   payload,
      //       // })
      //     }
      //   })
      // } 
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

