import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { pageModel } from '../../../common'


import { PATH } from "utils"
const path = PATH.BUS_BASEINFO

import { create, update, detail } from 'services/businessConfig/baseInfo/calculateAccruedCfg'
import { getBiztaxFormType, queryBiztaxList, getDict } from 'services/baseAPI'

/**
 * @description 业务配置>基础信息配置>计算表计提配置管理
 * @author guoqianyuan
 */

// itemType
export default modelExtend(pageModel, {

  namespace: 'calculateAccruedCfgCreate',

  state: {
    formData: {},
    pageType:'create',
    modalInputConfig : {},
    detailDatas: [],
    count: 1,
    detailList: [],
    modalVisible:"",
    taxTypeList:[], // 税种列表
    taxFormTypeList:[], //表类型列表
    coaType:"",//BizCoaModal类型
    currentCoaTypeInput:"", //当前触发bizCoaModal的input框
    taxItemTypeList:[], //税目类型列表
    isMoney:false
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        // 非创建页面
        const { pathname, search } = location
        const locationState = queryString.parse(search)
        if (pathname === path+'/calculateAccruedCfg/update'||pathname === path+'/calculateAccruedCfg/detail') {
          dispatch({
            type: 'updateState',
            payload:{
              pageType:pathname.split('/')[4]
            }
          })
          if(pathname === path+'/calculateAccruedCfg/update'){
            dispatch({
              type: 'taxType',
            })
            dispatch({
              type: 'getDict',
              payload: {
                dictId:'itemType'
              }
            })
          }
          const payload = {
            id :locationState.id
          }
          dispatch({
            type: 'detail',
            payload,
          })
        }else if(pathname === path+'/calculateAccruedCfg/create'){
          dispatch({
            type: 'taxType',
          })
          dispatch({
            type: 'getDict',
            payload: {
              dictId:'itemType'
            }
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
    // 税种
    * taxType ({}, { call, put }) {
      const data = yield call(queryBiztaxList)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload:{
            taxTypeList:data.data
          }
        })
      } else {
        throw data
      }
    },
    // 表类型
    * taxFormType ({payload}, { call, put }) {
      const data = yield call(getBiztaxFormType,payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload:{
            taxFormTypeList:data.data
          }
        })
      } else {
        throw data
      }
    },
    // 字典
    * getDict ({payload}, { call, put }) {
      const data = yield call(getDict,payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload:{
            taxItemTypeList:data.data
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
