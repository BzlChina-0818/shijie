import pathToRegexp from 'path-to-regexp'
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import Lodash from 'lodash'

import { PATH, queryURL } from "utils"
const path = PATH.DYNAMIC_TEMPLATE

import { create,update,detail } from 'services/dynamicTemplate'
import commonModel from './common'
/**
 * @description 动态表单>动态模版实现
 * @author guoqianyuan
 */
export default modelExtend(commonModel, {

  namespace: 'dynamicTemplateCreate',

  state: {
    formData: {},
    pageType:'create',
    formConfig: [],
    location: {}
  },

  subscriptions: {
    setup (params) {
      console.log(params)
      const { dispatch, history } = params
      history.listen((location) => {
        dispatch({
          type: 'updateState',
          payload:{
            location,
          }
        })
        // console.log(location)
        const pathname = location.pathname
        if ( pathToRegexp(`${path}/(create|update|detail)`).exec(pathname)) {
          //todod 根据search中的数据源类型请求配置信息
          // const tableName = queryURL("tableName")
          // dispatch({
          //   type: "updateState",
          //   payload: {
          //     tableName
          //   }
          // })
          dispatch({
            type: 'getConfig',
          }).then(() => {
            let pathnameArr = pathname.split('/')

            // 判断新增、修改、详情页面
            if(pathToRegexp(`${path}/create`).exec(pathname)){
              dispatch({
                type: 'updateState',
                payload:{
                  formData: {},
                  pageType: pathnameArr[pathnameArr.length-1],
                }
              })
            }else{
              dispatch({
                type: 'detail',
              }).then(data => {
                dispatch({
                  type: 'updateState',
                  payload: {
                    formData: data||{id:queryURL('id')},
                    pageType: pathnameArr[pathnameArr.length-1],
                  }
                })
              })
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

    * detail ({}, { call, select }) {
      const {PKid,tableName} = yield select((_) => _.dynamicTemplateCreate )
      // console.log(PKid,tableName)
      const payload = {
        pId: PKid,
        pValue: queryURL('id'), //获取id
        tableName: queryURL('tableName')
      }
      console.log(payload)
      const data = yield call(detail, payload)
      if (data.success) {
        return data.data
      } else {
        throw data
      }
    },
  },

  reducers: {

  },
})
