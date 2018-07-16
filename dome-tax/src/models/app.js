/* global window */
/* global document */
/* global location */
/* eslint no-restricted-globals: ["error", "event"] */

import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import config from 'config'
import { EnumRoleType } from 'enums'
import queryString from 'query-string'

import entryInvoice from "./menu/entryInvoice"
import vat from "./menu/vat"
import taxMange from "./menu/taxManage"
import businessConfig from './menu/businessConfig'
import todo from './menu/todo'
const { prefix } = config
/**
 *   id: 菜单id,
 *   name: 菜单标题,
     bpid: 面包屑父级菜单id；无值：顶级父级面包屑
     mpid: 菜单父级菜单id；值为-1：不显示在菜单上；无值：顶级父级菜单
     route: 菜单路由,
 *
 */
const menu = [
  {
    id: '1',
    name: '首页',
    route: '/dashboard',
  },
  {
    id: '2',
    name: '销项发票管理',
  },
  {
    id: '3',
    name: '进项发票管理',
  },
  {
    id: '4',
    name: '增值税管理',
  },
  {
    id: '5',
    name: '税金管理',
  },
  {
    id: '6',
    name: '业务配置',
  },
  {
    id: '7',
    name: '我的待办',
  },
  {
    id: '21',
    bpid: '2',
    mpid: '2',
    name: '库存管理',
  },
  /**业务配置**/
  ...businessConfig,
  /**进项发票管理**/
  ...entryInvoice,
  /**增值税管理**/
  ...vat,
  /**税金管理**/
  ...taxMange,
  /**我的待办**/
  ...todo,
]
export default {
  namespace: 'app',
  state: {
    user: {},
    permissions: {
      visit: [],
    },
    menu,
    menuPopoverVisible: false,
    siderFold: window.localStorage.getItem(`${prefix}siderFold`) === 'true',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(window.localStorage.getItem(`${prefix}navOpenKeys`)) || [],
    locationPathname: '',
    locationQuery: {},
  },
  subscriptions: {

    setupHistory ({ dispatch, history }) {
      history.listen((location) => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: queryString.parse(location.search),
          },
        })
      })
    },

    setup ({ dispatch }) {
      // dispatch(routerRedux.push({
      //   pathname: '/dashboard',
      // }))
      // dispatch({ type: 'query' },payload)
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' })
        }, 300)
      }
    },

  },
  effects: {


  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    handleNavOpenKeys (state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      }
    },
  },
}
