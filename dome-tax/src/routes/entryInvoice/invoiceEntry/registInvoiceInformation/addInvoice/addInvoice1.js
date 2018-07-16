// 登记信息发票添加发票行模块
//增值税专票的增加或修改
import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux, History } from 'dva/router'
import { connect } from 'dva'
import moment from 'moment'
import { Form, Button, Row, Col, DatePicker, Collapse, Input, Icon, Select, Table } from 'antd'
import { message } from "antd/lib/index";
import { Page, SelectModal } from 'components'
import queryString from 'query-string'
import { PATH } from "utils"
const path = PATH.ENTRY_INVOICE
const ButtonGroup = Button.Group;
const Panel = Collapse.Panel;
const Option = Select.Option;
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}
const ColProps = {
  span: 8,
  style: {
    marginBottom: 16,
  },
}
const AddInvoice1 = ({
  onSave, onSaveAdd, onAddDetail, onDelete, onBack, ...other,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const { formData, invoiceLineState, detailDatas, columns, ratechange, ruleTypeChange, pageType } = other
  const handleFields = (fields) => {
    const { makeInvoiceDate } = fields
    if (makeInvoiceDate && makeInvoiceDate != null) {
      fields.makeInvoiceDate = makeInvoiceDate.format('YYYY-MM-DD ');
    }
    return fields
  }
  const onSaveData = () => {
    validateFields(errors => {
      if (errors) {
        return;
      }
      let fields = getFieldsValue()
      fields = handleFields(fields)
      onSave(fields)
    });
  }
  const onSaveDataAdd = () => {
    onSaveData()
    onSaveAdd()
  }
  return (
    <div className="form-pane detail-list" style={{padding:'0px'}}>
      <div className="form-btn-group">
        <Button onClick={onSaveData}>保存</Button>
        {pageType === 'create' && <Button onClick={onSaveDataAdd}>保存并新增</Button>}
        <Button onClick={onBack}>返回</Button>
      </div>
      <Collapse className="collapse mb10" defaultActiveKey={['1']} >
        <Panel header="基本信息" key="1">
          {/* 增值税专票 */}
          <Form>
            <Row gutter={24}>
              <Col {...ColProps} >
                <FormItem {...formItemLayout} label="发票代码">
                  {getFieldDecorator('invoiceCode', {
                    initialValue: formData.invoiceCode,
                    rules: [
                      {
                        required: true,
                        len: 10,
                        message: "发票代码必须为十位"
                      },
                    ],
                  })(<Input />)}
                </FormItem>
              </Col>
              <Col {...ColProps} >
                <FormItem {...formItemLayout} label="发票号码">
                  {getFieldDecorator('invoiceNum', {
                    initialValue: formData.invoiceNum,
                    rules: [
                      {
                        required: true,
                        len: 9,
                        message: "发票号码必须为9位"
                      },
                    ],
                  })(<Input />)}
                </FormItem>
              </Col>
              <Col {...ColProps} >
                <FormItem {...formItemLayout} label="开票日期">
                  {getFieldDecorator('makeInvoiceDate', {
                    initialValue: moment(formData.makeInvoiceDate) || '',
                    rules: [
                      {
                        required: true,
                        message: "输出开票日期"
                      },
                    ],
                  })(<DatePicker showTime format="YYYY-MM-DD " />)}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Panel>
      </Collapse>
      {invoiceLineState.invoiceType === '01' && <div className="detailTable">
        {/* <div style={{height:'24px',lineHeight:'24px',border:'1px solid #ccc',paddingLeft:'20px'}}>详情</div> */}
        <div className="op-btn-group">
          <Button onClick={onAddDetail}>添加</Button>
        </div>
        <Table bordered dataSource={detailDatas} columns={columns} />
        {/* {pageType==='update'? <Table bordered dataSource={formData.invInvoiceLineDetailOutVO} columns={columns}/>:<Table bordered dataSource={detailDatas} columns={columns}/>} */}
      </div>}
    </div>
  )
}
AddInvoice1.propTypes = {
  addInvoice: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Form.create()(AddInvoice1)
