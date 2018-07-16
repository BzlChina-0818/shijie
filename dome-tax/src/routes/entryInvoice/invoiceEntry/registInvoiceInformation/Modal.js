import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva';

import { Modal } from 'antd'
import ModalFilter from './ModalFilter'
import ModalList from './ModalList'
const TaxModal=({registInvoiceInformation,registInvoiceInformationCreate,
    onOk,
    handleModalRefresh,
    ...modalProps
})=>{
    console.log(registInvoiceInformation)
    console.log(registInvoiceInformationCreate)
    const { modalInputConfig,list,pagination,choiceModalInput} = registInvoiceInformation
    // const { choiceModalInput} = registInvoiceInformationCreate
    const { columns,filterConfig } = modalInputConfig[choiceModalInput]
    let choiceItem = {}
    const modalOpts = {
        ...modalProps,
        onOk: () => {
          onOk(choiceItem)
        },
    }
    const filterProps={
      filterConfig
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
      <Modal  {...modalOpts} title={modalInputConfig[choiceModalInput].title}>
        <ModalFilter {...filterProps}/>
        <ModalList {...listProps}></ModalList>
      </Modal>
    )
}
export default connect((state) => ({registInvoiceInformation: state.registInvoiceInformation,registInvoiceInformationCreate: state.registInvoiceInformationCreate}))(TaxModal);
