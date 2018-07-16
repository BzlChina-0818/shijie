import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config,unix2Locale } from 'utils'
import { pageModel } from '../../../common'
import { query,update,exportData,queryTaxpayerListModal,queryFormStatus,remove} from 'services/VATmanage/calculate/VATCalculationSheet'
import { queryTaxpayerBody,querySalesUnit,getDict } from 'services/baseAPI'

import { PATH } from "utils"
import downloadjs from "downloadjs";
const path = PATH.VAT_CALCULATE
/**
 * @description（增值税管理>增值税计算>增值税销项基础表）
 * @author linxiaonan
 * @backEnd lijinkai
 */
export default modelExtend(pageModel, {

  namespace: 'VATCalculationSheet',

  state: {

    formStatusList:[],
    selectedRowKeys:[],
    modalVisible:"",
    currentCoaTypeInput:"",
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === path+'/outputTable'||location.pathname === path+'/incomeTable') {
          const {createTime,taxPayer, ...other} = queryString.parse(location.search)

          let payload={
            period: "",
            formStatus:"",
            taxPayerNo:"",
            "sort": {
              "direction": "ASC",
              "property": ""
            },
            ...other,
          }
          dispatch({
            type: 'query',
            payload,
          }).then(
            dispatch({
              type: 'getDict',
              payload:{
                dictId:'formStatus'
              }
            })
          )
        }
      })
    },
  },

  effects: {
    * query ({ payload = {} }, { call, put }) {

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

    * delete ({ payload }, { call, put, select }) {

      const data = yield call(remove, { id: payload })
      if (data.success) {
        yield put({ type: 'updateState', payload: { id: payload } })
      } else {
        throw data
      }
    },
    //字典
    * getDict ({payload}, { call, put }) {
      const data = yield call(getDict,payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload:{
            formStatusList:data.data
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
