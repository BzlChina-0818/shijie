import pathToRegexp from 'path-to-regexp'
import {detail, create, update,unique} from 'services/action'
import queryString from "query-string";
import modelExtend from "dva-model-extend";
import {query as queryBizTable, queryCode} from 'services/bizTable'
import {pageModel} from "../../common";
import {queryURL} from 'utils'
import {PATH} from "utils"

const path = PATH.CUSTOMER_FORM

/**
 * @description 动态表单>功能定义
 * @author linxiaonan + guoqianyuan
 */
export default modelExtend(pageModel, {
  namespace: 'actionCreate',
  state: {
    data: {},
    currentItem: {},
    modalVisible: false,
    pageType: 'create',
    optionStatus: 'create',
    selectedRowKeys: [],
    terminalList: [],
    formData: {},
    modal: {},
    columnData: [],
    columnDataOrigin: [],
    disabledArr: [],
    detailDatas: [],
    count: 0,
    dataListObject: [],
    detailList: [],
    modalInputConfig: {
      'bizTable': {
        associateInput: [
          {
            formName: 'bizTable',   //新增页面form对应的字段
            listName: 'bizTableName'     //modal列表中对应的字段
          },
        ],
        listUrl: queryBizTable,
        columns: [
          {
            title: '表名',
            dataIndex: 'bizTableName',
            key: 'bizTableName',
          }, {
            title: '描述',
            dataIndex: 'bizTableDesc',
            key: 'bizTableDesc',
          },
        ],
      }
    },
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        // 非创建页面
        const {pathname,search} = location
        const locationState = queryString.parse(search)
        console.log(locationState)
        if (pathname === path + '/action/update' || pathname === path + '/action/detail') {
          dispatch({
            type: 'updateState',
            payload: {
              pageType: pathname.split('/')[3]
            }
          })
          const payload = {
            id: locationState.id //获取id
          }
          dispatch({
            type: 'detail',
            payload,
          })
        } else if (pathname === path + '/action/create') {
          dispatch({
            type: 'updateState',
            payload: {
              pageType: "create",
              formData: {},
              detailDatas: [],
            }
          })
        }
      })

    },
  },

  effects: {

    * create({payload}, {call, put}) {
      const data = yield call(create, payload)
      if (data.success) {
        return data
      } else {
        throw data
      }
    },
    * update({payload}, {call}) {
      const data = yield call(update, payload)
      if (data.success) {
        return data
      } else {
        throw data
      }
    },
    * detail({payload}, {call, put}) {
      const data = yield call(detail, payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            formData: data.data,
            detailDatas: data.data.detailList
          }
        })
      } else {
        throw data
      }
    },
    * queryListModal({payload}, {call, put, select}) {
      const {modalInputConfig, choiceModalInput} = yield select(_ => _.actionCreate);

      // 根据modal输入框类型，清空值
      let pageUrl = modalInputConfig[choiceModalInput].listUrl

      payload = {
        page: 1,
        pageSize: 10,
        bizTableName: "",
        bizTableDesc: "",
        sort: {
          "direction": "DESC",
          "property": "id"
        },
      }
      const data = yield call(pageUrl, payload)
      const {
        success, message, status, ...other
      } = data
      if (success) {
        const page = other.data.page
        yield put({
          type: 'querySuccess',
          payload: {
            modal: {
              list: other.data.content,
              pagination: {
                current: Number(page.number) || 0,
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
    * queryCode({payload}, {call, put}) {
      const data = yield call(queryCode, payload)
      const {
        success, message, status, ...other
      } = data
      let columnData = data.data
      if (success) {
        //用put去触发一个同步请求reducer,type reducer中,payload参数
        yield put({
          type: 'updateState',
          payload: {
            columnData,
            columnDataOrigin:columnData,
          },
        })
        //select 去select中进行查找
      } else {
        throw data
      }
    },
    // 唯一functionCode
    * uniqueData ({ payload }, { call }) {
      const data = yield call(unique, payload)
      if (data.success) {
        return data
      } else {
        throw data
      }
    },
  }
  ,
  reducers: {
    showModal(state, {payload}) {
      return {...state, ...payload, modalVisible: true}
    },

    hideModal(state) {
      return {...state, modalVisible: false}
    },
    selectSuccess(state, {payload}) {
      return {
        ...state,
        formData: {
          ...state.formData,
          ...payload,
        },
      }
    }
  }
})




