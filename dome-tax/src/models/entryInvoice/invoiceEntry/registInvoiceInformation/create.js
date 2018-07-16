/* global window */
/**
 * @description（登记信息发票>发票批的新增或修改）
 * 
 * @author sunxianlu
 */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils' 
import { save,queryId,removeinvoiceLine,inspection} from 'services/entryInvoice/invoiceEntry/registInvoiceInformation'
import {getDict} from 'services/baseAPI'
import { pageModel } from '../../../common'

import { PATH } from "utils"
const path = PATH.ENTRY_INVOICE

export default modelExtend(pageModel, {
  namespace: 'registInvoiceInformationCreate',
  state: {
    formData: {},
    modalVisible: '',//选择模态框标识
    pageType:'create',//操作标识符
    pathType:'',//登记信息与代扣代缴的标识符
    invoiceType:'', //发票类型
    invoiceTypes:[],//发票类型数组
    inspectionStatus:false,//查验状态
    selectedRowKeys:[],
    isSave:false,//保存状态
    workData:{},//发送的工作流数据
    processModalVisible:false//发送模态框标识
  },
  subscriptions: { 
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const { pathname, search } = location
        const locationState = queryString.parse(search)
        // 非创建页面 
        if (pathname === path+'/registInvoiceInformation/update'||pathname === path+'/registerTaxProof/update') {
          dispatch({ 
            type: 'updateState',
            payload:{
              pageType:pathname.split('/')[4],
              invoiceType:locationState.invoiceType,
              pathType:locationState.pathType
            }
          })
          dispatch({
            type: 'queryId',
            payload:{
              formId :locationState.formId
            }
          })
        }else if(pathname === path+'/registInvoiceInformation/create'||pathname === path+'/registerTaxProof/create'){
          dispatch({
            type: 'updateState',
            payload:{
              pageType:"create",
              pathType:locationState.pathType,
              formData:{}
            }
          })
          dispatch({
            type: 'getDict',
            payload:{
                dictId:'invoiceType'
            }
          })
        }
      })
    },
  },

  effects: {
    //获取发票类型
    * getDict ({ payload = {} }, { call, put }) {
    const data = yield call(getDict, payload)
      if (data.success) {
      yield put({
          type: 'updateState',
          payload:{
            invoiceTypes:data.data,
          }
      })
      } else {
      throw data
      }
  },
    //保存或修改
    * save ({ payload }, { call }) {
        const data = yield call(save, payload)
        if (data.success) {
          return data
        } else {
          throw data
        }
    },
    //删除发票行
    * delete ({ payload }, { call, put, select }) {
      const data = yield call(removeinvoiceLine, { formId: payload })
      const { selectedRowKeys } = yield select(_ => _.registInvoiceInformationCreate)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
      } else {
        throw data
      }
    },
    //查询发票批明细
    * queryId ({ payload = {} }, { call, put }) {
      const data = yield call(queryId, payload)
      console.log(data)
      if (data.success&&data.code===1000) {
        yield put({
          type: 'updateState',
          payload:{
            formData:data.data,
          }
        })
      } else {
        throw data
      }
    },
    //手工查验
    * inspection ({ payload = {} }, { call, put }) {
    const data = yield call(inspection, payload)
    if (data.success&&data.code===1000) {
      yield put({
        type: 'queryId',
        payload:{
          formId :locationState.formId
        }
      })
    } else {
      throw data
    }
  },
  },

  reducers: {
    showModal (state, { payload }) {
      return { ...state, ...payload, processModalVisible: true ,modalVisible:true}
    },
    hideModal (state) {
      return { ...state, processModalVisible: false,modalVisible:false }
    },
    selectSuccess (state, { payload }){
      return {
        ...state,
        formData: {
          ...state.formData,
          ...payload,
        },
      }
    }
  },
})
