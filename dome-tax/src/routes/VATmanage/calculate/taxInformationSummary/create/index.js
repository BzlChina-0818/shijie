import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {connect} from 'dva'
import Lodash from "lodash"
import {Form, Input, Collapse, Radio, DatePicker, Icon, Table, Button, Row, Col, Select, message} from 'antd'
import {DropOption, CustomTable} from 'components'
import {NormTypeList} from 'enums'
import TaxpayerBodyModal from "routes/baseModule/taxpayerBodyModal"
import {UFormItem, ModalInputSearch} from "components"
import {PATH, formValidMsg} from "utils"
import queryString from "query-string";
import {routerRedux} from "dva/router";
import {Modal} from "antd/lib/index";
const {MonthPicker} = DatePicker
const path = PATH.VAT_CALCULATE
const FormItem = Form.Item
const RadioGroup = Radio.Group;
const Option = Select.Option;
const Panel = Collapse.Panel;
const { confirm } = Modal

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

const Create = ({
                  dispatch,
                  location,
                  taxInformationSummaryCreate,
                  form: {
                    getFieldDecorator,
                    validateFields,
                    getFieldsValue,
                    setFieldsValue,
                  },
                }) => {
  // state or variable
  const {formData, pageType, modalVisible, tableProps,taxPayer = "", taxPayerNo = "", NormTypeList,} = taxInformationSummaryCreate

  const locationState = queryString.parse(location.search)
  const databaseName = "增值税汇总传递单"


  const columns = [
    {
      title: '计算表编码',
      dataIndex: 'housedutyCode',
      key: 'housedutyCode',
    }, {
      title: '所属期间',
      dataIndex: 'groupName',
      key: 'groupName',
    }, {
      title: '表单类型',
      dataIndex: 'status',
      key: 'status1',
    }, {
      title: '编报单位',
      dataIndex: 'status',
      key: 'status2',
    }, {
      title: '纳税项合计',
      dataIndex: 'status',
      key: 'status3',
    }, {
      title: '进项税合计',
      dataIndex: 'status',
      key: 'status4',
    }, {
      title: '预缴额合计',
      dataIndex: 'status',
      key: 'status5',
    },
    {
      title: '汇总时间',
      dataIndex: 'status',
      key: 'status6',
    },
    {
      title: '申报状态',
      dataIndex: 'status',
      key: 'status7',
    }, {
      title: '操作',
      key: 'operation',
      render: (text, record) => {
        return <div className="operation">
          <Button size="small" onClick={e => onEditItem(record)}>表单详情</Button>

          <Button onClick={e=>{
            confirm({
              title: '确定删除吗?',
              onOk () {
                onDeleteItem(record,e)
              },
            })
          }} size="small">删除</Button>
        </div>
      },
    },
  ]
  // 纳税主体
  const TaxpayerBodyModalProps = {
    onOk(data) {
      let formData = {}
      formData.taxPayerNo = data.taxPayerNo
      formData.taxPayer = data.taxPayer
      setFieldsValue(formData)
      hideModal()
    },
    onCancel() {
      hideModal()
    },
  }

  const hideModal = () => {
    dispatch({
      type: "taxInformationSummaryCreate/updateState",
      payload: {
        modalVisible: ""
      }
    });
  }
  // methods
  const handleFields = (fields) => {
    const {period} = fields
    if (period.length) {
      fields.period = [period[0].format('YYYY-MM-DD'), period[1].format('YYYY-MM-DD')];
    }
    return fields
  }
  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    onFilterChange(fields)
  }
  const { pathname } = location
  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.replace({
      pathname,
      search: queryString.stringify({
        ...locationState,
        ...newQuery,
      }),
    }))
  }
  const onFilterChange = (value) => {
    handleRefresh({
      ...value,
      page: 1,
    })
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

  const onCreate = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }

      // todo 默认值

      let defaultValue = {
        id: formData.id
      }
      const {...other} = getFieldsValue()
      const data = {
        bizData: {
          ...other,
          ...defaultValue,
        }
      }
      let url = "",
        method = ""
      if (pageType === "create") {
        url = "summaryTransferCreate/create"
        method = "新增"
      } else {
        url = "summaryTransferCreate/update"
        method = "修改"
      }
      dispatch({
        type: url,
        payload: data,
      }).then((data) => {
          if (data.success) {
            message.success(`${method}${databaseName}成功`);
            goBack()
          } else {
            message.error(data.message);
          }
        }
      )
    })
  }

  const goBack = () => {
    history.go(-1)
  }
  const modalInputSearchProps = ({name, placeholder, initialValue, initialDisplayValue, displayName, modalType}) => {
    return {
      onSearchModal() {
        dispatch({
          type: 'taxInformationSummaryCreate/updateState',
          payload: {
            modalVisible: modalType,
            currentCoaTypeInput: name,
          }

        })
      },
      onClear() {
        if (name === "taxPayerNo") {
          setFieldsValue({taxPayerNo: "", taxPayer: ""})
        }
      },
      options: {
        name,
        displayName,
        placeholder,
        initialValue,
        initialDisplayValue,
        getFieldDecorator
      }
    }
  }
  //render
  return (
    <div className="condition-filter">
      <div className="form-btn-group">
        <Button onClick={onCreate}>生成</Button>
        <Button onClick={goBack}>返回</Button>
      </div>
      <Collapse className="collapse" defaultActiveKey={['1']}>
        <Panel header="基本信息" key="1">
          <Row gutter={24}>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="所属期间">
                {getFieldDecorator('period', {
                  initialValue: '',
                })(<MonthPicker/>)}
              </FormItem>
            </Col>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="编制单位">
                {< ModalInputSearch
                  {...modalInputSearchProps({
                    name: 'taxPayerNo',
                    initialDisplayValue: taxPayer,
                    placeholder: '编制单位',
                    initialValue: taxPayerNo,
                    displayName: 'taxPayer',
                    modalType: 'taxpayerBody'
                  })} />}
              </FormItem>
            </Col>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="税种选择">
                {getFieldDecorator('formStatus', {
                  initialValue: ""
                })(<Select>
                  {NormTypeList.map(NormType => <Option key={NormType.id}>{NormType.dispValue}</Option>)}
                </Select>)}
              </FormItem>
            </Col>
          </Row>
        </Panel>
      </Collapse>
      <Collapse className="collapse" defaultActiveKey={['1']}>
        <Panel header="增值税纳税信息表汇总查询" key="1">
          <Row gutter={24}>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="所属期间">
                {getFieldDecorator('period', {
                  initialValue: '',
                })(<MonthPicker/>)}
              </FormItem>
            </Col>
            <Col {...ColProps} >
              <FormItem {...formItemLayout} label="编制单位">
                {< ModalInputSearch
                  {...modalInputSearchProps({
                    name: 'taxPayerNo',
                    initialDisplayValue: taxPayer,
                    placeholder: '编制单位',
                    initialValue: taxPayerNo,
                    displayName: 'taxPayer',
                    modalType: 'taxpayerBody'
                  })} />}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col offset={16} span={8} className="button-col">
              <Button onClick={handleSubmit}>查询</Button>
              <Button onClick={handleReset}>清空</Button>
            </Col>
          </Row>
        </Panel>
      </Collapse>
      <CustomTable {...tableProps} columns={columns}/>
      {modalVisible === 'taxpayerBody' && <TaxpayerBodyModal {...TaxpayerBodyModalProps} />}
    </div>
  )
}
Create.propTypes = {
  optionStatus: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({taxInformationSummaryCreate, loading}) => ({
  taxInformationSummaryCreate,
  loading
}))(Form.create()(Create))

