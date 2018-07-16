import React, { Fragment } from 'react';
import {Form, Select, Row, Col, Input, Button, DatePicker, Collapse } from 'antd'
import { unix2Locale } from 'utils'
import styles from './Filter.less'
import moment from 'moment'

const Option = Select.Option
const FormItem = Form.Item
const Panel = Collapse.Panel;
const { RangePicker } = DatePicker
const size = 'default'

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}

const filter={}

const Filter = ({
    onRunScriptChange,
    filter,
    form:{
      getFieldDecorator,
      getFieldsValue,
      setFieldsValue,
      resetFields
    }
  }) => {

  const handleFields = (fields) => {
    const { createTime } = fields
    if (createTime && createTime.length) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD'),createTime[1].format('YYYY-MM-DD')];
    }
    return fields
  }

  const onHandleSubmit = () => {
    let files = getFieldsValue();
    files = handleFields(files);
    onRunScriptChange(files)
  }

  const onResetFields = () => {
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
    onHandleSubmit()
  }

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  const handleBlur = () => {
    console.log('blur');
  }

  const callback = (key) => {
    console.log(key)
  }

  const onChange1 = (files) => {
    //console.log(files)
  }
  let initialCreateTime = []
  if (filter.createTime) {
    initialCreateTime[0] = moment(filter.createTime[0])
  }
  if (filter.createTime) {
    initialCreateTime[1] = moment(filter.createTime[1])
  }
  return (
    <div className="condition-filter">
      <Collapse className="collapse" defaultActiveKey={['1']} onChange={callback}>
        <Panel header="脚本日志" key="1">
        <Form className={styles.journalfRow}>
          <Row gutter={28}>
            <Col span={8}>
              <FormItem label="执行脚本:" {...formItemLayout}>
                  {getFieldDecorator('runScript', {
                    initialValue: filter.runScript,
                  })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="执行时间:"  {...formItemLayout}>
                {getFieldDecorator('createTime', {
                  initialValue: initialCreateTime,
                })(<RangePicker  />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="执行状态:" {...formItemLayout}>
                  {getFieldDecorator('runStatus', {
                    initialValue: filter.runStatus,
                  })(<Select>
                    <Option value="">请选择</Option>
                    <Option value="0">执行成功</Option>
                    <Option value="1">执行失败</Option>
                  </Select>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="数据源代码:" {...formItemLayout}>
                  {getFieldDecorator('datasourceCode', {
                    initialValue: filter.datasourceCode,
                  })(<Input />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col offset={16} span={8} className="button-col">
                <Button onClick={onHandleSubmit} >查询</Button>
                <Button className={styles.ml30} onClick={onResetFields}>清空</Button>
            </Col>
          </Row>
        </Form>
        </Panel>
      </Collapse>
    </div>
  )
}

export default Form.create()(Filter);
