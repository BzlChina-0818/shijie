/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import downloadjs from "downloadjs"
import { config } from 'utils'
import { getQuery, fileEduce } from 'services/entryInvoice/inquiryStatistics/statusWarning'
// import { getQuery } from 'services/entryInvoice/inquiryStatistics/statusWarning'
import { pageModel } from '../../../common'
import { PATH } from "utils"
const { prefix } = config
const path = PATH.INQUIRY_STATISTICS

/**
 * @description（进项发票管理>查询统计>发票状态跟踪及预警）
 * @author wangliang
 * @backEnd lijinkai
 */

export default modelExtend(pageModel, {
  namespace: 'statusWarning',

  state: {
    pageType:'',
    /* 控制折叠 */
    onStreamlineFlag:{
      flag:true,
      btnText:'更多检索'
    },
    formData:{},
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        let { pathname, query, search } = location;

        if(location.pathname === path + '/statusWarning'){
          let { purchaseName, salesName, atteTime, ...other } = queryString.parse(search)
          let timeRange = {
            startVerifierTime:atteTime && atteTime[0] || null,
            endVerifierTime:atteTime && atteTime[1] || null,
          }
          let payload = {
            "page": 1,
            "pageSize": 10,
            "condition": {
              ...timeRange,
              ...other,
            }
          }

          dispatch({
            type:'query',
            payload,
          })
        }
      })
    },
  },

  effects: {
    *query({ payload }, { call , put }){
      let resData = yield call(getQuery, payload);
      let data = resData.data
      if(resData.success){
        yield put({
          type:"querySuccess",
          payload:{
            list:data.content,
            pagination: data.pagination,
          }
        })
      } else {
        throw data
      }
    },
    * onEduce({payload = {}}, { put, call }){
      const resData = yield call (fileEduce,payload);
      //downloadjs(resData, '发票认证状态监控.xls', "application/octet-stream");
    },
  },

  reducers: {
    onStreamline(state){
      return { ...state,
        onStreamlineFlag:{
          flag:!state.onStreamlineFlag.flag,
          btnText:state.onStreamlineFlag.flag ? '精简检索' : '更多检索'
      }};
    },
    InputSearch(state,{ payload }){
      return { ...state, formData:{
        ...state.formData,
        ...payload,
      }}
    }
  },
})
