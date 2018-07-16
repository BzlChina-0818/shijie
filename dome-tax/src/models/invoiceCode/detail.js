import pathToRegexp from 'path-to-regexp'
import { queryId } from '../../services/invoiceCode/invoiceCodes'

export default { 

  namespace: 'invoiceCodeDetail',

  state: {
    data: {},
  },

/*  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/invoiceCode/:id').exec(pathname)
        if (match) {
          dispatch({ type: 'query', payload: { id: match[1] } })
        }
      })
    },
  },*/

  effects: {
    * query ({
               payload,
             }, { call, put }) {
      const data = yield call(queryId, payload)
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
    querySuccess (state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },
  },
}
