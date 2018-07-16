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
import Total from "./Total"

/**
 * @description（增值税管理>增值税税基管理>销项发票税基）
 * @author linxiaonan
 * @backEnd chenhao
 */
const SalesInvoiceTax = ({
                           location, dispatch, salesInvoiceTax, loading
                         }) => {

  location.query = queryString.parse(location.search)
  const {query, pathname} = location
  const {
    list, pagination, header, modalVisible,currentCoaTypeInput
  } = salesInvoiceTax

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
    loading: loading.effects['salesInvoiceTax/query'],
    pagination,
    location,
    onChange(page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDetailItem(item) {
      dispatch(routerRedux.push({
        pathname: "/vat/taxBase/salesInvoiceTax/detail",
        search: queryString.stringify({
          id: item.oinvoiceId
        }),
      }))
    },

  }

  const filterProps = {
    dispatch,
    filter: {
      ...query,
    },
    modalVisible,
    currentCoaTypeInput,
    onFilterChange(value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
  }

  const totalProps = {
    dispatch,
      header
  }
  const buttonGroupProps = {
    onExportInvoiceLine() {
      const condition = {
        period: "",
        oinvoiceCode: "",
        oinvoiceNum: "",
        purchaseTaxPayer: "",
        salesTaxPayerNo: "110102801657272",
        claimStatus: "",
      }
      for (let item in query) {
        if (item != "page"&&item !="taxPayer") {
          condition[item] = query[item]
        }
      }
      dispatch({
        type: "salesInvoiceTax/exportInvoiceLine",
        payload: {
          ...condition
        }
      })
    },
    onExportProductInf() {
      const condition = {
        period: "",
        oinvoiceCode: "",
        oinvoiceNum: "",
        purchaseTaxPayer: "",
        salesTaxPayerNo: "",
        claimStatus: "",
      }
      for (let item in query) {
        if (item != "page"&&item !="taxPayer") {
          condition[item] = query[item]
        }
      }
      dispatch({
        type: "salesInvoiceTax/exportProductInf",
        payload: {
          ...condition
        }
      })
    },
    onImport() {
      handleRefresh()
    },
  }


  return (
    <Page inner>
      <ButtonGroup {...buttonGroupProps}/>
      <Filter {...filterProps} />
      <Total {...totalProps}/>
      <List {...listProps} />

    </Page>
  )
}

SalesInvoiceTax.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({salesInvoiceTax, loading}) => ({salesInvoiceTax, loading}))(SalesInvoiceTax)
