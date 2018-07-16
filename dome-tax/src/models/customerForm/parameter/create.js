import pathToRegexp from 'path-to-regexp'
import {query,create ,update,detail } from 'services/parameter'
import queryString from "query-string";
import modelExtend from "dva-model-extend";
import {pageModel} from "../../common";
import { queryURL } from 'utils'
import { PATH } from "utils"
const path = PATH.CUSTOMER_FORM

/**
 * @description 动态表单>参数逻辑
 * @author linxiaonan + guoqianyuan
 */
export default modelExtend(pageModel, {
  namespace: 'parameterCreate',
  state: {
    updateData: {},
    pageType:'create',
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        const {pathname,search} = location
        const locationState = queryString.parse(search)

        if (pathname === path + '/parameter/update' || pathname === path + '/parameter/detail') {
          const payload = {
            id :locationState.id //获取id
          }
          dispatch({
            type: 'detail',
            payload,
          }).then(data => {
            dispatch({
              type: 'updateState',
              payload:{
                updateData:data,
                pageType:location.pathname.split('/')[3]
              }
            })
          })
        }else if(pathname === path + '/parameter/create'){
          dispatch({
            type: 'updateState',
            payload:{
              pageType:"create",
              updateData:{}
            }
          })
        }
      })

    },
  },

  effects: {

    * create({payload}, {call}) {
      const data = yield call(create, payload)
      if (data.success) {
        return data
      } else {
        throw data
      }
    },
     * update ({ payload}, {call }) {
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
  },
  reducers: {}
})
