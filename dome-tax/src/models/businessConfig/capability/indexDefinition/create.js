import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import downloadjs from "downloadjs"
import { pageModel } from '../../../common'
import { create } from 'services/businessConfig/capability/indexDefinition'
import { PATH } from "utils"
const path = PATH.BUS_CAPABILITY

/**
 * @description 业务配置>基础能力配置>指标定义>详情
 * @author wangliang
 * @backEnd liuyigang
  */

export default modelExtend(pageModel, {

  namespace: 'definitionCreate',
  state: {
    RadioValue:'',   //区分什么类型的指标
    pageType:'',
    formData:{},
    modalInputConfig:{
      
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        let { pathname, query, search } = location;
        const locationState = queryString.parse(location.search);
        dispatch({
          type:'updateState',
          payload:{
            RadioValue:locationState.RadioValue
          }
        })
      })
    }
  },

  effects: {
    *query({ payload }, { put, call }) {
      const resData = yield call(create, payload);

    }
  },
  reducers: {
    
  },
})
