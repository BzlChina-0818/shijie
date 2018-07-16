import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config,unix2Locale } from 'utils'

import { pageModel } from '../../common'
import { query,update} from 'services/parameter'
const { prefix } = config

/**
 * @description 动态表单>参数逻辑
 * @author linxiaonan + guoqianyuan
 */
export default modelExtend(pageModel, {

  namespace: 'parameter',

  state: {
    currentItem:'',
    modalType: 'create',
    optionStatus:'update',
    selectedRows:[],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/customerForm/parameter') {
          const {createTime, ...other} = queryString.parse(location.search)
          const timeRange = {
            startTime:(createTime&&createTime[0])||null,
            endTime:(createTime&&createTime[1])||null,
          }
         let payload={
           page:1,
           pageSize:10,
           parameterCode: null,
           parameterName: null,
           parameterType:null,
           startTime:null,
           endTime:null,
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

  },
  reducers: {

  },

})
