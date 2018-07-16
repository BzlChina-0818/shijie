import pathToRegexp from 'path-to-regexp'
import modelExtend from 'dva-model-extend'
import { queryURL } from 'utils'
import { PATH } from "utils"
import queryString from 'query-string'
const path = PATH.CUSTOMER_FORM
import { create,update,detail,unique } from 'services/outputFormat'
import { pageModel } from '../../common'

/**
 * @description 动态表单>输出格式
 * @author sunxianlu + guoqianyuan
 */
export default modelExtend(pageModel, {
  namespace: 'outputFormatCreate',
  state: {
    formData: {},
    pageType:'create',
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const pathname = location.pathname
        // 非创建页面
        if (pathname === path+'/outputFormat/update'||pathname === path+'/outputFormat/detail') {
          const payload = {
            id :queryString.parse(location.search).id //获取id
          }
          console.log(payload)
          dispatch({
            type: 'detail',
            payload,
          }).then(data => {
            dispatch({
              type: 'updateState',
              payload:{
                formData:data,
                pageType:location.pathname.split('/')[3]
              }
            })
          })
        }else if(pathname===path+"/outputFormat/create"){
          dispatch({
            type: 'updateState',
            payload:{
              pageType:"create",
              formData:{},
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

    * detail ({ payload }, { call }) {
      const data = yield call(detail, payload)
      if (data.success) {
        return data.data
      } else {
        throw data
      }
    },
    // 唯一数据列名称
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
