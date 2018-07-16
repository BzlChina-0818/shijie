import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva';

import { Modal } from 'antd'
import ModalList from './ModalList'
const TaxModal=({
    commodityCreate,
    onOk,
    handleModalRefresh,
    ...modalProps
})=>{
    const { modal, modalInputConfig, choiceModalInput} = commodityCreate
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
      <Modal  {...modalOpts} title='选择组织机构'>
        <ModalList {...listProps}></ModalList>
      </Modal>
    )
}
export default connect((state) => ({commodityCreate: state.commodityCreate}))(TaxModal);
