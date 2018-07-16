/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config,unix2Locale } from 'utils'
//import { query } from 'services/VATmanage/imPropertyInTax/deductionDetail'
import { pageModel } from '../../../common'

import { PATH } from "utils"
import downloadjs from "downloadjs";
const path = PATH.VAT_DECLARE;
/**
 * @description 增值税管理>增值税申报
 * @author wangliang
 */
export default modelExtend(pageModel, {
  namespace: 'declareForm',

  state: {
   formData:{},
   /* 判断是汇总还是纳税 */
   present:'',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        
        if (location.pathname === path+'/consolidatedReturn') {
          dispatch({
            type:'updateState',
            payload:{
              present:location.pathname.split('/')[3]
            }
          })
          let payload =  {
              page: 1,
              pageSize: 10,
              ...queryString.parse(location.search)
          }
          dispatch({
            type: 'query',
            payload,
          })
        } else if(location.pathname === path+'/taxReturn'){

          dispatch({
            type:'updateState',
            payload:{
              present:location.pathname.split('/')[3]
            }
          })
          
        }
      })
    },
  },

  effects: {

    * query ({ payload = {} }, { call, put }) {
      /* const respData = yield call(query, payload)
      if (respData.success) {
        let data = respData.data */
      let data = [
        {
          id:1,
          housedutyCode:'123',
          groupName:'哈哈哈',
          status:'asjsjs'
        }
      ]
        yield put({
          type: 'querySuccess',
          payload: {
            list: data,
            //pagination: data.pagination,
          },
        })
      //}
    },


  },

  reducers: {
    
  },
})
