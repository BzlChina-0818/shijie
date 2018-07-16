import pathToRegexp from 'path-to-regexp'
import modelExtend from 'dva-model-extend'
import { queryURL } from 'utils'
// import { create,update,detail } from 'services/outputFormat'
import { pageModel } from '../common'
export default modelExtend(pageModel, {
  namespace: 'invoiceDetailCreate',

  state: {
    formData: {},
    pageType:'create',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        // 非创建页面
        // if (location.pathname !== '/outputFormat/create') {
        //   const payload = {
        //     id :queryURL('id') //获取id
        //   }
        //   dispatch({
        //     type: 'detail',
        //     payload,
        //   }).then(data => {
        //     console.log(data)
        //     dispatch({
        //       type: 'updateState',
        //       payload:{
        //         formData:data,
        //         pageType:location.pathname.split('/')[3]
        //       }
        //     })
        //   })
        // }else{
        //   dispatch({
        //     type: 'updateState',
        //     payload:{
        //       pageType:"create"
        //     }
        //   })
        // }
      })
    },
  },

  effects: {

    // * create ({ payload }, { call }) {
    //   const data = yield call(create, payload)
    //   if (data.success) {
    //     return data
    //   } else {
    //     throw data
    //   }
    // },

    // * update ({ payload }, { call }) {
    //   const id=queryURL('id')
    //   const newUser = { ...payload, id }
    //   const data = yield call(update, newUser)
    //   if (data.success) {
    //     return data
    //   } else {
    //     throw data
    //   }
    // },

    // * detail ({ payload }, { call }) {
    //   const data = yield call(detail, payload)
    //   if (data.success) {
    //     return data.data
    //   } else {
    //     throw data
    //   }
    // },
  },

  reducers: {

  },
})
