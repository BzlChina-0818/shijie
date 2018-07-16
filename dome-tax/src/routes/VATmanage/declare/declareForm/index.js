
import React from 'react'
import { connect } from 'dva'
import { Modal, message, Row, Col, DatePicker, Form, Button } from 'antd'
import queryString from 'query-string'
import { routerRedux, History } from 'dva/router'
import { SelectModal, Page } from 'components' 
import ReturnButtonGroup from './ReturnButtonGroup'
import ConsoliButtonGroup from './ConsoliButtonGroup'
import Filter from './Filter'
import List from './List'

/**
 * @description 增值税管理>增值税申报
 * @author wangliang
 */

const Declare = ({
  declareForm,
  loading,
}) => {

  let { formData, present, list } = declareForm
  const ButtonGroupProps =  {
    onBack(){
      history.go(-1)
    },
    onCreate(){
      console.log('新增')
    },
  }

  const FilterProps = {
    formData,
  }

  const ListProps = {
    dataSource:list,
    //pagination,
    location,
    onChange (page) {
      /* handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      }) */
    },
    onRow(record){
      return {
        onDoubleClick:() => {
          console.log(record)
        }
      }
    },
    onUpdate(){

    },
    onDelete(){

    },
    loading: loading.effects['declareForm/query'],  
  }

  return (
    <Page inner>
      {
        present === 'consolidatedReturn' && <ConsoliButtonGroup></ConsoliButtonGroup>
      }
      {
        present === 'taxReturn' &&  <ReturnButtonGroup {...ButtonGroupProps}></ReturnButtonGroup>
      }
     
      <Filter {...FilterProps}></Filter>
      <List {...ListProps}></List>
    </Page>
  )
}

export default connect(({declareForm, loading}) => ({declareForm, loading}))(Declare)