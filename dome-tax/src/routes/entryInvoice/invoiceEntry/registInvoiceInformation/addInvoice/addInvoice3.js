// 登记信息发票添加发票行模块
//红字发票或其他非增值税专票与普票的增加或修改
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
const Option = Select.Option;
const Panel = Collapse.Panel;
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
const AddInvoice3 = ({
  onSave, rateChange, onBack, ...other,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
    getFieldValue,
  },
}) => {
  const { formData, onSaveAdd, invoiceLineState, pageType, rates, ruleTypes } = other
  const handleFields = (fields) => {
    const { makeInvoiceDate } = fields
    if (makeInvoiceDate && makeInvoiceDate != null) {
      fields.makeInvoiceDate = makeInvoiceDate.format('YYYY-MM-DD HH:mm:ss');
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
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = ""
        }
      }
    }
    setFieldsValue(fields)
  }
  const changeRate = (value) => {
    rateChange(value)
    const noTaxAmountField = getFieldValue('noTaxAmount')
    console.log(noTaxAmountField)
    if (noTaxAmountField && noTaxAmountField != null) {
      formData.taxAmount = Number(value) * Number(noTaxAmountField) / 100
      formData.sumAmount = formData.taxAmount + Number(noTaxAmountField);
      setFieldsValue(formData)
    }

  }
  const changeOther = (value) => {
    const rateField = getFieldValue('rate')
    const noTaxAmountField = getFieldValue('noTaxAmount')
    if (rateField && rateField != null) {
      formData.taxAmount = Number(noTaxAmountField) * Number(rateField) / 100
      formData.sumAmount = formData.taxAmount + Number(noTaxAmountField);
      setFieldsValue(formData)
    }

    // console.log(fields2)
    // console.log(fields1)
  }
  return (
    <div className="form-pane detail-list" style={{ padding: '0px' }}>
      <div className="op-btn-group">
        <Button onClick={onSaveData}>保存</Button>
        <Button onClick={onSaveDataAdd}>保存并新增</Button>
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
                    initialValue: moment(formData.makeInvoiceDate),
                    rules: [
                      {
                        required: true,
                        message: "输出开票日期"
                      },
                    ],
                  })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
                </FormItem>
              </Col>
              <Col {...ColProps} >
                <FormItem {...formItemLayout} label="金额">
                  {getFieldDecorator('noTaxAmount', {
                    initialValue: formData.noTaxAmount,
                    rules: [
                      {
                        required: true,
                        message: "金额不能为空"
                      },
                    ],
                  })(<Input onBlur={changeOther} />)}
                </FormItem>
              </Col>
              <Col {...ColProps} >
                <FormItem {...formItemLayout} label="税率">
                  {getFieldDecorator('rate', {
                    initialValue: formData.rate,
                    rules: [
                      {
                        required: true,
                        message: "税率不能为空"
                      },
                    ],
                  })(<Select
                    placeholder="请选择" onChange={changeRate}
                  >
                    {rates && rates.map(item => {
                      return <Option key={item.fldValue}>{item.dispValue}</Option>;
                    })}
                  </Select>)}
                </FormItem>
              </Col>
              <Col {...ColProps} >
                <FormItem {...formItemLayout} label="税额">
                  {getFieldDecorator('taxAmount', {
                    initialValue: formData.taxAmount,
                    rules: [
                      {
                        required: true,
                        message: "税额不能为空"
                      },
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
              <Col {...ColProps} >
                <FormItem {...formItemLayout} label="价税合计">
                  {getFieldDecorator('sumAmount', {
                    initialValue: formData.sumAmount,
                    rules: [
                      {
                        required: true,
                        message: "价税合计不能为空"
                      },
                    ],
                  })(<Input disabled />)}
                </FormItem>
              </Col>
              <Col {...ColProps} >
                <FormItem {...formItemLayout} label="类别">
                  {getFieldDecorator('ruleType', {
                    initialValue: formData.ruleType,
                    rules: [
                      {
                        required: true,
                        message: "选择类别"
                      },
                    ],
                  })(<Select
                    placeholder="请选择"
                  >
                    {ruleTypes && ruleTypes.map(item => {
                      return <Option key={item.fldValue}>{item.dispValue}</Option>;
                    })}
                  </Select>)}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Panel>
      </Collapse>
    </div>
  )
}
AddInvoice3.propTypes = {
  form: PropTypes.object,
  other: PropTypes.object,
  invoiceLineState: PropTypes.object,
  loading: PropTypes.object,
}

export default Form.create()(AddInvoice3)
