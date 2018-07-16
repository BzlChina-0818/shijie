import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import downloadjs from "downloadjs"
import { pageModel } from '../../common'
import { query, fileExport } from '../../../services/journal'
import { PATH } from "utils"
const path = PATH.CUSTOMER_FORM
const { prefix } = config
/**
 * @description 动态表单>输出日志
 * @author wangliang + guoqianyuan
 * @backEnd chenhao
 */
export default modelExtend(pageModel, {

  namespace: 'journal',
  state: {

  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        let { pathname,  search } = location;
        if (pathname === path + '/outJournal') {
          const { createTime , ...other } = queryString.parse(search);
          const timeRange = {
            startTime:createTime&&createTime[0]||null,
            endTime:createTime&&createTime[1]||null,
          }

          let payload =  {
            page: 1,
            pageSize: 10,
            ...timeRange,
            ...other,
          }
          dispatch({
            type: 'outJournal',
            payload,
          })
        }
      })
    }
  },

  effects: {
    * outJournal({payload = {}}, { put, call }) {
      const resData = yield call(query, payload);
      if(resData.success){
        let data = resData.data;
        yield put({
          type:"querySuccess",
          payload:{
            list: data.content,
            pagination: data.pagination,
          }
        })
      }else{
        throw resData;
      }
    },
    * onExport({payload = {}}, { put, call }) {
      const resData = yield call (fileExport, payload);
      downloadjs(resData, '税金.xlsx', "application/octet-stream");//引入插件把流文件转化为本地表格文件
    }
  },
  reducers: {

  },
})
