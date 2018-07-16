import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Tabs } from 'antd'
const TabPane = Tabs.TabPane;
import { Modal } from 'antd'
const confirm = Modal.confirm
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import ButtonGroup from './ButtonGroup'

import { PATH } from "utils"
const path = PATH.TAX_ACCRUED

/**
 * @description 税金管理>税金计提>计提管理
 * @author guoqianyuan
 */
const AccruedManage = ({
  location, dispatch, taxFeeAccruedManage, loading,
}) => {
 const locationState = queryString.parse(location.search)
  const { pathname } = location
  const { list, pagination, modalVisible, selectedRowKeys } = taxFeeAccruedManage

  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.replace({
      pathname,
      search: queryString.stringify({
        ...locationState,
        ...newQuery,
      }),
    }))
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['taxFeeAccruedManage/query'],
    pagination,
    location,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDeleteItem (item) {
      confirm({
        title: '删除',
        content: '确定删除？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          dispatch({
            type: 'taxFeeAccruedManage/delete',
            payload: item.id,
          })
            .then(() => {
              handleRefresh({
                page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
              })
            })
        },
      })
    },
    onEditItem (item) {
      dispatch(routerRedux.push({
        pathname:path+"/manage/update",
        search: queryString.stringify({
          id:item.id
        }),
      }))
    },
    onDetailItem(item) {
      dispatch(routerRedux.push({
        pathname:path+"/manage/detail",
        search: queryString.stringify({
          id:item.id
        }),
      }))
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'taxFeeAccruedManage/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
  }
  const filterProps = {
    filter: {
      ...locationState,
    },
    modalVisible,
    dispatch,
    onFilterChange (value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
  }

  const buttonGroupProps={
    goCreate(){
      dispatch(routerRedux.push({
        pathname:path+"/manage/create",
      }))
    }
  }

  const changeTab = (key)=>{
     if(key==='1'){
       dispatch(routerRedux.replace({
         pathname:path+"/createList",
       }))
     }
  }
  return (
    <Page inner>
      <Tabs onTabClick={changeTab} type="card" activeKey={'2'}>
        <TabPane tab="计提新增" key="1" />
        <TabPane tab="计提导入" key="2">
          <ButtonGroup {...buttonGroupProps}/>
          <Filter {...filterProps} />
          <List {...listProps} />
        </TabPane>
      </Tabs>
    </Page>
  )
}

AccruedManage.propTypes = {
  accruedManage: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ taxFeeAccruedManage, loading }) => ({ taxFeeAccruedManage, loading }))(AccruedManage)
