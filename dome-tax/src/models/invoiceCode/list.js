import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'

import { pageModel } from '../common'


import {remove, query, queryCity, queryProvince} from '../../services/invoiceCode/invoiceCodes'
const { prefix } = config

 
export default modelExtend(pageModel, {

  namespace: 'invoiceCode',

  state: {
    currentItem:'',
    modalVisible: false,
    modalType: 'create',
    selectedRows:[],
    printingName:'',
    provinceData:[],
    cityData:[],

  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/invoiceCode') {
          let payload ={
            page:1,
            pageSize:10,
            oinvoiceType: null,
            amtLimit: null,
            oinvoiceCode: null,
            typeName:null,
            invoiceLocation: null,
            ...queryString.parse(location.search)
          }
          dispatch({
            type: 'query',
            payload,
          }).then(
            dispatch({
              type:'queryProvince',
              payload,
            })
          )
      }
      })
    },
  },

  effects: {
    * query ({
               payload = {},
             }, { call, put }) {
      const respData = yield call(query, payload)

      if (respData.success) {
        let data = respData.data
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.content,
            pagination: data.pagination,
          },
        })
      } else {
        throw data
      }

    },

    * delete ({ payload }, { call, put, select }) {
      const data = yield call(remove, { id: payload })

      const { selectedRowKeys } = yield select(_ => _.invoiceCode)
      if (data.success) {

        yield put({
          type: 'updateState',
          payload: {selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) },
        })
      } else {
        throw data
      }
    },
   /* * create ({ payload }, { call, put }) {
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'create' })
      } else {
        throw data
      }
    },*/
    * queryProvince({payload},{call,put}){
      const provinceData=yield call(queryProvince,payload)

      const {
        success, message, status, ...other
      } = provinceData
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
    
    * queryCity({payload},{call,put}){
      const cityData=yield call(queryCity,payload)
      if (cityData.success) {
        yield put({
          type: 'updateState',
          payload: {
            cityData:cityData.data
          },
        })
      } else {
        throw cityData
      }
    }
  },
  reducers: {

    showModal (state, { payload }) {
      return {
        ...state, ...payload,
        modalVisible: true,
      }
    },

    hideModal (state) {
      return {
        ...state,
        modalVisible: false,
      }
    },
    },

})
