/* global window 发票认证状态监控 */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import downloadjs from "downloadjs"
import { query, everyDelete, fileEduce, batchesDelete, getCopy } from 'services/taxManage/taxBase/houseTax'
import { config } from 'utils'
import { pageModel } from '../../../common'
import { PATH } from "utils"
const path = PATH.TAXMANAGE_TAXBASE

/**
 * @description (税金管理>税基管理>房产税)
 * @author wangliang
 * @backEnd lijinkai
 */ 

export default modelExtend(pageModel, {
  namespace: 'houseTax',

  state: {
    IdsArr:[],    // 存储列表id
    pageType: '',
    modalInputConfig :{
      BatchesDelete:{
        title:'请选择期间纳税主体',
        listUrl:batchesDelete,
        filterConfig:[
          {
            label:'所属期间',
            formName:'period',
            type:'3',
          },
          {
            label:'纳税主体',
            formName:'taxPayerNo',
            type:'4',
            typeName: 'taxPayer'
          },
        ],
      },
      copySection:{
        title:'请选择新的区间',
        filterConfig:[
          {
            label:'所属期间',
            formName:'period',
            type:'3',
          },
        ],
      }
    },
    formData:{},
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        let { pathname, query, search } = location;
        if(location.pathname === path + '/house'){
          let payload = {
            page: 1,
            pageSize:10,
            ...queryString.parse(location.search),
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
        throw resData;
      }
    },
    * onDelete({payload = {}}, { call, put }){
      let { message, ...other } = payload
      let resData = yield call(everyDelete, other);
      return resData;      
    },
    *onCopy({payload = {}}, { call, put }){
      let { onMessage, ...other } = payload;
      let resData = yield call(getCopy, other);
      if(resData.success && resData.code === 1000){
        onMessage('复制成功')
      } else {
        onMessage(resData.message)
      }
    },
    * onExport({payload = {}}, { call, put }){
      let { exportData } =  payload
      const resData = yield call (fileEduce, exportData);
      downloadjs(resData, '税基管理房产税.xls', "application/octet-stream");
    }, 
    * onBatchesDelete({payload = {}}, { call, put }){
      let { bizData } = payload
      const resData = yield call(batchesDelete,{bizData})
      return resData;
    },
  },

  reducers: {
    setFormData(state,{ payload }){
      return { ...state, formData:{
        ...state.formData,
        ...payload,
      }}
    },
  },
})
