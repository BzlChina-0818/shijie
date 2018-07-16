/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Lodash from 'lodash'
import { ModalInputSearch } from 'components'
import { request,config } from 'utils'
import { Form, Button, Row, Col, DatePicker, Input, Icon,Select,Collapse,InputNumber } from 'antd'
const { RangePicker } = DatePicker
const Option = Select.Option;
const Panel = Collapse.Panel;
const FormItem = Form.Item
const {apiPrefix} = config



const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}

const ColProps = {
  span:8,
  style: {
    marginBottom: 16,
  },
}

const Filter = ({
  onFilterChange,
  filter,
  filterConfig,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  // const { datasourceCode, datasourceName, isValid, createTime } = filter
  // 排序
  let newSearchConditions = Lodash.sortBy(filterConfig,'parameterSort')
  // 过滤不显示字段
  newSearchConditions = Lodash.filter(newSearchConditions,{isShow:"1"})
  let rangeFields =  [] // 暂存日期区间字段
  let selectFields = [] // 暂存下拉框字段
  let modalFields = [] // 暂存modal字段
  let selectLists = {}
  // const handleNewSearchConditions = ()=>{
  Lodash.forEach(newSearchConditions,item=>{
    let {parameterType} = item
    if(parameterType==2){// 下拉列表
      item.valueset && request({
        url: `${apiPrefix}${item.valueset}`,
        method: 'post',
      }).then(respData=>{
        selectLists[`${item.parameterCode}_LIST`]=respData  //获得下拉框的值
      })
      selectFields.push(item.parameterCode)
    }else if(parameterType==4){
      // 列表，请求数据
      modalFields.push(item.parameterCode)
    }else if(parameterType==7){ // 日期区间
      // 初始化
      if(filter[item.parameterCode]&&filter[item.parameterCode].length===2){
        let rangeDate = Lodash.map(filter[item.parameterCode].split(","),value=>{
          return moment.unix(value)
        })
        filter[item.parameterCode]=rangeDate.length===2
      }else{
        filter[item.parameterCode]=[]
      }
      rangeFields.push(item.parameterCode)
    }
  })
  console.log(filter)
  // }
  const handleFields = (fields) => {
    Lodash.forEach(rangeFields,(value)=>{
        let rangeDate = fields[value]
        fields[value]=rangeDate.length===2?[rangeDate[0].format('YYYY-MM-DD'),rangeDate[1].format('YYYY-MM-DD')].join(","):""

    })
    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    onFilterChange(fields)
  }

  const handleReset = () => {
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
    handleSubmit()
  }
  // 遍历参数列表，生成对应查询条件
  const handleSearchConfig =  (list)=>{
    return list.map((item) => {
      let {parameterType} =item
      let inputEle=<Input/>; //默认input，否则会报错
      /**
       * '1':'手工录入',
         '2':'下拉列表',
         '3':'下拉列表(多选)',
         '4':'列表选择',
         '5':'列表选择(多选)',
         '6':'日期(弹出框)',
         '7':'期间(弹出框)',
       */
      switch (Number(parameterType)){
        case 1: inputEle=<Input />;  break;
        case 2: inputEle=<Select></Select>;  break;
        case 3: inputEle=<Select mode="multiple"></Select>;  break;
        case 4: inputEle=<Input />;  break;
        case 5: inputEle=<Input />;  break;
        case 6: inputEle=<DatePicker></DatePicker>;  break;
        case 7: inputEle=<RangePicker></RangePicker>;  break;
      }
      return (
        <Col {...ColProps} key={item.id}>
          <FormItem  label={item.parameterName} {...formItemLayout}>
            {getFieldDecorator(item.parameterCode, { initialValue: filter[item.parameterCode] })(inputEle)}
          </FormItem>
        </Col>
      )
    })
  }
  const SearchConditionsJSX = handleSearchConfig(newSearchConditions)

  return (
    <div className="condition-filter">
      <Collapse className="collapse" defaultActiveKey={['1']}>
        <Panel header="动态表单" key="1">
          <Row gutter={24}>
            {SearchConditionsJSX}
          </Row>
          <Row gutter={24}>
            <Col offset={16} span={8}>
                <Button onClick={handleSubmit}>查询</Button>
                <Button onClick={handleReset}>清空</Button>
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </div>

  )
}

Filter.propTypes = {
  form: PropTypes.object,
  filterConfig: PropTypes.array,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
