import React from 'react'
import PropTypes from 'prop-types'
import { Input, Select, DatePicker, Radio, Form } from 'antd'
import { request } from 'utils'
import { ModalInputSearch } from 'components'
import lodash from 'lodash'
const { MonthPicker } = DatePicker;
// import styles from './CustomTable.less';
// import './CustomTable.less'
const Option = Select.Option;
const RadioGroup = Radio.Group;

class InputOrSelect extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    const { type, options, typeName, fromChange, Radios, getFieldDecorator } = this.props;
    const modalInputSearchProps = ({name,placeholder,initialValue,dataSource,submitData}) =>{
      return {
        onSearchModal(){
          
        },
        onClear(){
         
        },
        options:{
          name,
          placeholder,
          initialValue,
          dataSource,
          getFieldDecorator,
        }
      }
    }
    switch(type){
      case '1': return <Input onChange={(e) => fromChange(e,'SelectValue')}/>;
      case '2': 
        return (
          <Select defaultValue='' onChange={(e) => fromChange(e,'SelectValue')}>
            <Option value="">请选择</Option>
            {options&&options.length>0 &&
              options.map((item)=><Option key={item.id} value={item.id}>{item.name}</Option>)
            } 
          </Select>
        ) 
      case '3': 
        return (
          <MonthPicker onChange={(data) => fromChange(data,'MonthPickerValue')}/>
        )
      case '4':
        return (
          <ModalInputSearch
            onChange={(e) => fromChange(e,'ModalInputSearchValue')}
            {...modalInputSearchProps({
              name: typeName,
              placeholder:'',})} />
        )
      case '5':
        return (
          <RadioGroup onChange={e => fromChange(e, 'RadioValue')}>
            {
              Radios && Radios.map(item => <Radio key={item.id} value={item.id}>{item.text}</Radio>)
            }
          </RadioGroup>
        )
    }
    
  }
} 
export default InputOrSelect
