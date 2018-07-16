import React from 'react'
import { connect } from 'dva'
import { Modal, message, Row, Col, DatePicker, Form, Button } from 'antd'
import queryString from 'query-string'
import { routerRedux, History } from 'dva/router'
import { SelectModal, Page } from 'components'
import ButtonGroup from './ButtonGroup'
import TaxpayerBodyModal from '../../../baseModule/taxpayerBodyModal'
import Filter from './Filter'
import List from './List'
import styles from './index.less'

const { MonthPicker } = DatePicker
const confirm = Modal.confirm
const FormItem = Form.Item

/**
 * @description (税金管理>税基管理>房产税)
 * @author wangliang
 * @backEnd lijinkai
 */ 


const HouseTax = ({
  houseTax,
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
  let { list, pagination, IdsArr, modalInputConfig, pageType } = houseTax
  const info = (messages) => {
    message.info(messages);
  };

  const handleRefresh = (newQuery) => {
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
        type:'houseTax/onExport',
        payload:{
          exportData
        }
      })
    },
    onIncreased(){
      dispatch(routerRedux.push({
        pathname: '/taxManage/taxBase/house/create',
      }))
    },
    goBack(){
      history.go(-1)
    },
    onCopy(){
      if(IdsArr.length <= 0){
        info('请选择要复制的税基数据');
        return;
      }
      dispatch({
        type:"houseTax/updateState",
        payload:{
          pageType:'copySection'
        }
      })
    },
    onBatchesDelete(){
      dispatch({
        type:"houseTax/updateState",
        payload:{
          pageType:'BatchesDelete'
        }
      })
    }
  }

  const FilterProps = {
    onFilterChange(newQuery){
      handleRefresh(newQuery)
    },
    onIsModal(){
      dispatch({
        type:"houseTax/updateState",
        payload:{
          pageType:'isModal'
        }
      })
    },
    onClearModal(){
      dispatch({
        type:"houseTax/setFormData",
        payload:{
          taxPayerNo:''
        }
      })
    },
  }

  const ListProps = {
    dataSource: list,
    pagination,
    loading: loading.effects['houseTax/query'],
    location,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDelete(record){
      confirm({
        title: '删除',
        content: '确定删除？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          dispatch({
            type:"houseTax/onDelete",
            payload:{
              bizData:record.id,
            }
          }).then(resData => {
            if(resData.success && resData.code === 1000){
              info('删除成功');
              dispatch(routerRedux.push({
                pathname,
              }))
            } else {
              info('删除失败')
            }
          })
        },
      });
    },
    onEditItem(record){
      let { assetPropDesc, assetStateDesc, ...other } = record
      dispatch(routerRedux.push({
        pathname: `/taxManage/taxBase/house/update`,
        search: queryString.stringify({
          id:record.id
        })
      }))
    },
    onRow(record){
      return {
        onDoubleClick:() => {
          dispatch(routerRedux.push({
            pathname: `/taxManage/taxBase/house/detail`,
            search: queryString.stringify({
              id:record.id
            })
          }))
        }
      }
    }
    
  }

  const SelectModalProps = {
    BatchesDelete:{
      filters:modalInputConfig && modalInputConfig.pageType && modalInputConfig.pageType[filterConfig],
      visible: pageType === 'BatchesDelete',
      maskClosable: false, 
      listFlag:true,
      footer:null,
      width:840,
      filterLeft:{
        click(files){
          dispatch({
            type:"houseTax/updateState",
            payload:{
              pageType:""
            },
          })
          dispatch({
            type:'houseTax/onBatchesDelete',
            payload:{
              bizData:{
                period:files.MonthPickerValue,
                taxPayerNo:files.ModalInputSearchValue
              },
            }
          }).then(resData => {
            if(resData.code === 1000 && resData.success){
              info('批量删除成功');
              dispatch(routerRedux.replace({
                pathname,
              }))
            } else {
              info(resData.message)
            }
          })
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
          type:"houseTax/updateState",
          payload:{
            pageType:""
          },
        })
      }
    },
    copySection:{
      filters:modalInputConfig && modalInputConfig.pageType && modalInputConfig.pageType[filterConfig],
      visible: pageType === 'copySection',
      maskClosable: false, 
      listFlag:true,
      footer:null,
      width:840,
      filterLeft:{
        click(files){
          dispatch({
            type:"houseTax/updateState",
            payload:{
              pageType:""
            },
          })
          dispatch({
            type:'houseTax/onCopy',
            payload:{
              bizData:{
                ids:IdsArr,
                period:files.MonthPickerValue,
              },
              onMessage(message){
                info(message);
              }
            }
          })
        },
        text:'复制'
      },
      onCancel(){
        dispatch({
          type:"houseTax/updateState",
          payload:{
            pageType:""
          },
        })
      },
      filterRight:{
        click(){
          console.log('清空')
        },
      },
    },
    isModal:{
      onOk(record){
        dispatch({
          type:"houseTax/updateState",
          payload:{
            pageType:""
          },
        })
        dispatch({
          type:"houseTax/setFormData",
          payload:{
            taxPayerNo:record.taxPayer
          },
        })
      },
      onCancel(){
        dispatch({
          type:"houseTax/updateState",
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
      <Filter { ...FilterProps }></Filter>
      <List {...ListProps}></List>
      { pageType === 'copySection' && <SelectModal {...SelectModalProps[pageType]}></SelectModal>}
      { pageType === 'BatchesDelete' && <SelectModal {...SelectModalProps[pageType]}></SelectModal>}
      { pageType === 'isModal' && <TaxpayerBodyModal {...SelectModalProps[pageType]}></TaxpayerBodyModal> }
    </Page>
  )
}

export default connect(({houseTax, loading}) => ({houseTax, loading}))(Form.create()(HouseTax));