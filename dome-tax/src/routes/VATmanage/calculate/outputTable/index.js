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
/**
 * @description（增值税管理>增值税计算>增值税销项基础表）
 * @author linxiaonan
 *
 * @backEnd lijinkai
 */


const OutputTable = ({
                    location, dispatch, VATCalculationSheet, loading
                  }) => {

  location.query = queryString.parse(location.search)
  const { query, pathname} = location
  const {
    list, pagination, currentCoaTypeInput,modalVisible,selectedRowKeys,
    formStatusList} = VATCalculationSheet

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
    loading: loading.effects['VATCalculationSheet/query'],
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
        pathname:"/vat/calculate/outputTable/detail",
        search: queryString.stringify({
          id:item.id
        }),
      }))
    },
    onDeleteItem(item) {
      dispatch({
        type: 'VATCalculationSheet/delete',
        payload: item.vatFormId,
      })
        .then(() => {
          handleRefresh({
            page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
          })
        })
    },
    onRow(record){
      return {
        onDoubleClick:() => {
          dispatch({
            type:'VATCalculationSheetDetail/updateState',
            payload:{
              pageType:'detail'
            }
          })
          dispatch(routerRedux.push({
            pathname: `/vat/calculate/outputTable/detail`,
            search:queryString.stringify({
              id:record.id
            })
          }))
        }
      }
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'VATCalculationSheet/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
  }

  const filterProps = {
    formStatusList,
    dispatch,
    filter: {
      ...query,
    },
    modalVisible,
    currentCoaTypeInput,
    onFilterChange (value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
  }
  const buttonGroupProps={
    onGoCreate() {
      dispatch(routerRedux.push({
        pathname:"/vat/calculate/outputTable/create",
        search: queryString.stringify({
          ...query
        })
      }))
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

OutputTable.propTypes = {
  calculateAccruedCfg: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ VATCalculationSheet, loading }) => ({ VATCalculationSheet, loading }))(OutputTable)
