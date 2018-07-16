/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import downloadjs from "downloadjs"
import { config } from 'utils'
import { query, fileEduce, batchesDelete, everyDelete } from 'services/taxManage/taxBase/stampDuty'
import { pageModel } from '../../../common'
import { PATH } from "utils"
const { prefix } = config
const path = PATH.TAXMANAGE_TAXBASE

export default modelExtend(pageModel, {
  namespace: 'stampDuty',

  state: {
    onStreamlineFlag:{
      flag:true,
      btnText:'更多检索'
    },
    IdsArr:[],
    pageType:'',
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
    },
    formData:{}
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        let { pathname, query, search } = location;
        if(location.pathname === path + '/stampDuty'){
          let payload = {
            page: 1,
            pageSize:10,
           ...queryString.parse(location.search)
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
    *query({ payload }, { call , put }){
      let resData = yield call(query, payload);
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
    // 删除
    * BatchesDelete({ payload }, { call, put }){
      let { MonthPickerValue, ModalInputSearchValue, pageType, message, ...other } = payload;
      switch(pageType){
        case 'BatchesDelete':
          let resData = yield call(batchesDelete, { MonthPickerValue, ModalInputSearchValue });
          return resData;
          break;
        case 'onDelete':
          let { files } = other
          let deleteData = yield call(everyDelete, files);
          return deleteData
          break; 
      }
      
    },
    * onEduce({payload = {}}, { put, call }){
      const resData = yield call (fileEduce,payload);
      downloadjs(resData, '税基印花税.xls', "application/octet-stream");
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
    setFormData(state, { payload }){
      return { ...state, formData:{
        ...state.formData,
        ...payload
      }};
    }
  },
})
