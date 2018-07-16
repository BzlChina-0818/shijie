import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import ButtonGroup from './ButtonGroup'
/*
 * @description（进项发票管理>普票查验>普通发票查验日志管理）
 * @author linxiaonan
 *  @backEnd chenhao
 */
const Checklog = ({
  location, dispatch, checklog, loading
}) => {

  location.query = queryString.parse(location.search)
  const { query, pathname} = location
  const {
    list, pagination,filterData
  } = checklog
  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.replace({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['checklog/query'],
    pagination,
    location,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDetailItem(item) {
      dispatch(routerRedux.push({
        pathname:"/entryInvoice/generalTicketInspection/checklog/detail",
        search: queryString.stringify({
          id:item.id
        }),
      }))
    },

  }

  const filterProps = {
    filter: {
      ...query,
      ...filterData
    },
    onFilterChange (value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
  }
  const buttonGroupProps={
    onExport(){
      const condition={
        id: "",
        invoiceCode: "",
        invoiceNumber:"",
        startTime:"",
        endTime:"",
        applyUser:"",
        status:"",
      }
      for (let item in query){
        if(item!="page"){
          condition[item]=query[item]
        }
      }
      dispatch({
        type:"checklog/exportData",
         payload:{
          condition
      }
      })
    },
    onImport(){
      handleRefresh()
    },
  }


  return (
    <Page inner>
      <ButtonGroup {...buttonGroupProps}/>
      <Filter {...filterProps} />
      <List {...listProps} />
    </Page>
  )
}

Checklog.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ checklog, loading }) => ({ checklog, loading }))(Checklog)
