import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config,unix2Locale } from 'utils'

import { pageModel } from '../../common'
import { query,update,exportData,importData} from 'services/action'
import downloadjs from "downloadjs";

/**
 * @description 动态表单>功能定义
 * @author linxiaonan + guoqianyuan
 */
export default modelExtend(pageModel, {

  namespace: 'action',

  state: {
    currentItem:'',
    modalType: 'create',
    selectedRows:[],

  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/customerForm/action') {
          const {startDate, ...other} = queryString.parse(location.search)
          const timeRange = {
            startDate:(startDate&&startDate[0])||null,
            endDate:(startDate&&startDate[1])||null,
          }
          let payload={
           page:1,
           pageSize:10,
             functionCode: "",
             functionName: "",
             functionType: "",
           "sort": {
             "direction": "ASC",
             "property": "id"
           },
           ...other,
           ...timeRange
         }
          dispatch({
            type: 'query',
            payload,
          })
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
    * exportData ({ payload }, { call,put }) {
      console.log(payload);
      const{datasourceId}=payload.condition
      const data = yield call(exportData, payload)

      const fileName = `${datasourceId}.xlsx`  //暂定生成动态文件名
      downloadjs(data, fileName, "application/octet-stream");  //引入插件把流文件转化为本地表格文件
    },
   /* * importData ({ payload = {} }, { call, put }) {
      const respData = yield call(importData, payload)
      if (respData.success) {
        let data = respData.data
      }
    },*/

  },
  reducers: {
    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },
  },

})
