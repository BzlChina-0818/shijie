import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Page } from 'components'
import { Modal } from 'antd'
const confirm = Modal.confirm
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import ButtonGroup from './ButtonGroup'

import { PATH } from "utils"
const path = PATH.REPORT_FORM_TPL

/**
 * @description 报表模版管理
 * @author guoqianyuan
 * @backEnd congshulin
 */
const RegisterTaxProof = ({
  location, dispatch, reportFormTpl, loading,
}) => {
 const locationState = queryString.parse(location.search)
  const { pathname } = location
  const { list, pagination, modalVisible, taxTypeList } = reportFormTpl

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
    loading: loading.effects['reportFormTpl/query'],
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
            type: 'reportFormTpl/delete',
            payload: item.formId,
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
        pathname:path+"/update",
        search: queryString.stringify({
          id:item.formId
        }),
      }))
    },
    onEditTpl(item) {
      dispatch(routerRedux.push({
        pathname:path+"/formTpl",
        search: queryString.stringify({
          id:item.formId
        }),
      }))
    },
    onGenerate(item) {
      confirm({
        title: '生成',
        content: '确定生成？',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          dispatch({
            type: 'reportFormTpl/generate',
            payload: {
              id:item.formId
            },
          })
          .then(() => {
            handleRefresh({
              page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
            })
          })
        },
      })
    },
  }
  const filterProps = {
    filter: {
      ...locationState,
    },
    taxTypeList,
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
        pathname:path+"/create",
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

RegisterTaxProof.propTypes = {
  reportFormTpl: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ reportFormTpl, loading }) => ({ reportFormTpl, loading }))(RegisterTaxProof)
