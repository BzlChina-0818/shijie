import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux, History } from 'dva/router'
import { Page } from 'components'
import { Button } from 'antd'
import ButtonGroup from './ButtonGroup'
import queryString from 'query-string'
import Filter from './Filter'
import List from './List'

/**
 * @description 动态表单>输出日志
 * @author wangliang + guoqianyuan
 */
const Journal = ({
                    tableProps,
                    journal,
                    loading,
                    dispatch,
                    location
                }) => {
  const locationState  = queryString.parse(location.search)
  const { query, pathname } = location
  const {
    list,
    pagination
  } = journal

  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.replace({
      pathname,
      search: queryString.stringify({
        ...locationState,
        ...newQuery,
      }),
    }))
  }

  const filterProps = {
    filter: {
      ...query,
    },
    onRunScriptChange(values){
      handleRefresh(values)
    },
  }

  const ButtonGroupProps = {
    onExport(){
      const condition= {
        "datasourceCode": null,
        "runStatus": null,
        "startTime": null,
        "endTime": null,
        "runScript": null,
        "datasourceId": 1
      }
      for(let item in query){
        if(item!='page'){
          condition[item]=query[item]
        }
      }
      dispatch({
        type:"journal/onExport",
        payload:{
          condition:{
            ...condition,
          }
        }
      })
    },
    goBack() {
      history.go(-1)
    }
  }

  const listProps = {
    dataSource: list,
    pagination,
    loading: loading.effects['journal/outJournal'],
    location,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    toDetails(record){
      // console.log(location)
      dispatch(routerRedux.push({
        pathname: `/customerForm/journalLog/${record.id}`,
        query: {
          prevPath:location.pathname + '?datasourceId=' + record.id,
        },
      }))
    }
  }

  return (
    <Page inner>
      <ButtonGroup {...ButtonGroupProps}></ButtonGroup>
      <Filter { ...filterProps }/>
      <List {...listProps}/>
    </Page>
  )
}

Journal.propTypes = {
  tableProps: PropTypes.object,
  journal: PropTypes.object
}

export default connect(({ journal, loading }) => ({ journal, loading }))(Journal);
