import pathToRegexp from 'path-to-regexp'
import { query,create ,update} from '../../services/invoiceCode/details'
import { queryProvince,queryCity } from '../../services/invoiceCode/invoiceCodes'
import queryString from "query-string";
import modelExtend from "dva-model-extend";
import {pageModel} from "../common";
//import { query } from '../../services/user'
export default modelExtend(pageModel,{
  namespace: 'invoiceCodeCreate',

  state: {
    data: {},
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    optionStatus:'create',
    selectedRowKeys: [],
    provinceData:[],
    cityData:[],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/invoiceCode/create') {
          const payload = queryString.parse(location.search) || {
            page: 1,
            pageSize: 10,
          }
          dispatch({
              type:'queryProvince',
              payload,
            })
        }
      })
    },
  },

  effects: {
    * query ({
      payload,
    }, { call, put }) {
      //call 发起异步请求,触发query,payload传参
      const data = yield call(query, payload)
      const {
        success, message, status, ...other
      } = data
      if (success) {
        //用put去触发一个同步请求reducer,type reducer中,payload参数
        yield put({
          type: 'querySuccess',
          payload: {
            data: other,
          },
        })
        //select 去select中进行查找
      } else {
        throw data
      }
    },
    * create ({ payload }, { call, put }) {
      const data = yield call(create, payload)

    },
   /* * update ({ payload }, { select, call, put }) {
      const id = yield select(({ invoiceCode }) => invoiceCode.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(update, newUser)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },*/
    /*新增中获取省*/
    * queryProvince({payload},{call,put}){
      const provinceData=yield call(queryProvince,payload)
      if (provinceData) {
        yield put({
          type: 'updateState',
          payload: {
            provinceData:provinceData.data,
          },
        })
      } else {
        throw provinceData
      }
    },
    /*新增中获取市*/
    * queryCity({payload},{call,put}){
      const cityData=yield call(queryCity,payload)
      console.log(cityData);
      if (cityData.success) {
        yield put({
          type: 'updateState',
          payload: {
            cityData:cityData.data
          }
        })
      } else {
        throw cityData
      }
    }
  },

  reducers: {

  }
})
