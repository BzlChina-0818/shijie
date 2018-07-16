/* global window */
/**
 * @description（登记信息发票>发票行手动添加model层）
 * 
 * @author sunxianlu
 */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils' 
import {getDict} from 'services/baseAPI'
import {saveInvoiceLine,queryLineId} from 'services/entryInvoice/invoiceEntry/registInvoiceInformation'
import { pageModel } from '../../../common'
import { PATH } from "utils"
const path = PATH.ENTRY_INVOICE

export default modelExtend(pageModel, {
  namespace: 'addInvoice',
  state: {
    formData: {},
    pageType:'create',//操作标识 
    detailDatas:[],//发票行明细
    count:0,
    rates:[],//获取税率的数组
    ruleTypes:[], //获取的类型数组 
    recordKey:''
  },
  subscriptions: { 
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const { pathname, search } = location
        const locationState = queryString.parse(search)   
        //登记信息发票和代扣代缴 修改  
        if (pathname === path+'/registInvoiceInformation/addInvoice/update'||pathname === path+'/registerTaxProof/addInvoice/update') {
          dispatch({
            type: 'updateState',
            payload:{
              pageType:pathname.split('/')[5],
              pathType:locationState.pathType
            }
          })
          dispatch({
            type: 'queryLineId',
            payload:{
              formId :locationState.formId  
            }
          })
          dispatch({
            type: 'getRuleType',
            payload:{
                dictId:'ruleType'
            }
          })
          //登记信息发票和代扣代缴 新增
        }else if(pathname === path+'/registInvoiceInformation/addInvoice/create'||pathname === path+'/registerTaxProof/addInvoice/create'){
          dispatch({
            type: 'updateState',
            payload:{
              pageType:"create",
              formData:{},
              detailDatas:[],
              pathType:locationState.pathType
            }
          })
        }
        dispatch({
          type: 'getRate',
          payload:{
              dictId:'RATE'
          }
        })
      })
    },
  },

  effects: {
    //查询发票行明细
    * queryLineId ({ payload = {} }, { call, put }) {
    const data = yield call(queryLineId, payload)
    if (data.success&&data.code===1000) {
      yield put({
        type: 'updateState',
        payload:{
          formData:data.data,
          detailDatas:data.data.invInvoiceLineDetailOutVO,
          count: data.data.invInvoiceLineDetailOutVO.length        
        }
      })
    } else {
      throw data
    }
  },
    //获取税率
    * getRate ({ payload = {} }, { call, put }) {
        const data = yield call(getDict, payload)
        if (data.success) {
        yield put({
            type: 'updateState',
            payload:{
                rates:data.data,
            }
        })
        } else {
        throw data
        }
    },
    //获取类别
    * getRuleType ({ payload = {} }, { call, put }) {
        const data = yield call(getDict, payload)
        if (data.success) {
          yield put({
              type: 'updateState',
              payload:{
                  ruleTypes:data.data,
              }
          })
          return data
        } else {
        throw data
        }
    },
    //保存发票行
    * saveInvoiceLine ({ payload }, { call }) {
    const data = yield call(saveInvoiceLine, payload)
      if (data.success) {
        return data
      } else {
        throw data
      }
    },
  },

  reducers: {
   
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
