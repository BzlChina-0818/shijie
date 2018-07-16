import pathToRegexp from 'path-to-regexp'
import {query, detail, create} from 'services/VATmanage/calculate/VATCalculationSheet'
import {getDict} from "services/baseAPI"
import queryString from "query-string";
import modelExtend from "dva-model-extend";
import {pageModel} from "../../../common";
import {queryURL} from 'utils'
import {PATH} from "utils"

const path = PATH.VAT_CALCULATE

/**
 * @description（增值税管理>增值税计算>增值税销项基础表）
 * @author linxiaonan
 * @backEnd lijinkai
 */
export default modelExtend(pageModel, {
  namespace: 'VATCalculationSheetDetail',
  state: {
    formData: {},
    indexTypeList: [],
    modalVisible:false,
    currentCoaTypeInput:"",
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        const pathname = location.pathname
        if (pathname === path + '/outputTable/detail'||pathname === path + '/incomeTable/detail') {
          const payload = {
            id: queryURL('id') //获取id
          }
          dispatch({
            type: 'detail',
            payload,
          }).then(data => {
            dispatch({
              type: 'updateState',
              payload: {
                updateData: data,
              }
            })
          })
        }
        if (pathname === path + '/outputTable/create'||pathname === path + '/incomeTable/create') {
          dispatch({
            type: 'getDict',
            payload: {
              dictId: 'indexType'
            }
          })
        }
      })

    },
  },

  effects: {
    * create({payload}, {call}) {

      const data = yield call(create, payload)
      if (data.success) {
        return data
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
            indexTypeList: data.data
          }
        })
      } else {
        throw data
      }
    },
    * detail({payload}, {call}) {
      const data = yield call(detail, payload)
      if (data.success) {
        return data.data
      } else {
        throw data
      }
    },
  },
  reducers: {
    showModal(state, {payload}) {
      return {...state, ...payload, modalVisible: true}
    },

    hideModal(state) {
      return {...state, modalVisible: false}
    },
  }
})
