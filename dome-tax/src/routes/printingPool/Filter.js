/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
// import {FilterInput} from 'components'
import { Form, Button, Row, Col, Input, Collapse } from 'antd'

// const  Search  = Input.Search
const Panel = Collapse.Panel
const FormItem = Form.Item
const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}
const Searchs = {
  style: {
    width: 200,
  },
}
const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const Filter = ({
                  printingName,
                  queryName,
                  clearName,
                  onFilterChange,
                  form: {
                    getFieldDecorator,
                    validateFields,
                    getFieldsValue,
                  },
                }) => {
  function callback (key) {
    console.log(key)
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    onFilterChange(fields)
  }
  return (
    // <Collapse defaultActiveKey={['1']} onChange={callback}>
    //   <Panel header="" key="1">
        <Row gutter={24}>
          <Col style={{ position: 'relative' }} span={8}>
            <Form>
              <FormItem {...formItemLayout}
                        label="打印池名称"
              >
                {getFieldDecorator('printingName', { initialValue: printingName })(<Input disabled style={{ width: 200 }}/>)}
              </FormItem>
            </Form>
            <div style={{
              position: 'absolute',
              right: '0px',
              top: '3px',
            }}><Button onClick={queryName} style={{ marginRight: '2px' }} type="primary" icon="search"></Button><Button
              type="primary" onClick={clearName} icon="close"></Button></div>
          </Col>
          <Col offset={8} span={8}><Button style={{ marginRight: '2px' }} type="primary" onClick={handleSubmit}>查询</Button>
            <Button type="primary" >清除</Button></Col>
        </Row>
    //   </Panel>
    // </Collapse>
  )
}

Filter.propTypes = {}

export default Form.create()(Filter)
