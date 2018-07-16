/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {connect} from 'dva'
import {FilterItem, ModalInputSearch} from 'components'
import {Form, Button, Row, Col, DatePicker, Input, Icon, Select, Collapse} from 'antd'
import styles from './Filter.less'
import TaxpayerBodyModal from 'routes/baseModule/taxpayerBodyModal'
import SalesUnitNameModal from 'routes/baseModule/salesUnitNameModal'

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
const Filter = ({
                  modalVisible,
                  onFilterChange,
                  dispatch,
                  item = {},
                  invoiceTypeList,
                  filterData,
                  onStreamlineFlag,
                  form: {
                    getFieldDecorator,
                    getFieldsValue,
                    setFieldsValue,
                  },
                }) => {
  const { invoiceCode, invoiceNum, authStatus, registerStatus, } = filterData
  const handleFields = (fields) => {
    const {startAuthDate, startDate, startImportDate} = fields

    if (startAuthDate.length) {
      fields.startAuthDate = [startAuthDate[0].format('YYYY-MM-DD'), startAuthDate[1].format('YYYY-MM-DD')];
    }
    if (startDate.length) {
      fields.startDate = [startDate[0].format('YYYY-MM-DD'), startDate[1].format('YYYY-MM-DD')];
    }
    if (startImportDate.length) {
      fields.startImportDate = [startImportDate[0].format('YYYY-MM-DD'), startImportDate[1].format('YYYY-MM-DD')];
    }
    return fields
  }
  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    handleFields(fields)

  }
  const handleSubmit = () => {
    setFieldsValue(filterData)
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
    dispatch({
      type: 'obtainedEntry/updateState',
      payload: {filterData: {}}
    })
    onFilterChange(fields)
  }

  // 精简检查按钮
  const onStreamline = () => {
    dispatch({
      type: "obtainedEntry/onStreamline"
    })
  }


  const modalInputSearchProps = ({name, placeholder, initialValue, modalType}) => {
    return {
      onSearchModal() {
        dispatch({
          type: 'obtainedEntry/updateState',
          payload: {
            modalVisible: name,

          },
        })
      },
      onClear() {
        if (name === "purchaseNum") {
          filterData.taxPayerNo = ''
          filterData.taxPayer = ''
        } else if (name === "salesNum") {
          filterData.salesName = ''
          filterData.salesTaxPayerNo = ''
        }
        dispatch({
          type: 'obtainedEntry/updateState',
          payload: filterData
        })
      },
      options: {
        name,
        placeholder,
        initialValue,
        getFieldDecorator,

      }
    }
  }
  const hideModal = () => {
    dispatch({
      type: "obtainedEntry/updateState",
      payload: {
        modalVisible: ""
      }
    });
  }
  const TaxpayerBodyModalProps = {
    onOk(data) {
      // 根据modal输入框类型，作不同的赋值
      if (modalVisible === 'purchaseNum') {
        /*filterData.taxPayerNo = data.taxPayerNo*/
        filterData.purchaseNum = data.taxPayer
      } else if (modalVisible === 'salesNum') {
        filterData.salesNum = data.partnerName
        //  filterData.salesTaxPayerNo=data.partnerMdmCode
      }
      dispatch({
        type: 'obtainedEntry/selectSuccess',
        payload: filterData,
      })
      hideModal()
    },
    onCancel() {
      hideModal()
    },
  }

  return (
    <div className="condition-filter">
      <Collapse className="collapse" defaultActiveKey={['1']}>
        <Panel header="已获取发票查询" key="1">
          <Row gutter={24}>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="发票代码">
                {getFieldDecorator('invoiceCode', {initialValue: invoiceCode})(<Input/>)}
              </FormItem>
            </Col>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="发票号码">
                {getFieldDecorator('invoiceNum', {initialValue: invoiceNum})(<Input/>)}
              </FormItem>
            </Col>

            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="销货单位名称">
                {<ModalInputSearch
                  {...modalInputSearchProps({
                    name: 'salesNum',
                    placeholder: '销货单位名称',
                    initialValue: filterData.salesNum,
                    modalType: 'salesNum',
                    getFieldDecorator
                  })} />}
              </FormItem>
            </Col>
            <Col {...ColProps} >
              <FormItem label="发票类型" hasFeedback {...formItemLayout}>
                {getFieldDecorator('invoiceType', {
                  initialValue: item.name && item.name.split("")
                })(<Select>
                  {invoiceTypeList.map(invoiceType => <Option key={invoiceType.id}>{invoiceType.dispValue}</Option>)}
                </Select>)}
              </FormItem>
            </Col>

            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="购货单位名称">
                {<ModalInputSearch
                  {...modalInputSearchProps({
                    name: 'purchaseNum',
                    placeholder: '购货单位名称',
                    initialValue: filterData.purchaseNum,
                    modalType: 'purchaseNum',
                    getFieldDecorator,
                  })} />}
              </FormItem>
            </Col>
            <Col {...ColProps} id="startDateRangePicker">
              <FormItem {...formItemLayout} label="发票开票日期">
                {getFieldDecorator('startDate', {initialValue: ""})((<RangePicker
                  getCalendarContainer={() => {
                    return document.getElementById('startDateRangePicker')
                  }}
                />))}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={24} className={onStreamlineFlag.flag ? styles.statusWarning : ''}>
            <Col {...ColProps} id="startImportDateRangePicker">
              <FormItem {...formItemLayout} label="发票获取日期">
                {getFieldDecorator('startImportDate', {initialValue: ""})((<RangePicker
                  getCalendarContainer={() => {
                    return document.getElementById('startImportDateRangePicker')
                  }}
                />))}
              </FormItem>
            </Col>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="发票关联状态">
                {getFieldDecorator('registerStatus', {initialValue: registerStatus})(<Select>
                  <Option value="">请选择</Option>
                  <Option value="0">否</Option>
                  <Option value="1">是</Option>
                </Select>)}
              </FormItem>
            </Col>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="是否认证">
                {getFieldDecorator('authStatus', {initialValue: authStatus})(<Select>
                  <Option value="">请选择</Option>
                  <Option value="0">否</Option>
                  <Option value="1">是</Option>
                </Select>)}
              </FormItem>
            </Col>
            <Col {...ColProps} id="startAuthDateRangePicker">
              <FormItem {...formItemLayout} label="认证日期">
                {getFieldDecorator('startAuthDate', {initialValue: ""})((<RangePicker
                  getCalendarContainer={() => {
                    return document.getElementById('startAuthDateRangePicker')
                  }}
                />))}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col offset={16} span={8} className="button-col">
              <Button className="margin-right" onClick={handleSubmit}>查询</Button>
              <Button onClick={handleReset}>清空</Button>
              <Button className={styles.ml30} onClick={onStreamline}>{onStreamlineFlag.btnText}</Button>
            </Col>
          </Row>
        </Panel>
      </Collapse>
      {modalVisible === 'purchaseNum' && <TaxpayerBodyModal {...TaxpayerBodyModalProps} />}
      {modalVisible === 'salesNum' && <SalesUnitNameModal {...TaxpayerBodyModalProps} />}
    </div>

  )
}

Filter.propTypes = {
  filterData: PropTypes.object,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}


export default connect(({obtainedEntry}) => ({obtainedEntry}))(Form.create()(Filter))
