/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import { detailList } from 'services/entryInvoice/inquiryStatistics/statusWarning'
import { pageModel } from '../../../common'
import { PATH } from "utils"

const { prefix } = config
const path = PATH.INQUIRY_STATISTICS

/**
 * @description（进项发票管理>查询统计>发票状态跟踪及预警>详情）
 * @author wangliang
 * @backEnd lijinkai
 */

export default modelExtend(pageModel, {
  namespace: 'statusWarningDetail',

  state: {
    formData:{}
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        let { pathname } = location
        let formId = location.pathname.split('/')[5];
        if(pathname === `${path}/statusWarning/detail/${formId}`){
          dispatch({
            type:'query',
            payload:{
              formId:parseInt(formId)
            }
          })
        }
      })
    },
  },

  effects: {
    *query({ payload }, { call, put }){
      let resData = yield call(detailList, payload)
      let data = resData.data;
      if(resData.success && resData.code === 1000){
         yield put({
          type:'updateState',
          payload:{
            formData:data
          }
        }) 
      } else {
        throw resData.message;
      }
    }
  },

  reducers: {
    
  },
})
