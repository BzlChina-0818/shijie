import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { pageModel } from '../../../common'


import { PATH } from "utils"
const path = PATH.VAT_TAXBASE

import { saveAndUpdate, detail } from 'services/VATmanage/taxBase/planPayment'
/**
 * @description 增值税管理>税基管理>预收款明细管理详情
 * @author guoqianyuan
 */
export default modelExtend(pageModel, {

  namespace: 'planPaymentDetail',

  state: {
    formData: {},
    pageType:'detail',
    modalInputConfig : {},
    detailDatas: [],
    count: 1,
    detailList: [],
    modalVisible:false,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        // 非创建页面
        const { pathname, search } = location
        const locationState = queryString.parse(search)
        if (pathname === path+'/planPayment/detail') {
          dispatch({
            type: 'updateState',
            payload:{
              pageType:pathname.split('/')[3]
            }
          })
          const payload = {
            id :locationState.id
          }
          dispatch({
            type: 'detail',
            payload,
          })
        }
      })
    },
  },

  effects: {

    * saveAndUpdate ({ payload }, { call }) {
      const data = yield call(saveAndUpdate, payload)
      if (data.success) {
        return data
      } else {
        throw data
      }
    },

    * detail ({ payload }, { call, put }) {
      const data = yield call(detail, payload)
      if (data.success) {
        const dataList = data.data
        yield put({
          type: 'updateState',
          payload:{
            formData:dataList,
            detailDatas: dataList.detailList.map((item,index)=>{
               return {...item,key:index+1}
            }),
            count: dataList.detailList.length+1
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
