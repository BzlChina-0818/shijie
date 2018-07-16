/* global window */
import modelExtend from 'dva-model-extend'
import downloadjs from "downloadjs"
import queryString from 'query-string'
import { pageModel } from '../../../common'
import { query, fileEduce, particiPant, match, listDelete, importData } from 'services/entryInvoice/invoiceEntry/authentication'

import { PATH } from "utils"
const path = PATH.ENTRY_INVOICE

/**
 * @description (进项发票>发票录入>税控认证结算导入及匹配)
 * @author wangliang
 * @backEnd lijinkai
 */

export default modelExtend(pageModel, {
  namespace: 'authentication',

  state: {
    pageType:'',
    modalTitle:'',   // 任务弹窗标题
    formData:{}
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        let { pathname, query, search } = location;
        if( location.pathname === path + '/authentication' ){
          const {atteTime, ...other} = queryString.parse(location.search);
          const timeRange = {
            startVerifierTime:atteTime && atteTime[0] || null,
            endVerifierTime:atteTime && atteTime[1] || null,
          }
          let payload = {
            page: 1,
            pageSize: 10,
            ...timeRange,
            ...other
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
    * onEduce({payload = {}}, { put, call }){
      const resData = yield call (fileEduce,payload.bizData);
      console.log(resData)
      downloadjs(resData, '税控认证结果导入及匹配.xlsx', "application/octet-stream");
    },
    * onParticipant({payload = {}}, { call, put, select }) {
      payload = {
        "bizData": {
          "handlerId": 2,
          "handlerName": "张三",
          "handlerDeptId": 3,
          "handlerDeptName": "财务部",
          "handlerCompId": 4,
          "handlerCompName": "北京分公司",
          "handlerRoleId": 0,
          "handlerRoleName": "默认职务",
          "actDefKey": "etax001",
          "actDefVersion": 3,
          "jumpType": "query",
          "tenantId": 100,
          "bizId": 1,
          "bizTitle": "10000税额",
          "processInstId": 0,
          "vars": {
            "amount": 20000
          }
        }
      }
      let ParticData = yield call(particiPant,payload);
      if(ParticData.code === 100 && ParticData.success){
        let newParticData = {
          "code": 100,
          "message": "success",
          "data": [
              {
                "stepId": "companyMgrTaskPool",
                "stepName": "公司领导",
                "stepType": "userTask",
                "candidates": [
                    {
                        "userId": 1,
                        "realName": "刘义刚",
                        "userName": "liuyigang",
                        "groupId": 2,
                        "groupName": "公司领导",
                        "compId": null,
                        "compName": null,
                        "roleId": null,
                        "roleName": null,
                        "agentUserId": 0,
                        "agentRealName": null,
                        "agentUserName": null,
                        "agentDeptId": 0,
                        "agentDeptName": null,
                        "agentrRoleId": null,
                        "agentRoleName": null,
                        "agentUserCompId": 0,
                        "agentUserCompName": null
                    },
                    {
                        "userId": 2,
                        "realName": "张三",
                        "userName": "zhangsan",
                        "groupId": 3,
                        "groupName": "财务部",
                        "compId": null,
                        "compName": null,
                        "roleId": null,
                        "roleName": null,
                        "agentUserId": 0,
                        "agentRealName": null,
                        "agentUserName": null,
                        "agentDeptId": 0,
                        "agentDeptName": null,
                        "agentrRoleId": null,
                        "agentRoleName": null,
                        "agentUserCompId": 0,
                        "agentUserCompName": null
                    },
                    {
                        "userId": 3,
                        "realName": "李四",
                        "userName": "lisi",
                        "groupId": 3,
                        "groupName": "财务部",
                        "compId": null,
                        "compName": null,
                        "roleId": null,
                        "roleName": null,
                        "agentUserId": 0,
                        "agentRealName": null,
                        "agentUserName": null,
                        "agentDeptId": 0,
                        "agentDeptName": null,
                        "agentrRoleId": null,
                        "agentRoleName": null,
                        "agentUserCompId": 0,
                        "agentUserCompName": null
                    }
                ]
            },
            {
              "stepId": "companyMgrTasks",
              "stepName": "公司员工",
              "stepType": "userMgr",
              "candidates": [
                  {
                      "userId": 1,
                      "realName": "王二",
                      "userName": "liuyigang",
                      "groupId": 2,
                      "groupName": "公司领导",
                      "compId": null,
                      "compName": null,
                      "roleId": null,
                      "roleName": null,
                      "agentUserId": 0,
                      "agentRealName": null,
                      "agentUserName": null,
                      "agentDeptId": 0,
                      "agentDeptName": null,
                      "agentrRoleId": null,
                      "agentRoleName": null,
                      "agentUserCompId": 0,
                      "agentUserCompName": null
                  },
                  {
                      "userId": 2,
                      "realName": "李大钊",
                      "userName": "zhangsan",
                      "groupId": 3,
                      "groupName": "财务部",
                      "compId": null,
                      "compName": null,
                      "roleId": null,
                      "roleName": null,
                      "agentUserId": 0,
                      "agentRealName": null,
                      "agentUserName": null,
                      "agentDeptId": 0,
                      "agentDeptName": null,
                      "agentrRoleId": null,
                      "agentRoleName": null,
                      "agentUserCompId": 0,
                      "agentUserCompName": null
                  },
                  {
                      "userId": 3,
                      "realName": "三金",
                      "userName": "lisi",
                      "groupId": 3,
                      "groupName": "财务部",
                      "compId": null,
                      "compName": null,
                      "roleId": null,
                      "roleName": null,
                      "agentUserId": 0,
                      "agentRealName": null,
                      "agentUserName": null,
                      "agentDeptId": 0,
                      "agentDeptName": null,
                      "agentrRoleId": null,
                      "agentRoleName": null,
                      "agentUserCompId": 0,
                      "agentUserCompName": null
                  }
              ]
          }
          ]
        }
        yield put({
          type:'updateState',
          payload:{
            ParticData:newParticData.data,
            candidates:newParticData.data[0].candidates
          }
        })
      }
    },
    /* 匹配 */
    *onMatch({payload = {}}, { call, put, select }){
      let { bizData, onMessage } = payload;
      let resData = yield call(match, {bizData});
      resData.success ?  onMessage('匹配成功') : onMessage('匹配失败')
    },
    *onDelete({payload = {}}, { call, put, select }){
      let { bizData, onMessage } = payload;
      let resData = yield call(listDelete, {bizData});
      //console.log(resData)
      resData.success ?  onMessage('删除成功') : onMessage('删除失败')
    },
  },

  reducers: {
    /* onTask(state, { payload }){
      return { ...state ,modalVisible: !state.modalVisible, ...payload }
    }, */
    /* form表单查询与清空 */
    InputSearch(state, { payload }) {
      return { ...state, formData: {
        ...state.formData,
        ...payload,
      }}
    },
    /* 点击叉号将当前的搜索框制空 */
    ClearInputSearch(state,{ payload }){
      state.formData[payload.name] = '';
      return { ...state };
    }
  },

})