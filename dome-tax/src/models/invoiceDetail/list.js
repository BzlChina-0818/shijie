/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
// import { create, remove, update, query } from 'services/outputFormat'
import { pageModel } from '../common'
const { prefix } = config
export default modelExtend(pageModel, {
  namespace: 'invoiceDetail',

  state: { 
    modalType: 'create',
    selectedRowKeys: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        // if (location.pathname === '/customerForm/outputFormat') {
        //   let payload =  {
        //       page: 1,
        //       pageSize: 10,
        //       // 查询字段
        //       isvalId:null,
        //       dataColCode:null,
        //       dataColCode:null,
        //       createTime:null,
        //       ...queryString.parse(location.search),
        // //   }
        //   dispatch({
        //     type: 'query',
        //     payload,
        //   })
        // }
      })
    },
  },

  effects: {

    // * query ({ payload = {} }, { call, put }) {
    //   const respData = yield call(query, payload)
    //   if (respData.success) {
    //     let data = respData.data
    //     yield put({
    //       type: 'querySuccess',
    //       payload: {
    //         list: data.content,
    //         pagination: data.pagination,
    //       },
    //     })
    //   }
    // },
  },

  reducers: {

  },
})
