import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import {message} from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import Lodash from "lodash"
import List from './List'
import Filter from './Filter'
import ButtonGroup from './ButtonGroup'

import { PATH } from "utils"
const path = PATH.TAX_DECLARATION

/*
 * @description 税金管理>税金申报>印花税
 * @author linxiaonan
 * * @backEnd lijinkai
 */

const Declaration = ({
  location, dispatch, declaration, loading,
}) => {
 const locationState = queryString.parse(location.search)
  const { pathname } = location
  const { list, pagination, modalVisible, currentCoaTypeInput,selectedRowKeys,formStatusList, } = declaration
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
    loading: loading.effects['declaration/query'],
    pagination,
    location,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onRow(item){
      return {
        onDoubleClick:() => {
          dispatch(routerRedux.push({
            pathname:path+"/declaration/detail",
            search: queryString.stringify({
              formId:item.formId
            }),
          }))
        }
      }
    },
    onDeleteItem (item) {
      let idArr=[]
      idArr.push(item.formId)
      dispatch({
        type: 'declaration/delete',
        payload: idArr,
      }).then(() => {
          handleRefresh({
            page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
          })
        })
    },
    rowSelection: {
      onChange: (selectedRowKeys, selectedRows) => {
        dispatch({
          type: 'declaration/updateState',
          payload: {
            selectedRowKeys: selectedRows,
          },
        })
      },
    },
  }
  const filterProps = {
    filter: {
      ...locationState,
    },
    formStatusList,
    modalVisible,
    dispatch,
    currentCoaTypeInput,
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
        pathname:path+"/declaration/create",
      }))
    },
    onBatchDelete(){
      if(selectedRowKeys&&selectedRowKeys.length>0){
        const ids = Lodash.map(selectedRowKeys, "formId");
        console.log(ids)
        dispatch({
          type: 'declaration/delete',
          payload: ids,
        }).then(() => {
            handleRefresh({
              page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
            })
        })
      }else{
        message.warning('请先选择数据')
      }

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

Declaration.propTypes = {
  taxCalculationStampDuty: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ declaration, loading }) => ({ declaration, loading }))(Declaration)
