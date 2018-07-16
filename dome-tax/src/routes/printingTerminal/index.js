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

const PrintingTerminal=({
                      location, dispatch, printingTerminal, loading,
                    })=>{
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const {
    list, pagination, currentItem,modalVisible,selectedRows,printingName
  } = printingTerminal

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
    dispatch(routerRedux.push({
      pathname:'printingTerminal/create'
    }))
  }
  const modalProps = {
    visible: modalVisible,
    maskClosable: false,
    //confirmLoading: loading.effects[`user/${modalType}`],
    title:'打印池',
    selectedRows:selectedRows,
    wrapClassName: 'vertical-center-modal',
    onOk () {
      if(selectedRows.length>0){
        dispatch({
          type: 'printingTerminal/hideModal',
          payload:{
            printingName:selectedRows[0].printingName
          },
        })
      }else{
        alert('请先选择网点')
      }
    },
    onCancel () {
      dispatch({
        type: 'printingTerminal/hideModal',
      })
    },
   /* rowSelection: {
      //selectedRows,
      type:'radio',
      onChange: (selectedRowKeys, selectedRows) => {
        dispatch({
          type: 'printingTerminal/updateState',
          payload: {
            // selectedRowKeys: keys,
            selectedRows:selectedRows,
            //printingName:selectedRows[0].printingName
          },
        })
      },
    },*/
  }
  const listProps = {
    dataSource: list,
    loading: loading.effects['printingTerminal/query'],
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
        type: 'printingTerminal/delete',
        payload: id,
      })
        .then(() => {
          handleRefresh({
            page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
          })
        })
    },
    onEditItem (newQuery) {
      const payload={optionStatus:'update'}
      dispatch(routerRedux.push({
        pathname:'printingTerminal/create',
        search: queryString.stringify({
          ...query,
          ...newQuery,
          ...payload
        }),
      }))
    },
    toDetail (newQuery){
      dispatch(routerRedux.push({
        pathname:`printingTerminal/detail`,
        search: queryString.stringify({
          ...query,
          ...newQuery,
        }),
      }))
    }
  }
  const filterProps={
    printingName,
    queryName(){
      dispatch({
        type: 'printingTerminal/showModal',
      })
    },
    clearName(){
      dispatch({
        type: 'printingTerminal/updateState',
        payload: {
          printingName:''
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

export default connect(({ printingTerminal, loading }) => ({ printingTerminal, loading }))(PrintingTerminal)
