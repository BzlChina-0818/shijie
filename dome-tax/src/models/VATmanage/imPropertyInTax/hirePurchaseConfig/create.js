import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { pageModel } from '../../../common'


import { PATH } from "utils"
const path = PATH.VAT_IMPROPERTYINTAX

import { create, update, detail, generate } from 'services/VATmanage/imPropertyInTax/hirePurchaseConfig'
/**
 * @description 增值税管理>不动产进项税管理>分期抵扣配置
 * @author guoqianyuan
 */
export default modelExtend(pageModel, {

  namespace: 'hirePurchaseConfigCreate',

  state: {
    formData: {},
    pageType:'create',
    modalInputConfig : {},
    detailDatas: [],
    count: 1,
    detailList: [],
    modalVisible:false,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        // 非创建页面
        const { pathname, search } = location
        const locationState = queryString.parse(search)
        if (pathname === path+'/hirePurchaseConfig/update'||pathname === path+'/hirePurchaseConfig/detail') {
          dispatch({
            type: 'updateState',
            payload:{
              pageType:pathname.split('/')[3]
            }
          })
          const payload = {
            housedutyCode :locationState.housedutyCode
          }
          dispatch({
            type: 'detail',
            payload,
          })
        }else if(pathname === path+'/hirePurchaseConfig/create'){
          dispatch({
            type: 'generate',
          })
          dispatch({
            type: 'updateState',
            payload:{
              pageType:"create",
              formData:{}
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
        return data
      } else {
        throw data
      }
    },

    * update ({ payload }, { call }) {
      const data = yield call(update, payload)
      if (data.success) {
        return data
      } else {
        throw data
      }
    },

    * detail ({ payload }, { call, put }) {
      const data = yield call(detail, payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload:{
            formData:data.data,
            detailDatas: data.data.detailList
          }
        })
      } else {
        throw data
      }
    },
    // 唯一数据源名称
    * generate ({ }, { call, put }) {
      const data = yield call(generate)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload:{
            formData:{
              housedutyCode:data.data
            },
          }
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
    selectSuccess (state, { payload }){
      return {
        ...state,
        formData: {
          ...state.formData,
          ...payload,
        },
      }
    }
  },
})
