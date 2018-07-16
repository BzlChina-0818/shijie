import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config,unix2Locale } from 'utils'

import { pageModel } from '../../../common'
import { query,update,exportData} from 'services/entryInvoice/checklog'

import { PATH } from "utils"
import downloadjs from "downloadjs";

/*
 * @description（进项发票管理>普票查验>普调查验日志）
 * @author linxiaonan
 * @backEnd   chenhao
 */

const path = PATH.GENERAL_TICKET_INSPECTION
export default modelExtend(pageModel, {

  namespace: 'checklog',

  state: {
    filterData:{},
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === path+'/checklog') {
          const {createTime, ...other} = queryString.parse(location.search)
          //需要修改的点
          const timeRange = {
            startTime:createTime&&createTime[0]||null,
            endTime:createTime&&createTime[1]||null,
          }
          let payload={
            id: "",
            invoiceCode: "",
            invoiceNumber:"",
            applyUser:"",
            status:"",
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
    * exportData ({ payload }, { call }) {
      const data = yield call(exportData, {...payload})
      const fileName = `普通发票查验日志管理.xlsx`   //暂定文件名
      downloadjs(data, fileName, "application/octet-stream");
    },
  },
  reducers: {

  },

})
