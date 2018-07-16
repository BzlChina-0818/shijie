/* global window 发票认证状态监控 */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import downloadjs from "downloadjs"
import { config } from 'utils'
import { query, fileEduce } from 'services/entryInvoice/specialCertification/certification'
import { pageModel } from '../../../common'
import { PATH } from "utils"

const { prefix } = config
const path = PATH.SPECIAL_CERTIFICATION

export default modelExtend(pageModel, {
  namespace: 'certification',

  state: {
   
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        let { pathname, query, search } = location;
        if(location.pathname === path + '/certification'){
          
          const { authDate, ...other } = queryString.parse(location.search)
          const timeRange = {
            startDate:authDate&&authDate[0]||null,
            endDate:authDate&&authDate[1]||null,
          }
          let payload = {
            page: 1,
            pageSize:10,
            ...timeRange,
            ...other,
          }
          dispatch({
            type:'query',
            payload
          })

        }
      })
    },
  },

  effects: {
    * query({payload = {}}, { call, put }) {
      const resData = yield call(query, payload)
      if (resData.success && resData.code === 1000 ) {
        let data = resData.data;
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.content,
            pagination: data.pagination,
          },
        })
      }else{
        throw resData.message;
      }
    },
    * onEduce({payload = {}}, { put, call }){
      const resData = yield call (fileEduce,payload.bizData);
      //downloadjs(resData, '发票认证状态监控.xls', "application/octet-stream");
    },
  },

  reducers: {
    
  },
})
