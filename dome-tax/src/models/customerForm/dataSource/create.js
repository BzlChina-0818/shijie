import modelExtend from 'dva-model-extend'
import { PATH } from "utils"
const path = PATH.CUSTOMER_FORM
import queryString from 'query-string'

import { queryURL } from 'utils'

import { create,update,detail,unique } from 'services/dataSource'
import { pageModel } from '../../common'
/**
 * @description 动态表单>数据源管理
 * @author guoqianyuan
 */
export default modelExtend(pageModel, {

  namespace: 'dataSourceCreate',

  state: {
    formData: {},
    pageType:'create',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        // 非创建页面
        const { pathname, search } = location
        const locationState = queryString.parse(search)
        if (pathname === path+'/dataSource/update'||pathname === path+'/dataSource/detail') {
          dispatch({
            type: 'updateState',
            payload:{
              pageType:pathname.split('/')[3]
            }
          })
          const payload = {
            id :locationState.id //获取id
          }
          dispatch({
            type: 'detail',
            payload,
          })
        }else if(pathname === path+'/dataSource/create'){
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
