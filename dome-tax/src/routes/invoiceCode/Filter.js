/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {FilterItem} from 'components'
import {Form, Cascader, Select, Row, Col, Input, Collapse, Button} from 'antd'
import city from '../../utils/city'

const Search = Input.Search
const Panel = Collapse.Panel
const Option = Select.Option
const FormItem = Form.Item
const ColProps = {
  span:8,
  style: {
    marginBottom: 16,
  },
}

const formItemCity = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
  style: {
    float: 'right',
    marginTop: '-62px',

    marginRight: '52px'
  }
}

const Filter = ({
                  onAdd,
                  isMotion,
                  switchIsMotion,
                  onFilterChange,
                  filter,
                  provinceData,
                  queryProvince,
                  queryCity,
                  cityData,
                  item = {},
                  cities = {},
                  secondCity = {},
                  form: {
                    getFieldDecorator,
                    getFieldsValue,
                    setFieldsValue,
                  },
                }) => {
  const handleFields = (fields) => {
    //const { createTime } = fields
    /*if (createTime.length) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')]
    }*/
    return fields
  }
  const handleSubmit = () => {
    let fields = getFieldsValue()
    // fields = handleFields(fields)
    onFilterChange(fields)
  }

  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit()
  }
  /*  const handleChange = (key, values) => {
      let fields = getFieldsValue()
      fields[key] = values
      fields = handleFields(fields)
      onFilterChange(fields)
    }*/

  const handleProvinceChange = (value) => {
    queryCity(value)
  }


  return (
<div className="condition-filter">
  <Row gutter={24}>
    <div style={{
      overflow: 'hidden',
    }}>
      <p style={{float: 'left'}}>发票代码信息查询</p>
      <p style={{float: 'right'}}>隐藏</p>
    </div>
    <Col xl={{span: 8}} md={{span: 16}}>
      <FormItem label="发票类型" hasFeedback {...ColProps}>
        {getFieldDecorator('发票类型', {
          rules: [
            {
              required: true,
            },
          ],
        })(<Select initialValue="01" style={{
          width: 155,
        }}>
          <Option value="01">增值税专用发票</Option>
          <Option value="02">增值税普通发票</Option>
          <Option value="03">非增值税发票</Option>
          <Option value="04">海关进口增值税专用缴款书</Option>
          <Option value="05">农产品收购发票或者销售发票</Option>
          <Option value="06">代扣代缴税收通用缴款书</Option>
          <Option value="07">运输费用结算单据</Option>
          <Option value="08">增值税电子发票</Option>
        </Select>)}

      </FormItem>
    </Col>
    <Col xl={{span: 8}} md={{span: 16}}>
      <FormItem label="发票代码" hasFeedback {...ColProps}>
        {getFieldDecorator('发票代码', {})(<Input style={{width: '155px'}}/>)}

      </FormItem>
    </Col>
    <Col xl={{span: 8}} md={{span: 16}}>
      <FormItem label="发票限额" hasFeedback {...ColProps}>
        {getFieldDecorator('InvoiceAmount', {})(<Select initialValue="1" style={{
          width: 155,

        }}>
          <Option value="1">万元版</Option>
          <Option value="2">十万元版</Option>
          <Option value="3">百万元版</Option>
          <Option value="4">千万元版</Option>
          <Option value="5">亿元版</Option>

        </Select>)}

      </FormItem>
    </Col>
    <Col xl={{span: 8}} md={{span: 16}}
    >
      <FormItem label="发票名称" hasFeedback {...ColProps}>
        {getFieldDecorator('发票名称', {})(<Input style={{width: '155px'}}/>)}

      </FormItem>
    </Col>
    <div><span style={{position: 'absolute', top: '105px', left: '430px', fontSize: '14px'}}>地区</span>
      <Col xl={{span: 10}} md={{span: 20}}>
        <FormItem label="省" hasFeedback {...ColProps}>
          {getFieldDecorator('name11', {
            initialValue: item.name && item.name.split("")
          })(<Select style={{width: 150}} onChange={handleProvinceChange}>
              {provinceData.map(province => <Option key={province.code}>{province.name}</Option>)
              }
            </Select>
          )}
        </FormItem>


        <FormItem label="市" hasFeedback {...formItemCity}>
        {getFieldDecorator('address', {
          initialValue: item.name && item.name.split("")
        })(<Select style={{width: 150}} >
          {cityData.map(city => <Option key={city.id}>{city.name}</Option>)}
        </Select>)}
      </FormItem>
      </Col>
    </div>


  </Row>
  <Row gutter={24}>
    <Col offset={16} span={8}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div>
          <Button type="primary" className="margin-right" onClick={handleSubmit}>查询</Button>
          <Button onClick={handleReset}>清空</Button>
        </div>
      </div>
    </Col>
  </Row>
</div>


  )
}

Filter.propTypes = {}

export default Form.create()(Filter)
