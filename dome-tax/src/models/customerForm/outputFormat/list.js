/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config,unix2Locale} from 'utils'
import { create, remove, update, query,exportData ,importData} from 'services/outputFormat'
import { pageModel } from '../../common'
import downloadjs from "downloadjs"
const { prefix } = config
/**
 * @description 动态表单>输出格式
 * @author sunxianlu + guoqianyuan
 */
export default modelExtend(pageModel, {
  namespace: 'outputFormat',

  state: {
    modalType: 'create',
    selectedRowKeys: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/customerForm/outputFormat') {
          const {createTime, ...other} = queryString.parse(location.search)
          const timeRange = {
            startTime:(createTime&&createTime[0])||null,
            endTime:(createTime&&createTime[1])||null,
          }
          let payload = {
              page: 1,
              pageSize: 10,
              // 查询字段
              isValid:null,
              dataColCode:null,
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
      const{datasourceId}=payload.condition
      const data = yield call(exportData, payload)
    　const fileName = `${datasourceId}.xlsx`  //暂定生成动态文件名
      downloadjs(data, fileName, "application/octet-stream");//引入插件把流文件转化为本地表格文件
    }
  },
  reducers: {

  },
})
