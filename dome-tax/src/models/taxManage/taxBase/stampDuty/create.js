/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import { create, detail, save } from 'services/taxManage/taxBase/stampDuty'
import { pageModel } from '../../../common'
import { PATH } from "utils"
const { prefix } = config
const path = PATH.TAXMANAGE_TAXBASE

export default modelExtend(pageModel, {
  namespace: 'stampDutyCreate',

  state: {
    isDetail:false,
    formData:{},
    pageType:''
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        // 非创建页面
        const { pathname, search } = location
        const locationState = queryString.parse(search)
        if( location.pathname === path + '/stampDuty/detail' ){
          dispatch({
            type: 'updateState',
            payload:{
              pageType:"detail",
              isDetail:true
            },
          })
          const payload = {
            id :locationState.id //获取id
          }
          dispatch({
            type: 'detail',
            payload,
          })
        }else if(location.pathname === path + '/stampDuty/create'){
          dispatch({
            type: 'updateState',
            payload:{
              isDetail:false
            },
          })
          dispatch({
            type: 'updateState',
            payload:{
              pageType:"create",
              formData:{}
            }
          })
        }else if(location.pathname === path + '/stampDuty/amend') {
          dispatch({
            type: 'updateState',
            payload:{
              isDetail:false,
              pageType:"amend",
            },
          })
          const payload = {
            id :locationState.id //获取id
          }
          dispatch({
            type: 'detail',
            payload,
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
    * detail ({ payload }, { call , put }) {
      const resData = yield call(detail, payload)
      if (resData.success) {
        yield put({
          type: 'updateState',
          payload:{
            formData:resData.data,
          }
        })
      } else {
        throw resData
      }
    },
    *save ({ payload }, { call , put }){
      const resData = yield call (save, payload);
      console.log(resData)
    },
  },

  reducers: {
    
  },
})
