import React, { Fragment } from 'react';
import { Form, Select, Row, Col, Input, Button, DatePicker, Collapse } from 'antd'
import { connect } from 'dva'
import { unix2Locale } from 'utils'
import { FilterItem } from 'components'
import styles from './Filter.less'
const Option = Select.Option
const Panel = Collapse.Panel;
const { RangePicker } = DatePicker

const formData={}

const SwFilter = ({
                  form:{
                    getFieldDecorator,
                    getFieldsValue,
                    setFieldsValue,
                    resetFields
                  },
                  onRunScriptChange
                }) => {

  const formData = {}

  const handleFields = (fields) => {
    const { authDate } = fields
    if (authDate && authDate.length) {
      fields.authDate = [authDate[0].format('YYYY-MM-DD'),authDate[1].format('YYYY-MM-DD')];
    }
    return fields
  }

  const callback = (key) => {
    console.log(key)
  }

  const onHandleSubmit = () => {
    let files = getFieldsValue();
    files = handleFields(files);
    onRunScriptChange(files)
  }

  const onResetFields = () => {
    resetFields();
    onHandleSubmit()
  }

  return (
    <div className="condition-filter">
      <Collapse className="collapse" defaultActiveKey={['1']} onChange={callback}>
        <Panel header="发票认证监控" key="1">
        <Form>
          <Row gutter={28}>
            <Col span={8}>
              <FilterItem label="审核表编号:">
                {getFieldDecorator('profsnlId', {
                  initialValue: formData.profsnlId,
                })(<Input />)}
              </FilterItem>
            </Col>
            <Col span={8}>
              <FilterItem label="审核提交日期:">
                {getFieldDecorator('authDate', {
                  initialValue: formData.authDate,
                })(<RangePicker />)}
              </FilterItem>
            </Col>
            <Col span={8}>
              <FilterItem label="申请人所属组织:">
                {getFieldDecorator('applyCompName ', {
                  initialValue: formData.applyCompName,
                })(<Input />)}
              </FilterItem>
            </Col>
          </Row>
          <Row gutter={28}>
            <Col span={8}>
              <FilterItem label="审核提交人:">
                {getFieldDecorator('ReviewPerson', {
                  initialValue: formData.ReviewPerson,
                })(<Input />)}
              </FilterItem>
            </Col>
            <Col span={8}>
              <FilterItem label="发票代码:">
                  {getFieldDecorator('invoiceCode', {
                  initialValue: formData.invoiceCode,
                  })(<Input/>)}
              </FilterItem>
            </Col>
            <Col span={8}>
              <FilterItem label="发票号码:">
                {getFieldDecorator('invoiceNum', {
                initialValue: formData.invoiceNum,
                })(<Input/>)}
              </FilterItem>
            </Col>
            <Col span={8}>
              <FilterItem label="认证状态:">
                {getFieldDecorator('authenticationStatus', {
                  initialValue: formData.authenticationStatus,
                })(<Select
                  showSearch
                  placeholder="请选择"
                  optionFilterProp="children"
                >
                  <Option value="">请选择</Option>
                  <Option value="0">相符</Option>
                  <Option value="1">不相符</Option>
                  <Option value="2">认证中</Option>
                </Select>)}
              </FilterItem>
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

export default Form.create()(SwFilter);

