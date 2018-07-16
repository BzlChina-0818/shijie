import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm,Icon,Alert} from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import styles from './index.less'

const ticketServer=({
    location, dispatch, ticketServer, loading,
})=>{
    location.query = queryString.parse(location.search)
    const { query, pathname } = location
    const {
        list, pagination, currentItem,modalVisible,selectedRows,filterObject
    } = ticketServer
    const selectObject={};
    const handleRefresh = (newQuery) => {
        dispatch(routerRedux.push({
          pathname,
          search: queryString.stringify({
            ...query,
            ...newQuery,
          }),
        }))
      } 
    const onAdd =()=> {
      const payload={optionType:'create'}
      dispatch(routerRedux.push({
        pathname:'ticketServer/create',
        query: queryString.stringify({
          ...payload
        }),
      }))    
    }
    const modalProps = {
        visible: modalVisible,
        maskClosable: false,
        //confirmLoading: loading.effects[`user/${modalType}`],
        title:'打印池',
        selectedRows,
        wrapClassName: 'vertical-center-modal',
        onOk () {
          console.log(selectedRows)
          if(selectedRows.length>0){
            selectObject.printingName=selectedRows[0].printingName
            dispatch({
              type: 'ticketServer/hideModal',
              payload:{
                filterObject:selectObject
              },
            })
          }else{
            alert('请先选择网点')
          }  
        },
        onCancel () {
          dispatch({
            type: 'ticketServer/hideModal',
          })
        },
        rowSelection: {
          selectedRows,
          type:'radio',
          onChange: (selectedRowKeys, selectedRows) => {
            selectObject.printingName=selectedRows.printingName
            dispatch({
              type: 'ticketServer/updateState',
              payload: {
                // filterObject:selectObject,
                selectedRows:selectedRows
              },
            })
          },
        },
      }
    const listProps = {
        dataSource: list,
        loading: loading.effects['ticketServer/query'],
        pagination,
        location,
        onChange (page) {
          handleRefresh({
            page: page.current,
            pageSize: page.pageSize,
          })
        },
        onDeleteItem (id) {
          dispatch({
            type: 'ticketServer/delete', 
            payload: id,
          })
            .then(() => {
              handleRefresh({
                page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
              })
            })
        },
        onEditItem (newQuery){
          dispatch(routerRedux.push({
            pathname:'ticketServer/update',
            query: queryString.stringify({
              ...query,
              ...newQuery,
            }),
          }))
        },
        toDetail (newQuery){
          const payload={optionType:'detail'}
          dispatch(routerRedux.push({
            pathname:`ticketServer/detail`,
            query: queryString.stringify({
              ...query,
              ...newQuery,
              ...payload
            }),
          }))
        }
    }
    const filterProps={
      filterObject,
      queryName(){
        console.log(111)
        dispatch({
          type: 'ticketServer/showModal',
        })
      },
      clearName(){
        dispatch({
          type: 'ticketServer/updateState',
          payload: {
            filterObject:{} 
          }, 
        })
      },
      onFilterChange(value){
        handleRefresh({
          ...value,
          page: 1,
        })
      }
    } 
    return(
        <Page inner>
            <div>
            <Button onClick={onAdd} type="primary">
                    <Icon type="plus" />增加
                </Button>
            </div>
           <Filter {...filterProps}/>
            <List {...listProps} style={{marginTop:'10px'}} />
           {modalVisible && <Modal {...modalProps} />}
        </Page>
    ) 
}
//export default ticketServer
export default connect(({ ticketServer, loading }) => ({ ticketServer, loading }))(ticketServer)
