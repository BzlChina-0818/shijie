/* global window 发票认证状态监控 */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import downloadjs from "downloadjs"
//import { query, everyDelete } from 'services/taxManage/taxBase/houseTax'
import { config } from 'utils'
import { pageModel } from '../../../common'
import { PATH } from "utils"
const path = PATH.TAXMANAGE_TAXBASE

export default modelExtend(pageModel, {
  namespace: 'houseTax',

  state: {
   
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        let { pathname, query, search } = location;
        if(location.pathname === path + '/houseTax'){
          const { authDate, ...other } = location.state || { authDate: null }
          const timeRange = {
            startVerifierTime:authDate&&authDate[0]||null,
            endVerifierTime:authDate&&authDate[1]||null,
          }
          let payload = {
            "page": {
              "number": "0",
              "size": "10"
            },
            "sort": {
              "direction": "ASC",
              "property": ""
            },
            "condition": {
              //...timeRange,
              //...other
            }
          }
          /* dispatch({
            type:'query',
            payload
          }) */

        }
      })
    },
  },

  effects: {
    * query({payload = {}}, { call, put }) {
     /*  const resData = yield call(query, payload)

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
        throw respData;
      } */
    },
    * onDelete({payload = {}}, { call, put }){
      /* console.log(payload)
      let resData = yield call(everyDelete,payload);
      console.log(resData) */
    } 
  },

  reducers: {
    
  },
})
