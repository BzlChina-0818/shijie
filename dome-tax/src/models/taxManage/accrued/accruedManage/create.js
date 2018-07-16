import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { pageModel } from '../../../common'

import { PATH } from "utils"
const path = PATH.TAX_ACCRUED

import { create, update, detail, generate } from 'services/taxManage/accrued/accruedManage'
/**
 * @description 税金管理>税金计提>计提管理
 * @author guoqianyuan
 */
export default modelExtend(pageModel, {

  namespace: 'taxFeeAccruedManageCreate',

  state: {
    formData: {},
    pageType:'create',
    modalVisible:false,
    detailDatas:[],
    count:0,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        // 非创建页面
        const { pathname, search } = location
        const locationState = queryString.parse(search)
        if (pathname === path+'/manage/update'||pathname === path+'/manage/detail') {
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
        }else if(pathname === path+'/manage/create'){
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

  },
})
