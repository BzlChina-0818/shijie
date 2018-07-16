import React from 'react'
import PropTypes from 'prop-types'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import {Row, Collapse, Col, Button, Popconfirm} from 'antd'
import {Page} from '../../components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import {Link} from 'react-router-dom'
import classnames from 'classnames'
import styles from './index.less'

const Panel = Collapse.Panel; 
const InvoiceCode = ({
                       location, dispatch, invoiceCode, loading,
                     }) => {
  location.query = queryString.parse(location.search)
  const {query, pathname} = location
  const {
    list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRows,provinceData,cityData
  } = invoiceCode
  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }
  const onAdd = () => {
    dispatch(routerRedux.push({
      pathname: 'invoiceCode/create'
    }))
  }
  const listProps = {
    dataSource: list,
    loading: loading.effects['invoiceCode/query'],
    pagination,
    location,
    isMotion,
    onChange(page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDeleteItem(id) {
      dispatch({
        type: 'invoiceCode/delete',
        payload: id,
      })
        .then(() => {
          handleRefresh({
            page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
          })
        })
    },
    onEditItem(newQuery) {
      const payload = {optionStatus: 'update'}
      dispatch(routerRedux.push({
        pathname: 'invoiceCode/update',
        query: queryString.stringify({
          ...query,
          ...newQuery,
          ...payload
        }),
      }))

    },
    toDetail(newQuery) {
      dispatch(routerRedux.push({
        pathname: `invoiceCode/detail`,
        query: queryString.stringify({
          ...query,
          ...newQuery,
        }),
      }))
    },
     /* rowSelection: {
        //selectedRows,
        //type:'radio',

        onChange: (provinceData,cityData) => {
          dispatch({
            type: 'invoiceCode/updateState',
            payload: {
              provinceData: provinceData,
              cityData:cityData,
            },
          })
        },
      },*/
  }
  const filterProps = {
    provinceData,
    cityData,
    isMotion,
    filter: {
      ...query,
    },
    onFilterChange(value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
    queryProvince(data) {
      dispatch({
        type: "invoiceCode/queryProvince",
        payload: data
      })
    },
    queryCity(item) {
      dispatch({
        type: `invoiceCode/queryCity`,
        payload:item
      })
    },
    switchIsMotion() {
      dispatch({type: 'invoiceCode/switchIsMotion'})
    },
  }
  return (
    <Page inner>
      <Button icon="plus" className={classnames(styles.buttonicon)} onClick={onAdd}>新增</Button>
      <Filter {...filterProps} />
      <div>
        <p>查询结果</p>
        <List {...listProps} />
      </div>
    </Page>
  )
}

InvoiceCode.propTypes = {
  invoiceCode: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({invoiceCode, loading}) => ({
  invoiceCode,
  loading,
}))(InvoiceCode)
