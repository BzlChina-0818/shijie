import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { Page,SelectModal } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import ButtonGroup from './ButtonGroup'
/*
 * @description（进项发票管理>发票录入>红字发票申请）
 * @author linxiaonan
 *
 *  @backEnd wangweiqiang
 */

const CreditNoteApplyFor = ({
                      location, dispatch, applyFor, loading
                    }) => {

  location.query = queryString.parse(location.search)
  const { query, pathname} = location
  const {
    list, pagination, filterData,modalVisible,
  } = applyFor
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
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDetailItem(item) {
      dispatch(routerRedux.push({
        pathname:"/entryInvoice/invoiceEntry/creditNote/applyFor/detail",
        search: queryString.stringify({
          id:item.formId
        }),
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'creditNote/delete',
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
    dispatch,
    modalVisible,
    filter: {
      ...query,
    },
    onFilterChange (value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },


  }


  const buttonGroupProps={
    onGoback() {
      history.go(-1)
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

CreditNoteApplyFor.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ applyFor, loading }) => ({ applyFor, loading }))(CreditNoteApplyFor)
