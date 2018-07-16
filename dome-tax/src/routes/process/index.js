import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import queryString from 'query-string'
import { Page } from 'components'
import List from './List'

const Index=({
    process,dispatch,loading,location
})=>{
    const { list, pagination } = process
    location.query = queryString.parse(location.search)
    const { query, pathname } = location
    const listProps = {
        pagination,
        dataSource: list,
        loading: loading.effects['process/query'],
        onChange (page) {
          dispatch(routerRedux.push({
            pathname,
            search: queryString.stringify({
            //   ...query,
              page: page.current,
              pageSize: page.pageSize,
            }),
          }))
        }, 
    }

    return(
        <Page inner>
            <List {...listProps} />
        </Page>
    )
    Index.PropTypes={
        process: PropTypes.object,
        loading: PropTypes.object,
        location: PropTypes.object,
        dispatch: PropTypes.func,
    }
}
export default connect(({ process, loading }) => ({ process, loading }))(Index)