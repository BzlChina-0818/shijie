import React from 'react'
import { connect } from 'dva'
import { Modal, message, Row, Col, DatePicker, Form, Button } from 'antd'
import queryString from 'query-string'
import { routerRedux, History } from 'dva/router'
import { unix2Locale } from "utils"
import { SelectModal, Page } from 'components'
import TaxpayerBodyModal from '../../../baseModule/taxpayerBodyModal'
import ButtonGroup from './ButtonGroup'
import Filter from './Filter'
import List from './List'

const { MonthPicker } = DatePicker
const confirm = Modal.confirm
const FormItem = Form.Item

/**
 * @description (税金管理>税基管理>印花税)
 * @author wangliang
 */ 

const StampDuty = ({
  stampDuty,
  dispatch,
  loading,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
    resetFields,
  },
}) => {
  const locationState = queryString.parse(location.search)
  const { query, pathname } = location
  let { list, pagination, modalInputConfig, pageType, IdsArr } = stampDuty
  let formData = {}
  const info = (messages) => {
    message.info(messages);
  };

  const onResetFields = () => {
    resetFields();
  }

  // 删除时的模态框 
  const showDeleteConfirm = (title,content,files,type) => {
    confirm({
      title,
      content,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        if(type === 'BatchesDelete'){
          dispatch({
            type:'stampDuty/updateState',
            payload:{
              pageType:''
            }
          })
        }
       
        dispatch({
          type:'stampDuty/BatchesDelete',
          payload:{
            files,
            pageType:type,
          }
        }).then(resData => {
          if(resData.success && resData.statusCode === 1000 ){
            message('删除成功');
          } else {
            message(resData.message);
          }
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const handleRefresh = (newQuery,pathname) => {
    dispatch(routerRedux.replace({
      pathname,
      search: queryString.stringify({
        ...locationState,
        ...newQuery,
      }),
    }))
  }

  const ButtonGroupProps = {
    onExport(){
      let exportData = {
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
        type:'stampDuty/onEduce',
        payload:{
          exportData
        }
      })
    },
    onIncreased(){
      dispatch(routerRedux.replace({
        pathname:'/taxManage/taxBase/stampDuty/create',
      }))
    },
    onBack(){
      history.go(-1)
    },
    onBatchesDelete(){
      dispatch({
        type:'stampDuty/updateState',
        payload:{
          pageType:'BatchesDelete'
        }
      })
    },
    CheckDeletion(){
      let idObj = {
        ids:IdsArr
      }
      if(IdsArr.length <= 0){
        info('请选择有效数据!!!');
        return;
      }
      showDeleteConfirm('删除','确定批量删除？',idObj,'onDelete')
    },
  }

  const FilterProps = {
    onRunScriptChange(newQuery){
      handleRefresh(newQuery)
    },
    onClearModal(name){
      dispatch({
        type:"stampDuty/setFormData",
        payload:{
          groupName:''
        }
      })
    },
    onIsModal(name){
      dispatch({
        type:"stampDuty/updateState",
        payload:{
          pageType:name
        },
      })
    }
  }

  const ListProps = {
    dataSource: list,
    pagination,
    loading: loading.effects['stampDuty/query'],
    location,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDelete(record){
      let idObj = {
        ids:[record.id]
      }
      showDeleteConfirm('删除','确定批量删除？',idObj,'onDelete')
    },
    onEditItem(record){
      dispatch(routerRedux.replace({
        pathname:'/taxManage/taxBase/stampDuty/amend',
        search: queryString.stringify({
          id:record.id
        }),
      }))
    },
    onRow(record){
      return {
        onDoubleClick:() => {
          dispatch({
            type:'stampDutyCreate/onAlter',
            payload:{
              pageType:'detail'
            }
          })
          dispatch(routerRedux.push({
            pathname: `/taxManage/taxBase/stampDuty/detail`,
            search:queryString.stringify({
              id:record.id
            })
          }))
        }
      }
    }
  }

  const SelectModalProps = {
    BatchesDelete:{
      filters:modalInputConfig && modalInputConfig[pageType] && modalInputConfig[pageType].filterConfig,
      visible: pageType === 'BatchesDelete',
      maskClosable: false, 
      listFlag:true,
      footer:null,
      width:840,
      filterLeft:{
        click(files){
          showDeleteConfirm('删除','确定批量删除？',files, 'BatchesDelete')
        },
        text:'删除'
      },
      filterRight:{
        click(){
          console.log('清空')
        },
      },
      onCancel(){
        dispatch({
          type:'stampDuty/updateState',
          payload:{
            pageType:''
          }
        })
      }
    },
    groupName:{
      onOk(record){
        dispatch({
          type:"stampDuty/updateState",
          payload:{
            pageType:""
          },
        })
        dispatch({
          type:"stampDuty/setFormData",
          payload:{
            groupName:record.taxPayer,
            taxPayerNo:record.taxPayerNo,
          },
        })
      },
      onCancel(){
        dispatch({
          type:"stampDuty/updateState",
          payload:{
            pageType:""
          },
        })
      }
    },
  }
  return (
    <Page inner>
      <ButtonGroup {...ButtonGroupProps}></ButtonGroup>
      <Filter {...FilterProps}></Filter>
      <List {...ListProps}></List>
      { pageType === 'BatchesDelete' && <SelectModal {...SelectModalProps[pageType]}></SelectModal> }
      { pageType === 'groupName' && <TaxpayerBodyModal {...SelectModalProps[pageType]}></TaxpayerBodyModal> }
    </Page>
  )
}

export default connect(({stampDuty, stampDutyCreate, loading}) => ({stampDuty, stampDutyCreate, loading}))(Form.create()(StampDuty));