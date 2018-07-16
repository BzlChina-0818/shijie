import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { message as Meaasge} from 'antd'
import Lodash from "lodash"
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import ButtonGroup from './ButtonGroup'
import SumModal from './SumModal'
import { PATH } from "utils"
const path = PATH.VAT_CALCULATE
import TaxpayerBodyModal from "routes/baseModule/taxpayerBodyModal"

/**
 * @description 增值税管理>增值税计算>增值税汇总传递单
 * @author guoqianyuan
 * @backEnd chenhao
 */
const SummaryTransfer = ({
  location, dispatch, summaryTransfer, loading,
}) => {
  const locationState = queryString.parse(location.search)
  const { pathname } = location
  const { list, pagination, modalVisible, selectedRows, sumModalVisible, sumFormData } = summaryTransfer

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
    loading: loading.effects['summaryTransfer/query'],
    pagination,
    location,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDeleteItem (item) {
      confirm({
        title: '删除',
        content: '确定删除？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          dispatch({
            type: 'summaryTransfer/delete',
            payload: item.id,
          })
            .then(() => {
              handleRefresh({
                page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
              })
            })
        },
      })
    },
    onEditItem (item) {
      dispatch(routerRedux.push({
        pathname:path+"/summaryTransfer/update",
        search: queryString.stringify({
          id:item.id
        }),
      }))
    },
    onDetailItem(item) {
      dispatch(routerRedux.push({
        pathname:path+"/summaryTransfer/detail",
        search: queryString.stringify({
          id:item.id
        }),
      }))
    },
    rowSelection: {// todo 已汇总的不可选
      selectedRows,
      onChange: (keys,rows) => {
        dispatch({
          type: 'summaryTransfer/updateState',
          payload: {
            selectedRows: rows,
          },
        })
      },
    },
  }
  const filterProps = {
    filter: {
      ...locationState,
    },
    modalVisible,
    dispatch,
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
        pathname:path+"/summaryTransfer/create",
      }))
    },
    onSum(){
      // 已选择列表行
      if(selectedRows.length>0){
        if(Lodash.some(selectedRows, {'isSum':1})){
            Meaasge.warning("已汇总的传递单不能再次汇总！")
        }else if(Lodash.uniqBy(selectedRows, 'period').length!==1){// 判断是否是同一时期的传递单
            Meaasge.warning("请选择同一期间的原始传递单！")
        }else if(Lodash.some(selectedRows, {'transferType':1})){
            Meaasge.warning("选择的信息中有汇总传递单，汇总传递单不能汇总！")
        }else{
            dispatch({
              type: 'summaryTransfer/updateState',
              payload: {
                sumModalVisible: true,
                sumFormData:{}
              },
            })
        }
      }else{
        Meaasge.warning("请选择要汇总的数据！")
      }
    },
    // 导出取数规则
    onExportRule(){
      dispatch({
        type: 'summaryTransfer/exportData',
        payload: {
          selectedRows: rows,
        },
      })
    }
  }

  const sumModalProps = {
    item: sumFormData,
    visible: sumModalVisible,
    maskClosable: false,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'summaryTransfer/sum',
        payload: {
          ...data,
          ids:Lodash.map(selectedRows,'vatFormId').join(',')
        },
      })
    },
    onCancel () {
      dispatch({
        type: 'summaryTransfer/updateState',
        payload: {
          sumModalVisible: false,
        },
      })
    },
    onSearchModal(){
      dispatch({
        type: 'summaryTransfer/updateState',
        payload: {
          modalVisible: "taxpayerBody"
        }
      });
    },
    onClear(){
      dispatch({
        type: 'summaryTransfer/updateState',
        payload: {
          sumFormData: {},
        },
      })
    }
  }

  // 纳税主体
  const TaxpayerBodyModalProps = {
    onOk (data) {
      let formData = {}
      formData.taxPayerNo = data.taxPayerNo
      formData.taxPayer = data.taxPayer
      dispatch({
        type: "summaryTransfer/updateState",
        payload:{
          modalVisible:"",
          sumFormData:formData
        }
      });
      hideModal()
    },
    onCancel () {
      hideModal()
    },
  }

  const hideModal = ()=>{
    dispatch({
      type: "summaryTransfer/updateState",
      payload:{
        modalVisible:""
      }
    });
  }
  return (
    <Page inner>
      <ButtonGroup {...buttonGroupProps}/>
      <Filter {...filterProps} />
      <List {...listProps} />
      {sumModalVisible&&<SumModal {...sumModalProps}/>}
      {modalVisible==='taxpayerBody'&&<TaxpayerBodyModal {...TaxpayerBodyModalProps} />}
    </Page>
  )
}

SummaryTransfer.propTypes = {
  summaryTransfer: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ summaryTransfer, loading }) => ({ summaryTransfer, loading }))(SummaryTransfer)
