import pathToRegexp from 'path-to-regexp'
import modelExtend from 'dva-model-extend'

import { create } from 'services/commodity'
import { query as queryStandardCommodity } from 'services/standardCommodity'
import { query as taxItem } from 'services/taxItem'
import { pageModel } from '../common'
 console.log(taxItem)
export default modelExtend(pageModel, {

  namespace: 'commodityCreate',

  state: {
    formData: {},
    optionStatus:'create',
    modalVisible:'',
    choiceModalInput:"",
    modal:{},
    modalInputConfig : { //modal输入框配置信息
      'foreignName':{
        associateInput:[ // 相关联输入框
          {
            formName:'foreignName',
            listName:'commodity'
          },
          {
            formName:'foreignCode',
            listName:'commodityCode'
          },
        ],
        listUrl:queryStandardCommodity,
        columns:[
          {
            title: '商品名称',
            dataIndex: 'commodity',
            key: 'commodity',
          }, {
            title: '商品代码',
            dataIndex: 'commodityCode',
            key: 'commodityCode',
          },
        ],
      },
      'taxItemNo':{
        associateInput:[ // 相关联输入框
          {
            formName:'taxItemNo',
            listName:'itemNo'
          },
        ],
        listUrl:taxItem,
        columns:[
          {
            title: '税目名称',
            dataIndex: 'itemName',
            key: 'itemName',
          }, {
            title: '税目代码',
            dataIndex: 'itemNo',
            key: 'itemNo',
          },
        ],
      }
    }
  }, 

  subscriptions: {
    setup ({ dispatch, history }) {
    },
  },
 
  effects: {

    * queryList4Modal ({payload}, { call, put, select }) {
      const {modalInputConfig, choiceModalInput} = yield select(_ => _.commodityCreate);
      //console.log(modalInputConfig, choiceModalInput)
      // 根据modal输入框类型，清空值
      let pageUrl = modalInputConfig[choiceModalInput].listUrl
      let {page=1, pageSize=10, ...other1} = payload
      payload ={
        page:{
          number:page,
          size:pageSize,
        },
        condition:other1
      }
      const data = yield call(pageUrl, payload)
      const {
        success, message, status, ...other
      } = data
      // console.log(other)
      if (success) {
        const page = other.data.page
        yield put({
          type: 'querySuccess',
          payload: {
            modal: {
              list:other.data.content,
              pagination:{
                current: Number(page.number)+1 || 1,
                pageSize: Number(page.size) || 10,
                total: page.totalElements,
              }
            },
          },
        })
      } else {
        throw data
      }
    },
    * create ({ payload }, { call, put }) {
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },
  },

  reducers: {
    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
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
