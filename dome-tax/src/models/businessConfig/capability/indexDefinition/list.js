import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import downloadjs from "downloadjs"
import { pageModel } from '../../../common'
import { query, create } from '../../../../services/businessConfig/capability/indexDefinition'
import { PATH } from "utils"
const path = PATH.BUS_CAPABILITY

/**
 * @description 业务配置>基础能力配置>指标定义
 * @author wangliang
 * @backEnd liuyigang
  */

export default modelExtend(pageModel, {

  namespace: 'indexDefinition',
  state: {
    pageType:'',
    modalInputConfig:{
      create:{
        title:'指标选择',
        listUrl:create,
        filterConfig:[
          {
            type:'5',
            formName:"period",
            Radios:[
              {
                id:'1',
                text:"基本指标"
              },
              {
                id:'2',
                text:"公式指标"
              },
              {
                id:'3',
                text:"手工指标"
              },
            ]
          },
        ]
      }
    },
    formData:{}
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        let { pathname, search } = location;
        if (pathname === path + '/indexDefinition') {
          let payload =  {
            page:1,
            pageSize: 10,
            ...queryString.parse(search),
          }
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    }
  },

  effects: {
    * query({payload = {}}, { put, call }) {
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
  },
  reducers: {
    setFormData(state,{ payload }){
      return { ...state, formData:{
        ...state.formData,
        ...payload,
      }}
    },
    clearFormData(state,{ payload }){
      state.formData[payload.name] = '';
      return { ...state}
    }
  },
})
