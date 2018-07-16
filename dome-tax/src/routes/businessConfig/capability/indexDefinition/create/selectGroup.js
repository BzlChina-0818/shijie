import React, { Component, Fargment } from 'react'
import { Form, Select } from 'antd'
import { BusinessType } from '../dataConfig'
const FormItem = Form.Item;
const Option = Select.Option

class SelectGroup extends Component{
  constructor(){
    super();
    this.state = {
      selectValue1:'',
      selectValue2:'',
    }
    this.SelectChange = this.SelectChange.bind(this);
  }
  SelectChange(value){
    this.setState({
      selectValue1: value === '1001' && 'zDisb',
      selectValue2:  value === '1002' && 'yDisb',
    })
  }
  render(){
    let { getFieldDecorator } = this.props;
    let { selectValue1, selectValue2 } = this.state;
    const BusinessTypeJSX = Object.keys(BusinessType).map(key => <Option key={key} value={key}>{BusinessType[key]}</Option>)       
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 11 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 },
      },
    };

    return (
        <div className="select-group">
        <FormItem label="指标分类" className="select-group-left" {...formItemLayout}>
          {getFieldDecorator('classes', {
            rules: [{ required: true, message: '指标分类' }],
          })(
            <Select onChange={this.SelectChange}>
              <Option value="">请选择</Option>
              {BusinessTypeJSX}
            </Select>
          )}
        </FormItem>
        <FormItem className={`select-group-right ${selectValue1}`}>
          {getFieldDecorator('frmlist', {
          })(
            <Select
              mode="multiple"
            >
              {BusinessTypeJSX}
            </Select>
          )}
        </FormItem>
        <FormItem className={`select-group-right ${selectValue2}`}>
          {getFieldDecorator('frmlist2', {
          })(
            <Select
              mode="multiple"
            >
              {BusinessTypeJSX}
            </Select>
          )}
        </FormItem>
      </div>
    )
  }
}

export default SelectGroup