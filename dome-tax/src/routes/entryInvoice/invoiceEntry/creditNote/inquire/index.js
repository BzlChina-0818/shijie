import React from 'react'
import PropTypes from 'prop-types'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import {Row, Col, Button, Popconfirm} from 'antd'
import {Page, SelectModal} from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import ButtonGroup from './ButtonGroup'

/**
 * @description（进项发票管理>发票录入>红字发票申请查询）
 * @author linxiaonan
 * @backEnd wangweiqiang
 */

const CreditNoteInquire = ({
                             location, dispatch, inquire, loading
                           }) => {

  location.query = queryString.parse(location.search)
  const {query, pathname} = location
  const {
    list, pagination, filterData, modalVisible,
  } = inquire
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
    loading: loading.effects['creditNote/query'],
    pagination,
    location,
    onChange(page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onEditItem(item) {
      dispatch(routerRedux.push({
        pathname: "/entryInvoice/invoiceEntry/creditNote/inquire/update",
        search: queryString.stringify({
          id: item.id
        }),
      }))
    },
    onDetailItem(item) {
      dispatch(routerRedux.push({
        pathname: "/entryInvoice/invoiceEntry/creditNote/inquire/detail",
        search: queryString.stringify({
          id: item.id
        }),
      }))
    },
    onDeleteItem(id) {
      dispatch({
        type: 'inquire/delete',
        payload: id,
      })
        .then(() => {
          handleRefresh({
            page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
          })
        })
    },

  }

  const filterProps = {
    filterData,
    modalVisible,
    dispatch,
    onFilterChange(value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
  }
  const buttonGroupProps = {
    onGoApplyFor() {
      dispatch(routerRedux.push({
        pathname: "/entryInvoice/invoiceEntry/creditNote/applyFor",
        state: queryString.stringify({
          ...query
        }),
      }))
    }
  }


  return (
    <Page inner>
      <ButtonGroup {...buttonGroupProps}/>
      <Filter {...filterProps} />
      <List {...listProps} />

    </Page>
  )
}

CreditNoteInquire.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({inquire, loading}) => ({inquire, loading}))(CreditNoteInquire)
