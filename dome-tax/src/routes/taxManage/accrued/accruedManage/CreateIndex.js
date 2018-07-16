import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Tabs } from 'antd'
const TabPane = Tabs.TabPane;

import { Page } from 'components'
import queryString from 'query-string'
import List from './CreateList'
import Filter from './CreateFilter'
import ButtonGroup from './CreateButtonGroup'

import { PATH } from "utils"
const path = PATH.TAX_ACCRUED

/**
 * @description 税金管理>税金计提>计提管理
 * @author guoqianyuan
 */
const AccruedManage = ({
  location, dispatch, taxFeeAccruedCreateList, loading,
}) => {
 const locationState = queryString.parse(location.search)
  const { pathname } = location
  const { list, pagination, modalVisible, taxTypeList, selectedRowKeys } = taxFeeAccruedCreateList

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
    loading: loading.effects['taxFeeAccruedCreateList/query'],
    pagination,
    location,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDeleteItem (item) {
      dispatch({
        type: 'taxFeeAccruedCreateList/delete',
        payload: item.housedutyCode,
      })
      .then(() => {
        handleRefresh({
          page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
        })
      })
    },
    onEditItem (item) {
      dispatch(routerRedux.push({
        pathname:path+"/manage/update",
        search: queryString.stringify({
          housedutyCode:item.housedutyCode
        }),
      }))
    },
    onDetailItem(item) {
      dispatch(routerRedux.push({
        pathname:path+"/manage/detail",
        search: queryString.stringify({
          housedutyCode:item.housedutyCode
        }),
      }))
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'taxFeeAccruedCreateList/updateState',
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
    taxTypeList,
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
    if(key==='2'){
      dispatch(routerRedux.replace({
        pathname:path+"/manage",
      }))
    }
  }
  return (
    <Page inner>
      <Tabs onTabClick={changeTab} type="card" activeKey={'1'}>
        <TabPane tab="计提新增" key="1">
          <ButtonGroup {...buttonGroupProps}/>
          <Filter {...filterProps} />
          <List {...listProps} />
        </TabPane>
        <TabPane tab="计提导入" key="2">
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

export default connect(({ taxFeeAccruedCreateList, loading }) => ({ taxFeeAccruedCreateList, loading }))(AccruedManage)
