/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import {config, unix2Locale} from 'utils'
import {query, remove} from 'services/taxManage/taxDeclaration'
import {pageModel} from '../../../common'
import {PATH} from "utils"
import {getDict} from 'services/baseAPI'

const path = PATH.TAX_DECLARATION

/*
 * @description 税金管理>税金申报>地方税种
 * @author linxiaonan
 *
 */
export default modelExtend(pageModel, {
  namespace: 'declaration',

  state: {
    modalVisible: "",
    currentCoaTypeInput: "",
    selectedRowKeys: [],
    formStatusList: [],

  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname === path + '/declaration') {
          let payload = {
            page: 1,
            pageSize: 10,
            // 查询字段
            period: null,
            taxNo: null,
            taxPayerNo: null,
            formStatus: null,
            profsnlId: null,
            ...queryString.parse(location.search)
          }
          dispatch({
            type: 'query',
            payload,
          }).then(
            dispatch({
              type: 'getDict',
              payload: {
                dictId: 'formStatus'
              }
            })
          )
        }
      })
    },
  },

  effects: {

    * query({payload = {}}, {call, put}) {
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
    * delete({payload}, {call, put, select}) {
      const data = yield call(remove, {ids: payload})
      const {selectedRowKeys} = yield select(_ => _.localTax)
      if (data.success) {
        yield put({type: 'updateState', payload: {selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload)}})
      } else {
        throw data
      }
    },
    * getDict({payload}, {call, put}) {
      const data = yield call(getDict, payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            formStatusList: data.data
          }
        })
      } else {
        throw data
      }
    },
  },

  reducers: {},
})
