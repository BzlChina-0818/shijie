/* 发票认证状态监控 */
import React from 'react';
import { Button } from 'antd'
import { connect } from 'dva'
import { Page } from 'components'
import queryString from 'query-string'
import { routerRedux, History } from 'dva/router'
import { PATH } from "utils"
import SwFilter from './Filter'
import SwList from './list'
const path = PATH.SPECIAL_CERTIFICATION

/**
 * @description (进项发票>专票认证>发票认证状态监控)
 * @author wangliang
 */

const StatusWarning = ({
                        certification,
                        dispatch,
                        loading
                      }) => {

  const locationState = queryString.parse(location.search)
  const {query, pathname} = location
  const { list, pagination } = certification

   const handleRefresh = (newQuery) => {
    dispatch(routerRedux.replace({
      pathname,
      search: queryString.stringify({
        ...locationState,
        ...newQuery,
      }),
    }))
  }

  const onEduce = () => {
    let bizData = {
      "page": {
        "number": "0",
        "size": "10"
      },
      "sort": {
        "direction": "ASC",
        "property": ""
      },
      "condition": {

      }
    }
    dispatch({
      type:'certification/onEduce',
      payload:{
        bizData
      }
    })
  }

  const onBack = () => {
    history.go(-1);
  }

  const SwFilterProps ={
    onRunScriptChange(formData){
      handleRefresh(formData)
    }
  }

  const SwListProps = {
    dataSource:list,
    pagination,
    loading: loading.effects['certification/query'],
    location,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDetail(formId){
      dispatch(routerRedux.push({
        pathname: path + `/certification/detail`,
        search: queryString.stringify({
          ...locationState,
          formId,
        }),
      }))
    }
  }

  return (
    <Page inner>
      <div className="op-btn-group">
        <Button className="margin-right" onClick={onEduce}>导出</Button>
        <Button className="margin-right" onClick={onBack}>返回</Button>
      </div>
      <SwFilter { ...SwFilterProps } ></SwFilter>
      <SwList {...SwListProps}></SwList>
    </Page>
  )
}

export default connect(({certification,loading}) => ({certification,loading}))(StatusWarning)
