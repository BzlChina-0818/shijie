/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import { getConfig } from 'services/dynamicTemplate'
import { pageModel } from '../common'

import { PATH, queryURL } from "utils"
const path = PATH.DYNAMIC_TEMPLATE
const { prefix } = config
import Lodash from 'lodash'
/**
 * @description 动态表单>动态模版实现
 * @author guoqianyuan
 */
export default modelExtend(pageModel, {

  state: {
    dtConfig:{},
    tableName:"",
    PKid:"id",
  },
  effects: {
    * getConfig ({ payload = {} }, { call, put }) {
        const nowTableName = queryURL("tableName")
        // const nowTableName = payload
      // todo 如果列表页，前后两次路由，表名不相同。避免查询列表式重复请求此接口
      // if(nowTableName!==tableName){

        yield put({ type: 'updateState', payload: { tableName: nowTableName }})

        const respData = yield call(getConfig, {tableName:nowTableName})
        if (respData.success) {
          let data = respData.data
          const {titles,buttons} = data
          // 查询新增或更新button
          /** SAVE:新增
           UPDATE:修改
           DETAIL:详情
           DELETE:删除
           IMPORT:导入*/
          const hasPKButton = Lodash.find(buttons, (item) => {
            return item.detailList.length > 0
          })
          // 查询包含主键的object
          const hasPKColumn = Lodash.find(titles, {isPk: 1})||{}
          yield put({
            type: 'updateState',
            payload: {
              formConfig: hasPKButton,
              PKid: hasPKColumn.dataColCode,// todo 配置功能参数可能没有主键
              dtConfig: data,
            }
          })
          return data
        }
      // }else{
      //   return dtConfig
      // }

    },
  },
  reducers: {



  },
})
