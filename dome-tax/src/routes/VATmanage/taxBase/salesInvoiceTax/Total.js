/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {connect} from 'dva'
import {FilterItem, ModalInputSearch} from 'components'
import {Form, Button, Row, Col, DatePicker, Input, Icon, Select, Collapse} from 'antd'

const {RangePicker} = DatePicker
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
const Total = ({

                 onFilterChange,
                 dispatch,
                 header,
                 form: {
                   getFieldDecorator,
                   getFieldsValue,
                   setFieldsValue,
                 },
               }) => {
  return (
    header[0] ? <div className="condition-filter">
      <Collapse className="collapse" defaultActiveKey={['1']}>
        <Panel header="销项税额合计" key="1">
          <Row gutter={24}>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="销项税额合计">
                {getFieldDecorator('header', {initialValue: header[0][0]})(<Input disabled/>)}
              </FormItem>
            </Col>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="销项金额合计">
                {getFieldDecorator('header', {initialValue: header[0][1]})(<Input disabled/>)}
              </FormItem>
            </Col>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="销项价税合计">
                {getFieldDecorator('header', {initialValue: header[0][2]})(<Input disabled/>)}
              </FormItem>
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </div> : null

  )
}

Total.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}


export default (Form.create()(Total))
