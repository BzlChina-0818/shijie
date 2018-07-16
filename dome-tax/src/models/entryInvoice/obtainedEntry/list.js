import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import {config} from 'utils'

import {pageModel} from '../../common'
import {
  query, update, exportData,
} from 'services/entryInvoice/obtainedEntry'
import { queryTaxpayerBody,querySalesUnit,getDict } from 'services/baseAPI'

import downloadjs from "downloadjs";

/**
 * @description（进项发票管理>专用发票获取>已获取进项发票管理）
 * @author linxiaonan
 * @backEnd liyue
 */
export default modelExtend(pageModel, {

  namespace: 'obtainedEntry',

  state: {
    modalVisible: "",


    invoiceTypeList: [],
    onStreamlineFlag: {
      flag: true,
      btnText: '更多检索'
    },
    filterData:{},
    currentCoaTypeInput:"",


  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname === '/entryInvoice/obtainedEntry') {
          const {startDate,startImportDate,startAuthDate, ...other} = queryString.parse(location.search)
          //需要修改的点
          const timeRange = {
            startDate: startDate && startDate[0] || null,
            endDate: startDate && startDate[1] || null,
            startImportDate: startImportDate && startImportDate[0] || null,
            endImportDate: startImportDate && startImportDate[1] || null,
            startAuthDate: startAuthDate && startAuthDate[0] || null,
            endAuthDate: startAuthDate && startAuthDate[1] || null,
          }

          let payload = {
            page: 1,
            pageSize: 10,
            invoiceCode: null,
            invoiceNum: null,
            salesNum: null,
            invoiceType: null,
            purchaseNum: null,
            registerStatus: null,
            authStatus: null,

            "sort": {
              "direction": "ASC",
              "property": ""
            },
            ...other,
            ...timeRange,
          }
          dispatch({
            type: 'query',
            payload,
          }).then(
            dispatch({
              type: 'getDict',
              payload:{
                dictId:'invoiceType'
              }
            })
          )
        }
      })
    },
  },

  effects: {
    * query({payload = {}}, {call, put}) {
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
      }
    },
    //导出
    * exportData({payload}, {call, put}) {
      const data = yield call(exportData, {...payload})
      const fileName = `已获取发票查询.xlsx`
      downloadjs(data, fileName, "application/octet-stream");
    },

//字典
    * getDict ({payload}, { call, put }) {
      const data = yield call(getDict,payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload:{
            invoiceTypeList:data.data
          }
        })
      } else {
        throw data
      }
    },
  },
  reducers: {
    showModal(state, {payload}) {
      return {...state, ...payload, modalVisible: true}
    },

    hideModal(state) {
      return {...state, modalVisible: false}
    },
    selectSuccess (state, { payload }){
      return {
        ...state,
        filterData: {
          ...state.filterData,
          ...payload,
        },
      }
    },
    //折叠按钮
    onStreamline(state) {
      return {
        ...state,
        onStreamlineFlag: {
          flag: !state.onStreamlineFlag.flag,
          btnText: state.onStreamlineFlag.flag ? '精简检索' : '更多检索'
        }
      };
    }
  },

})
