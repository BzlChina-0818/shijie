import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva';

import {Row,Col, Modal,Button ,Tree} from 'antd'

import ModalList from './ModalList'

const TreeNode = Tree.TreeNode;
const TaxModal=({
                  actionCreate,
                  onOk,
                  handleModalRefresh,
                  ...modalProps
                })=>{
  const { modal, modalInputConfig, choiceModalInput} = actionCreate
  const { list, filter, pagination} = modal
  const { columns } = modalInputConfig[choiceModalInput]
  let choiceItem = {}

  const modalOpts = {
    ...modalProps,
    onOk: () => {
      onOk(choiceItem)
    },
  }
  const listProps = {
    dataSource: list,
    pagination,
    location,
    columns,
    onChange (page) {
      handleModalRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    rowSelection: {
      type:"radio",
      onChange (selectedRowKeys, selectedRows) {
        choiceItem = selectedRows[0]
      },
    }
  }

  return(
    <Modal  {...modalOpts} title='数据表名对象'>

      <ModalList {...listProps}></ModalList>
    </Modal>
  )
}
export default connect((state) => ({actionCreate: state.actionCreate}))(TaxModal);
