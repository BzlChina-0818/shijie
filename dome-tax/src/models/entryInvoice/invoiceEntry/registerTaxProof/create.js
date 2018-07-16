import modelExtend from 'dva-model-extend'
import { PATH } from "utils"
const path = PATH.IINV
import queryString from 'query-string'

import { queryURL } from 'utils'

import { create,update,detail,unique } from 'services/entryInvoice/invoiceEntry/registerTaxProof'
import { pageModel } from '../../../common'

export default modelExtend(pageModel, {

  namespace: 'registerTaxProofCreate',

  state: {
    formData: {},
    pageType:'create',
    modalInputConfig : {
    },
    isSave:false,  //当前页面是否保存过
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        // 非创建页面
        const { pathname, search } = location
        const locationState = queryString.parse(search)
        if (pathname === path+'/registerTaxProof/update'||pathname === path+'/registerTaxProof/detail') {
          dispatch({
            type: 'updateState',
            payload:{
              pageType:pathname.split('/')[3],
              isSave:false
            }
          })
          const payload = {
            id :locationState.id //获取id
          }
          dispatch({
            type: 'detail',
            payload,
          })
        }else if(pathname === path+'/registerTaxProof/create'){
          dispatch({
            type: 'updateState',
            payload:{
              pageType:"create",
              formData:{},
              isSave:false
            }
          })
        }
      })
    },
  },

  effects: {

    * create ({ payload }, { call }) {
      const data = yield call(create, payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload:{
            isSave:true,
          }
        })
        return data
      } else {
        throw data
      }
    },

    * update ({ payload }, { call, put }) {
      const data = yield call(update, payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload:{
            isSave:true,
          }
        })
        return data
      } else {
        throw data
      }
    },

    * detail ({ payload }, { call , put }) {
      const data = yield call(detail, payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload:{
            formData:data.data,
          }
        })
      } else {
        throw data
      }
    },
    // 唯一数据源名称
    * uniqueData ({ payload }, { call }) {
      const data = yield call(unique, payload)
      if (data.success) {
        return data
      } else {
        throw data
      }
    },
  },

  reducers: {

  },
})
