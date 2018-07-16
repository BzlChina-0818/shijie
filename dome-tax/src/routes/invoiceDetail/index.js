import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Page,CustomTable} from 'components'
// import {CustomTable} from 'components/CustomTable/CustomTable'
import queryString from 'query-string'
import { Button } from 'antd'
// import List from './List'
import Filter from './Filter'
import ButtonGroup from './ButtonGroup'

import { PATH } from "utils"
const path = PATH.CUSTOMER_FORM

const InvoiceDetail = ({
  location, dispatch, dataSource, loading,
}) => {
//   location.query = queryString.parse(location.search)
//   const { query, pathname } = location
//   const {
//     list, pagination, selectedRowKeys,
//   } = dataSource

//   const handleRefresh = (newQuery) => {
//     dispatch(routerRedux.push({
//       pathname,
//       search: queryString.stringify({
//         ...query,
//         ...newQuery,
//       }),
//     }))
//   }
const DataTableProps = {
    dataSource: [
        {key: '1', name: 'John Brown', age: 24, address: 'New York',name1: '1000000000', age1: 10000000001, address1: 5326,name2: '2018-05-10 12:28:20', age2: '4200.00', address2: '2160.00',name3: '7865.00'},
        {key: '2', name: 'John Brown', age: 24, address: 'New York',name1: '1000000000', age1: 10000000001, address1: 5326,name2: '2018-05-10 12:28:20', age2: '4200.00', address2: '2160.00',name3: '7865.00'},
        {key: '3', name: 'John Brown', age: 24, address: 'New York',name1: '1000000000', age1: 10000000001, address1: 5326,name2: '2018-05-10 12:28:20', age2: '4200.00', address2: '2160.00',name3: '7865.00'},
        {key: '4', name: 'John Brown', age: 24, address: 'New York',name1: '1000000000', age1: 10000000001, address1: 5326,name2: '2018-05-10 12:28:20', age2: '4200.00', address2: '2160.00',name3: '7865.00'},
        {key: '5', name: 'John Brown', age: 24, address: 'New York',name1: '1000000000', age1: 10000000001, address1: 5326,name2: '2018-05-10 12:28:20', age2: '4200.00', address2: '2160.00',name3: '7865.00'},
        {key: '6', name: 'John Brown', age: 24, address: 'New York',name1: '1000000000', age1: 10000000001, address1: 5326,name2: '2018-05-10 12:28:20', age2: '4200.00', address2: '2160.00',name3: '7865.00'},
        {key: '7', name: 'John Brown', age: 24, address: 'New York',name1: '1000000000', age1: 10000000001, address1: 5326,name2: '2018-05-10 12:28:20', age2: '4200.00', address2: '2160.00',name3: '7865.00'},
        {key: '8', name: 'John Brown', age: 24, address: 'New York',name1: '1000000000', age1: 10000000001, address1: 5326,name2: '2018-05-10 12:28:20', age2: '4200.00', address2: '2160.00',name3: '7865.00'},
        {key: '9', name: 'John Brown', age: 24, address: 'New York',name1: '1000000000', age1: 10000000001, address1: 5326,name2: '2018-05-10 12:28:20', age2: '4200.00', address2: '2160.00',name3: '7865.00'},
        {key: '10', name: 'John Brown', age: 24, address: 'New York',name1: '1000000000', age1: 10000000001, address1: 5326,name2: '2018-05-10 12:28:20', age2: '4200.00', address2: '2160.00',name3: '7865.00'}, 
        {key: '11', name: 'John Brown', age: 24, address: 'New York',name1: '1000000000', age1: 10000000001, address1: 5326,name2: '2018-05-10 12:28:20', age2: '4200.00', address2: '2160.00',name3: '7865.00'},
        {key: '12', name: 'John Brown', age: 21, address: 'New York',name1: '1000000000', age1: 10000000001, address1: 5326,name2: '2018-05-10 12:28:20', age2: '4200.00', address2: '2160.00',name3: '7865.00'},
        {key: '13', name: 'John Brown', age: 22, address: 'New York',name1: '1000000000', age1: 10000000001, address1: 5326,name2: '2018-05-10 12:28:20', age2: '4200.00', address2: '2160.00',name3: '7865.00'},
        {key: '14', name: 'John Brown', age: 23, address: 'New York',name1: '1000000000', age1: 10000000001, address1: 5326,name2: '2018-05-10 12:28:20', age2: '4200.00', address2: '2160.00',name3: '7865.00'},
        {key: '15', name: 'John Brown', age: 25, address: 'New York',name1: '1000000000', age1: 10000000001, address1: 5326,name2: '2018-05-10 12:28:20', age2: '4200.00', address2: '2160.00',name3: '7865.00'},
    ],
    columns: [
        { title: '发票单号', dataIndex: 'name' }, 
        { title: '发票类型', dataIndex: 'age' }, 
        { title: '购货单位名称', dataIndex: 'address' },
        { title: '购货单位纳税识别号', dataIndex: 'name1' }, 
        { title: '发票代码', dataIndex: 'age1' }, 
        { title: '发票号码', dataIndex: 'address1' },
        { title: '开票日期', dataIndex: 'name2' }, 
        { title: '金额', dataIndex: 'age2' }, 
        { title: '税额', dataIndex: 'address2' },
        { title: '价税合计', dataIndex: 'name3' },
        { title: '操作',
            dataIndex: 'name4',
            key: 'operation',
            fixed: 'right',
            width: 168,
            render: () => {
                return(
                    <div className="operation">
                        <Button onClick={listProps.onEditItem} size="small">修改</Button>
                        <Button size="small">删除</Button>
                        <Button onClick={listProps.onDetailItem} size="small">详情</Button>
                    </div>
                )
            },
        },
    ],
    pagination: {
        current: 1,
        total: 15,
    },
    
  }
  const listProps = {
    // dataSource: list,
    // loading: loading.effects['dataSource/query'],
    // pagination,
    // location,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'invoiceDetail/delete',
        payload: id,
      })
      .then(() => {
        handleRefresh({
          page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
        })
      })
    },
    onEditItem (item) {
      dispatch(routerRedux.push({
        pathname:"/invoiceDetail/update",
        search: queryString.stringify({
          id:item.id
        }),
      }))
    },
    onDetailItem(item) {
      dispatch(routerRedux.push({
        pathname:"/invoiceDetail/detail",
        search: queryString.stringify({
          id:item.id
        }),
      }))
    }, 
    onOperate(item,url){
      dispatch(routerRedux.push({
        pathname:path+url,
        search: queryString.stringify({
          datasourceId:item.id
        }),
      }))
    },
    // rowSelection: {
    //   selectedRowKeys,
    //   onChange: (keys) => {
    //     dispatch({
    //       type: 'dataSource/updateState',
    //       payload: {
    //         selectedRowKeys: keys,
    //       },
    //     })
    //   },
    // },
    ...DataTableProps
  }

//   const filterProps = {
//     filter: {
//       ...query,
//     },
//     onFilterChange (value) {
//       handleRefresh({
//         ...value,
//         page: 1,
//       })
//     },
//     onShowModal (type) {
//       console.log(type)
//       dispatch({
//         type: 'user/showModal',
//         payload: {
//           modalType: type,
//         },
//       })
//     },
//   }

  const ButtonGroupProps={
    goCreate(){
      dispatch(routerRedux.push({
        pathname:"/invoiceDetail/create",
      }))
    }
  }

  return ( 
    <Page inner>
      <ButtonGroup {...ButtonGroupProps} />
        <Filter />
      <CustomTable {...listProps} />
    </Page>
  )
}

InvoiceDetail.propTypes = {
  dataSource: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ invoiceDetail, loading }) => ({ invoiceDetail, loading }))(InvoiceDetail)
