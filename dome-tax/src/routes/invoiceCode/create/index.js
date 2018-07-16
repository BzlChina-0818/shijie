import React from 'react'
import PropTypes from 'prop-types'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import {Form, Input, Select, Icon, DatePicker, TimePicker, Cascader, Button, Row, Col} from 'antd'
import {Page} from 'components'
import queryString from 'query-string'

import city from '../../../utils/city'
import './index.less'

const Option = Select.Option 
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
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
    marginTop: '-52px',

    marginRight: '12px'
  }
}
const Create = ({
                  dispatch,
                  onChange,
                  invoiceCodeCreate,
                  location,
                  modalType,
                  queryProvince,
                  queryCity,
                  provinceData,
                  cityData,
                  optionStatus,
                  payload,
                  item = {},
                  form: {
                    getFieldDecorator,
                    validateFields,
                    getFieldsValue,
                  },
                }) => {
  const {
    modalVisible,
  } = invoiceCodeCreate
  const {query, pathname} = location
  const updateData = queryString.parse(location.query) || {};
  pathname === "/invoiceCode/create" ? optionStatus = 'create' : optionStatus='update'
  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname: "/invoiceCode",
      query: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))

  }

  const save = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        createUserID: '1',
        createUserName: "2",
        compId: "3",
        secondaryCompId: "4",
        ttcode: '5',
      }
      const onOk = (data) => {
        dispatch({
          type: `invoiceCodeCreate/${optionStatus}`,
          payload: data,
        }).then(
          handleRefresh(data)
        )
      }

      onOk(data)
    })
  }

  const goBack = () => {
    dispatch(routerRedux.push({
      pathname: '/invoiceCode',
    }))
  }

  const handleProvinceChange = (value) => {
    let createCity = (item) => {
      dispatch({
        type: 'invoiceCodeCreate/queryCity',
        payload: item
      })
    }
    createCity(value)
  }

  const create = () => {
    return (
      <div className='content-list'>
        <p className='invoice-button'><Button type="primary" onClick={save} icon="save">保存</Button> <Button
          style={{marginLeft: '10'}} type="primary" onClick={goBack} icon="left-circle">返回</Button></p>
        <div className='invoice-form'><span className='icon'>
          <Icon type="right-circle"/>
        </span><p className='info'>基本信息</p>
        </div>
        <div className='invoice-code'>
          <Form layout="inline">
            <Row gutter={24}>
              <Col xl={{span: 8}} md={{span: 16}}>
                <FormItem label="发票类型" hasFeedback {...formItemLayout} >
                  {getFieldDecorator('oinvoiceType', {
                    initialValue: updateData.oinvoiceType,
                    rules: [
                      {
                        required: true,
                      },
                    ],
                  })(<Select initialValue="01" style={{
                    width: 150,

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
                <FormItem label="发票代码" hasFeedback {...formItemLayout}>
                  {getFieldDecorator('oinvoiceCode', {
                    rules: [
                      {
                        required: true,
                      },
                    ],
                  })(<div className='invoice-inp'>
                    <Input defaultValue={updateData.oinvoiceCode}/>
                  </div>)}

                </FormItem>
              </Col>
              <Col xl={{span: 8}} md={{span: 16}}>
                <FormItem label="发票限额" hasFeedback {...formItemLayout}>
                  {getFieldDecorator('amtLimit', {
                    initialValue: updateData.amtLimit,
                    rules: [
                      {
                        required: true,
                      },
                    ],
                  })(<Select initialValue="1" style={{
                    width: 150,

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
                <FormItem label="发票名称" hasFeedback {...formItemLayout}>
                  {getFieldDecorator('typeName', {
                    rules: [
                      {
                        required: true,
                      },
                    ],
                  })(<div className='invoice-inp'>
                    <Input defaultValue={updateData.typeName}/>
                  </div>)}

                </FormItem>
              </Col>
              <div><span style={{position: 'absolute', top: '85px', left: '520px', fontSize: '14px'}}>地区</span>
                <Col xl={{span: 10}} md={{span: 20}}>
                  <FormItem label="省" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('invoiceLocation', {
                      initialValue: item.name && item.name.split("")
                    })(<Select style={{width: 150}} onChange={handleProvinceChange}>
                        {invoiceCodeCreate.provinceData ? invoiceCodeCreate.provinceData.map(province => <Option
                          key={province.code}>{province.name}</Option>) : []
                        }
                      </Select>
                    )}
                  </FormItem>
                  <FormItem label="市" hasFeedback {...formItemCity}>
                    {getFieldDecorator('LocationPName', {
                      initialValue: item.name && item.name.split("")
                    })(<Select style={{width: 150}}>
                      {invoiceCodeCreate.cityData ? invoiceCodeCreate.cityData.map(city => <Option
                        key={city.id}>{city.name}</Option>) : []}
                    </Select>)}
                  </FormItem>
                </Col>
              </div>

            </Row>

          </Form>

        </div>

      </div>
    )
  }
  const detail = () => {
    return (
      <div>
        <div><Button style={{marginLeft: '10'}} type="primary" size='small' onClick={goBack}
                     icon="left-circle">返回</Button></div>
        <div className='content'>
          <Row gutter={24}>
            <Col span={8}>
              <span className='colLeft'>发票类型：</span><span>{updateData.oinvoiceType}</span>
            </Col>
            <Col span={8}>
              <span className='colLeft'>发票代码：</span><span>{updateData.oinvoiceCode}</span>
            </Col>
            <Col span={8}>
              <span className='colLeft'>发票限额：</span><span>{updateData.amtLimit}</span>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <span className='colLeft'>发票名称：</span><span>{updateData.typeName}</span>
            </Col>
            <Col span={8}>
              <span className='colLeft'>地区：</span><span>{updateData.invoiceLocation}</span>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
  let arr = pathname.split('/');
  arr = arr[arr.length - 1];
  return arr == 'create' || "update" ? create() : detail();

}
export default connect(({invoiceCodeCreate, loading}) => ({
  invoiceCodeCreate,
  loading,
}))(Form.create()(Create))
