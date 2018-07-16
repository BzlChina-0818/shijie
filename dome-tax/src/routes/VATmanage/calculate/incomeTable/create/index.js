import React from 'react'
import PropTypes from 'prop-types'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import {Row, Col, Button, DatePicker, Select, Collapse, Input} from 'antd'
import {Page, ModalInputSearch, DetailList} from 'components'
import queryString from 'query-string'
import {Form, message} from "antd/lib/index";
import TaxpayerBodyModal from "routes/baseModule/taxpayerBodyModal"
import {formValidMsg} from "utils"

const Panel = Collapse.Panel
const Option = Select.Option
const {MonthPicker} = DatePicker
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

const Create = ({
                  location,
                  dispatch,
                  VATCalculationSheetDetail,

                  loading,
                  form: {
                    getFieldDecorator,
                    getFieldsValue,
                    setFieldsValue,
                    validateFields

                  },
                }) => {
  const {taxPayer = "", taxPayerNo = "", modalVisible, formData, indexTypeList} = VATCalculationSheetDetail
  const databaseName = "增值税进项基础表"
  location.query = queryString.parse(location.search)
  const modalInputSearchProps = ({name, placeholder, initialValue, initialDisplayValue, displayName, modalType}) => {
    return {
      onSearchModal() {
        dispatch({
          type: 'VATCalculationSheetDetail/updateState',
          payload: {
            modalVisible: modalType,
            currentCoaTypeInput: name,
          }
        })

      },
      onClear() {
        setFieldsValue({taxPayerNo: "", taxPayer: ""})
      },
      options: {
        name,
        placeholder,
        initialValue,
        initialDisplayValue,
        displayName,
        getFieldDecorator
      }
    }
  }
  const hideModal = () => {
    dispatch({
      type: "VATCalculationSheetDetail/updateState",
      payload: {
        modalVisible: ""
      }
    });
  }
  // 纳税主体
  const TaxpayerBodyModalProps = {
    onOk(data) {
      let formData = {}
      // 根据modal输入框类型，作不同的赋值
      formData.taxPayerNo = data.taxPayerNo
      formData.taxPayer = data.taxPayer
      setFieldsValue(formData)
      hideModal()
    },
    onCancel() {
      hideModal()
    },
  }
  const onCreate = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      // todo 默认值
      let defaultValue = {}
      const formValue = {...getFieldsValue()}
      let {taxPayer, ...other} = formValue
      const params = {
        ...other,
        period: getFieldsValue().period ? getFieldsValue().period.format('YYYY-MM') : "",
        ...defaultValue
      }

      dispatch({
        type: "VATCalculationSheetDetail/create",
        payload: {
          bizData: params,
        }

      }).then((data) => {
          if (data.success) {
            message.success(`生成${databaseName}成功`);
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
  const incomeFormItem = [
    {
      td: [
        {
          label: "所属期间",
          code: "period",
          rules: [
            {
              required: true,
              message: formValidMsg("所属期间")
            },
          ],
          getFieldDecorator,
          inputEle: <MonthPicker/>
        },
        {
          code:"taxPayerNo",
          getFieldDecorator,
          label:"编制单位",
          rules:[
            {
              required: true,
              message: formValidMsg("编制单位")
            },
          ],
          customForm:true,
          inputEle: <ModalInputSearch
          {...modalInputSearchProps({
            name: 'taxPayerNo',
            placeholder: '编制单位',
            initialDisplayValue: taxPayer,
            initialValue: taxPayerNo,
            displayName: 'taxPayer',
            modalType: 'taxpayerBody'
          })} />
        },
        {
          label: "指标类型",
          code: "indexType",
          initialValue: "",

          getFieldDecorator,
          inputEle:  <Select>
            <Option value="">请选择</Option>
            {indexTypeList.map(invoiceType => <Option key={invoiceType.id}>{invoiceType.dispValue}</Option>)}
          </Select>
        },
      ]

    },{
    td:[
      {
        label:"提取下级:",
        code:"isChild",
        initialValue:"",
        getFieldDecorator,
        rules: [
          {
            required: true,
            message: formValidMsg("提取下级")
          },
        ],
        inputEle:<Select>

          <Option value="">请选择</Option>
          <Option value="0">是</Option>
          <Option value="1">否</Option>
        </Select>
      }
    ]
    }
  ]

  const incomeFormItemProps = {
    dataSource: incomeFormItem,
    isDetail: false,
  }
  return (
    <div className="detail-list">
      <div className="op-btn-group">
        <Button onClick={onCreate}>生成</Button>
        <Button onClick={goBack}>返回</Button>
      </div>
      <Collapse className="collapse" defaultActiveKey={['1']}>
        <Panel header="生成计算表" key="1">
          <DetailList {...incomeFormItemProps}/>
        </Panel>
      </Collapse>
      {modalVisible === 'taxpayerBody' && <TaxpayerBodyModal {...TaxpayerBodyModalProps} />}

    </div>
  )
}

Create.propTypes = {
  AddInvoiceDetail: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({VATCalculationSheetDetail, loading}) => ({
  VATCalculationSheetDetail, loading
}))(Form.create()(Create))
