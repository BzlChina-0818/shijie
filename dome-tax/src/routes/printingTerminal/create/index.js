import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Form, Input, InputNumber, Radio, DatePicker, TimePicker, Icon, Cascader, Button, Row, Col } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import styles from './index.less'
import city from '../../../utils/city'
import Modal from './Modal'

const FormItem = Form.Item
const ButtonGroup = Button.Group
const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}
const Create = ({
                  dispatch,
                  location,
                  printingTerminalCreate,
                  item = {},
                  form: {
                    getFieldDecorator,
                    validateFields,
                    getFieldsValue,
                  },
                }) => {
  const {
    modalVisible,
  } = printingTerminalCreate
  const updateData = queryString.parse(location.search) || {}
  const modalProps = {
    visible: modalVisible,
    maskClosable: false,
    //confirmLoading: loading.effects[`user/${modalType}`],
    title: '选择组织机构',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'printingTerminalCreate/showModal',
        payload: data,
      })
        .then(() => {
          handleRefresh()
        })
    },
    onCancel () {
      dispatch({
        type: 'printingTerminalCreate/hideModal',
      })
    },
    // renderTreeNodes = (data) => {
    //     return data.map((item) => {
    //       if (item.children) {
    //         return (
    //           <TreeNode title={item.name} key={item.id} dataRef={item}>
    //             {this.renderTreeNodes(item.children)}
    //           </TreeNode>
    //         );
    //       }
    //       return <TreeNode {...item} dataRef={item} />;
    //     });
    // }
  }
  const save = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
    })
  }
  const goBack = () => {
    dispatch(routerRedux.push({
      pathname: '/printingTerminal',
    }))
  }
  const selectZuZhi = () => {
    dispatch({
      type: 'printingTerminalCreate/showModal',
    })
  }
  const config = {
    rules: [{
      type: 'object',
      required: true,
      message: 'Please select time!',
    }],
  }
  const selectAfter = (
    <ButtonGroup>
      <Button onClick={selectZuZhi}><Icon type="search"/></Button>
      <Button><Icon type="close-circle-o"/></Button>
    </ButtonGroup>
  )
  return (
    <div>
      <p style={{ marginTop: '-12' }}><Button type="primary" size="small" onClick={save} icon="save">保存</Button> <Button
        style={{ marginLeft: '10' }} type="primary" size="small" onClick={goBack} icon="left-circle">返回</Button></p>
      <div className="condition-filter print-pool">
        <Form layout="inline">
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="打印终端编号" hasFeedback {...formItemLayout}>
                {getFieldDecorator('printingCode', {
                  initialValue: updateData.printingCode,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input/>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="打印池名称" hasFeedback {...formItemLayout}>
                {getFieldDecorator('printingName', {
                  initialValue: updateData.printingName,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input/>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="所属打印池" hasFeedback {...formItemLayout}>
                <div className="input-modal-data">
                  {getFieldDecorator('address', {
                    initialValue: updateData.address,
                    rules: [
                      {
                        required: true,
                      },
                    ],
                  })(<Input/>)}
                  {selectAfter}</div>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="是否手工开票" hasFeedback style={{ display: 'block' }} {...formItemLayout}>
                {getFieldDecorator('make', {
                  initialValue: updateData.make,
                  rules: [
                    {
                      required: true,
                      type: 'boolean',
                    },
                  ],
                })(<Radio.Group>
                  <Radio value>是</Radio>
                  <Radio value={false}>否</Radio>
                </Radio.Group>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="发票复核人" hasFeedback {...formItemLayout}>
                {getFieldDecorator('InvoiceReviewer', {
                  initialValue: updateData.InvoiceReviewer,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input/>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="详细地址" hasFeedback {...formItemLayout}>
                {getFieldDecorator('address', {
                  initialValue: updateData.address,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input/>)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="发票数量上限" hasFeedback {...formItemLayout}>
                {getFieldDecorator('quantityCeiling', {
                  initialValue: updateData.quantityCeiling,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input/>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="发票数量下限" hasFeedback {...formItemLayout}>
                {getFieldDecorator('lowerNumber', {
                  initialValue: updateData.lowerNumber,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input/>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="所属打印池" hasFeedback {...formItemLayout}>
                <div className="input-modal-data">
                  {getFieldDecorator('InvoicePrintingPool', {
                    initialValue: updateData.InvoicePrintingPool,
                    rules: [
                      {
                        required: true,
                      },
                    ],
                  })(<Input/>)}
                  {selectAfter}</div>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
            <FormItem label="启用标识" hasFeedback style={{ display: 'block' }} {...formItemLayout}>
              {getFieldDecorator('biaoShi', {
                initialValue: updateData.biaoShi,
                rules: [
                  {
                    required: true,
                    type: 'boolean',
                  },
                ],
              })(<Radio.Group>
                <Radio value>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>)}
            </FormItem>
          </Col>
            <Col span={8}>
              <FormItem label="开始使用时间" hasFeedback {...formItemLayout}>
                {getFieldDecorator('createTime', config)(
                  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>,
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="结束使用时间" hasFeedback  {...formItemLayout}>
                {getFieldDecorator('endTime', config)(
                  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="未盘点可以开票的期限" hasFeedback {...formItemLayout}>
                {getFieldDecorator('invoiceDate', {
                  initialValue: updateData.invoiceDate,
                  rules: [
                    {
                      required: true,

                    },
                  ],
                })(<Input/>)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}
export default connect(({ printingTerminalCreate, loading }) => ({
  printingTerminalCreate,
  loading,
}))(Form.create()(Create))
