import pathToRegexp from 'path-to-regexp'
import { get } from '../../../services/journal/details'
import { PATH } from "utils"
const path = PATH.CUSTOMER_FORM
/**
 * @description 动态表单>输出日志
 * @author wangliang + guoqianyuan
 * @backEnd chenhao
 */
export default {

  namespace: 'journalDetailModels',

  state: {

  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        let jdId = location.pathname.split('/')[3];
        if(location.pathname === `${path}/journalLog/${jdId}`){
          dispatch({
            type: 'journalLog',
            payload:{
              jdId
            }
          })
        }
      })
    },
  },

  effects: {
    *journalLog({ payload = {} }, { put, call }){
      const resData = yield call(get,payload);
      if(resData.success){
        let data = resData.data;
        yield put({
          type:"querySuccess",
          payload:{
            jDetails:data
          }
        })
      }else{
        throw data;
      }
    }
  },

  reducers: {
    querySuccess(state, { payload }){
      let { jDetails } = payload
      return {
        ...state,
        jDetails
      }
    }
  },
}
