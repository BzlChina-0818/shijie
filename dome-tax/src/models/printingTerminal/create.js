import pathToRegexp from 'path-to-regexp'
import { query } from 'services/printingTerminal/printingTerminal'

export default {

  namespace: 'printingTerminalCreate',

  state: {
    data: {},
    optionStatus:'create',
    modalVisible: false,
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
}
