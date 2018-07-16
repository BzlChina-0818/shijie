/* global window 税金管理--房产税 */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { setAdd, setUpdate, gethouseTaxQuery } from 'services/taxManage/taxBase/houseTax'
import { config } from 'utils'
import { pageModel } from '../../../common'
import { PATH } from "utils"
const path = PATH.TAXMANAGE_TAXBASE

export default modelExtend(pageModel, {
  namespace: 'houseTaxCreate',

  state: {
    pageType: '',
    formData:{},
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        let { pathname, search } = location
        const locationState = queryString.parse(search)
        if(pathname === `${path}/house/detail` || pathname === `${path}/house/update`){
          dispatch({
            type:'updateState',
            payload:{
              pageType:pathname.split('/')[4]
            }
          })
          dispatch({
            type:'detail',
            payload:{
              id:locationState.id
            }
          })
        }else if(pathname === `${path}/house/create`){
          dispatch({
            type:'updateState',
            payload:{
              pageType:pathname.split('/')[4]
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
    * detail({payload = {}}, { call, put }) {
      const resData = yield call(gethouseTaxQuery, payload);
      if (resData.success && resData.code === 1000 ) {
        let data = resData.data;
        yield put({
          type: 'updateState',
          payload: {
            formData: data,
          },
        })
      }else{
        throw resData;
      }
    },
    * onSave({payload = {}}, { call, put }){
      let { pageType, Info, ...other } = payload;
      let resData;
      if(pageType === 'create'){
        resData = yield call(setAdd,  other);;
      }
      if(pageType === 'update'){
        resData = yield call(setUpdate,  other);
      }
      return resData;
    }
  },

  reducers: {
    setFromData(state, { payload }){
      return { ...state,  formData:{
        ...state.formData,
        groupName:payload.taxPayer,
        ...payload
      }}
    }
  },
})
