import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {connect} from 'dva'
import Lodash from "lodash"
import {Form, Input, Checkbox, Radio, DatePicker, Icon, Collapse, Button, Row, Col, Select, message} from 'antd'

const RadioGroup = Radio.Group;
const Option = Select.Option;
const {TextArea} = Input;
const ButtonGroup = Button.Group;
const Panel = Collapse.Panel

import {UFormItem, ModalInputSearch, DetailList} from "components"
import {PATH, formValidMsg} from "utils"

const path = PATH.BUS_BASEINFO
import TaxItemModal from "routes/baseModule/taxItemModal"
import TaxpayerBodyModal from "routes/baseModule/taxpayerBodyModal"
import BizCoaModal from "routes/baseModule/bizCoaModal"


/**
 * @description 业务配置>基础信息配置>计算表计提配置管理>新增/修改/详情页
 * @author guoqianyuan
 */

// 科目段每个弹框与之数据相关联的输入框.建议为数组，但此业务都只关联一个input,所以用字符串
const CurrentCoaTypeInputConfig = {
  drCoSegCode: "drCoSeg",
  drCostSegCode: "drCostSeg",
  drBandSegCode: "drBandSeg",
  drSegCode: "drSeg",
  drIcSegCode: "drIcSeg",
  crCoSegCode: "crCoSeg",
  crCostSegCode: "crCostSeg",
  crBandSegCode: "crBandSeg",
  crSegCode: "crSeg",
  crIcSegCode: "crIcSeg",
  taxDrCoSegCode: "taxDrCoSeg",
  taxDrCostSegCode: "taxDrCostSeg",
  taxDrBandSegCode: "taxDrBandSeg",
  taxDrSegCode: "taxDrSeg",
}


const Create = ({
                  dispatch,
                  calculateAccruedCfgCreate,
                  form: {
                    getFieldDecorator,
                    validateFields,
                    getFieldsValue,
                    setFieldsValue,
                    getFieldValue,
                  },
                }) => {
  // state or variable
  const {isMoney, formData, pageType, modalVisible, taxTypeList, taxFormTypeList, coaType, currentCoaTypeInput, taxItemTypeList} = calculateAccruedCfgCreate
  let handleDate = formData
  const databaseName = "计算表计提配置"

  const onBizCoaClear = (coaType) => {
    let formData = {}
    // 根据modal输入框类型，清空值,
    if (coaType) {
      let related = CurrentCoaTypeInputConfig[coaType]
      formData[related] = null
      formData[coaType] = null
      setFieldsValue(formData)
      validateFields([coaType])
    }

  }


  const hideModal = () => {
    dispatch({
      type: "calculateAccruedCfgCreate/updateState",
      payload: {
        modalVisible: ""
      }
    });
  }
  // methods


  const onCreate = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }

      // todo 默认值
      let defaultValue = {
        id: formData.id
      }
      const {isMoney, valueRange, ...fieldsValue} = getFieldsValue()
      //如果选择按金额进行计提
      if (isMoney) {
        fieldsValue.valueRange = valueRange
      }
      const params = {
        bizData: {
          ...fieldsValue,
          taxName: Lodash.find(taxTypeList, {taxNo: fieldsValue.taxNo}).taxName,
          itemTypeName: Lodash.find(taxItemTypeList, {fldValue: fieldsValue.itemType}).dispValue,
          ...defaultValue,
        }
      }
      let url = "calculateAccruedCfgCreate/create",
        method = ""
      if (pageType === "create") {
        method = "新增"
      } else {
        method = "修改"
      }
      dispatch({
        type: url,
        payload: params,
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

  const formItems = [
    {
      td: [
        {
          label: "纳税主体",
          code: "taxPayerNo",
          displayCode: "taxPayer",
          initialValue: handleDate.taxPayerNo,
          initialDisplayValue: handleDate.taxPayer,
          rules: [
            {
              required: true,
              message: formValidMsg("纳税主体")
            }
          ],
          getFieldDecorator,
          inputType: "modal",
          onSearchModal() {
            dispatch({
              type: "calculateAccruedCfgCreate/updateState",
              payload: {
                modalVisible: "taxpayerBody"
              }
            });
          },
          onClear() {
            let formData = {}
            // 根据modal输入框类型，清空值,
            formData.taxPayerNo = null
            formData.taxPayer = null
            setFieldsValue(formData)
            validateFields(['taxPayer'])
          }
        },
        {
          label: "税种",
          code: "taxNo",
          initialValue: pageType==='detail'?handleDate.taxName:(handleDate.taxNo ? handleDate.taxNo : (taxTypeList.length > 0 && taxTypeList[0].taxNo || "")),
          rules: [
            {
              required: true,
              message: formValidMsg("税种")
            },
          ],
          getFieldDecorator,
          inputEle: <Select onChange={e => changeTaxNo(e)}>
            {taxTypeList.map(item => (
              <Option key={item.taxNo} value={item.taxNo}>{item.taxName}</Option>
            ))}
          </Select>

        },
        {
          label: "税目",
          code: "itemNo",
          displayCode: "itemName",
          initialValue: pageType==='detail'?handleDate.itemName:handleDate.itemNo,
          initialDisplayValue: handleDate.itemName,
          rules: [
            {
              required: true,
              message: formValidMsg("税目")
            },
          ],
          getFieldDecorator,
          inputType: "modal",
          onSearchModal() {
            dispatch({
              type: "calculateAccruedCfgCreate/updateState",
              payload: {
                modalVisible: "taxItem"
              }
            });
          },
          onClear() {
            let formData = {}
            // 根据modal输入框类型，清空值,
            formData.itemName = null
            formData.itemNo = null
            setFieldsValue(formData)
            validateFields(['itemName'])
          }
        },
      ]
    },
    {
      td: [
        {
          label: "来源",
          code: "source",
          initialValue: handleDate.source,
          rules: [
            {
              required: true,
              message: formValidMsg("来源")
            }
          ],
          getFieldDecorator,
          inputEle: <Input/>
        },
        {
          label: "税目类型",
          code: "itemType",
          initialValue: pageType==='detail'?handleDate.itemTypeName:handleDate.itemType || "",
          getFieldDecorator,
          inputEle: <Select>
            <Option value="">请选择</Option>
            {taxItemTypeList.map(item => (
              <Option key={item.fldValue} value={item.fldValue}>{item.dispValue}</Option>
            ))}
          </Select>
        },
        {
          label: "表类型",
          code: "formType",
          initialValue: handleDate.formType,
          getFieldDecorator,
          inputEle: (taxFormTypeList.length > 0 ? <Select>
            {taxFormTypeList.map(item => (
              <Option key={item.formType} value={item.formType}>{item.formTypeName}</Option>
            ))}
          </Select> : <Input style={{display: 'none'}}/>)

        },
      ]
    },
    {
      td: [
        {
          label: "借方公司段编码",
          code: "drCoSegCode",
          initialValue: handleDate.drCoSegCode,
          getFieldDecorator,
          inputType: "modal",
          onSearchModal() {
            dispatch({
              type: "calculateAccruedCfgCreate/updateState",
              payload: {
                coaType: "01",
                currentCoaTypeInput: "drCoSegCode",
                modalVisible: "bizCoa"
              }
            });
          },
          onClear() {
            onBizCoaClear("drCoSegCode")
          }
        },
        {
          label: "借方公司段名称",
          code: "drCoSeg",
          initialValue: handleDate.drCoSeg,
          getFieldDecorator,
          inputEle: <Input disabled/>
        },
        {
          label: "借方专业段编码",
          code: "drBandSegCode",
          initialValue: handleDate.drBandSegCode || "00",
          getFieldDecorator,
          inputType: "modal",
          onSearchModal() {
            dispatch({
              type: "calculateAccruedCfgCreate/updateState",
              payload: {
                coaType: "03",
                currentCoaTypeInput: "drBandSegCode",
                modalVisible: "bizCoa"
              }
            });
          },
          onClear() {
            onBizCoaClear("drBandSegCode")
          }
        },
      ]
    },
    {
      td: [
        {
          label: "借方部门段编码",
          code: "drCostSegCode",
          initialValue: handleDate.drCostSegCode || '0',
          getFieldDecorator,
          inputType: "modal",
          onSearchModal() {
            dispatch({
              type: "calculateAccruedCfgCreate/updateState",
              payload: {
                coaType: "02",
                currentCoaTypeInput: "drCostSegCode",
                modalVisible: "bizCoa"
              }
            });
          },
          onClear() {
            onBizCoaClear("drCostSegCode")
          }
        },
        {
          label: "借方部门段名称",
          code: "drCostSeg",
          initialValue: handleDate.drCostSeg || "缺省",
          getFieldDecorator,
          inputEle: <Input disabled/>
        },
        {
          label: "借方专业段名称",
          code: "drBandSeg",
          initialValue: handleDate.drBandSeg || "不可分摊专业",
          getFieldDecorator,
          inputEle: <Input disabled/>
        },
      ]
    },
    {
      td: [
        {
          label: "借方科目段编码",
          code: "drSegCode",
          initialValue: handleDate.drSegCode,
          getFieldDecorator,
          inputType: "modal",
          onSearchModal() {
            dispatch({
              type: "calculateAccruedCfgCreate/updateState",
              payload: {
                coaType: "04",
                currentCoaTypeInput: "drSegCode",
                modalVisible: "bizCoa"
              }
            });
          },
          onClear() {
            onBizCoaClear("drSegCode")
          }
        },
        {
          label: "借方科目段名称",
          code: "drSeg",
          initialValue: handleDate.drSeg,
          getFieldDecorator,
          inputEle: <Input disabled/>
        },
        {
          label: "借方弹性域编码",
          code: "maskedCcid",
          initialValue: handleDate.maskedCcid,
          getFieldDecorator,
          inputEle: <Input/>
        },
      ]
    },
    {
      td: [
        {
          label: "借方往来段编码",
          code: "drIcSegCode",
          initialValue: handleDate.drIcSegCode || '0',
          getFieldDecorator,
          inputType: "modal",
          onSearchModal() {
            dispatch({
              type: "calculateAccruedCfgCreate/updateState",
              payload: {
                coaType: "05",
                currentCoaTypeInput: "drIcSegCode",
                modalVisible: "bizCoa"
              }
            });
          },
          onClear() {
            onBizCoaClear("drIcSegCode")
          }
        },
        {
          label: "借方往来段名称",
          code: "drIcSeg",
          initialValue: handleDate.drIcSeg || '缺省',
          getFieldDecorator,
          inputEle: <Input disabled/>
        },
        {
          label: "借方弹性域名称",
          code: "ccidDesc",
          initialValue: handleDate.ccidDesc,
          getFieldDecorator,
          inputEle: <Input disabled/>
        },
      ]
    },
    {
      td: [
        {
          label: "贷方公司段编码",
          code: "crCoSegCode",
          initialValue: handleDate.crCoSegCode,
          getFieldDecorator,
          inputType: "modal",
          onSearchModal() {
            dispatch({
              type: "calculateAccruedCfgCreate/updateState",
              payload: {
                coaType: "01",
                currentCoaTypeInput: "crCoSegCode",
                modalVisible: "bizCoa"
              }
            });
          },
          onClear() {
            onBizCoaClear("crCoSegCode")
          }
        },
        {
          label: "贷方公司段名称",
          code: "crCoSeg",
          initialValue: handleDate.crCoSeg,
          getFieldDecorator,
          inputEle: <Input disabled/>
        },
        {
          label: "贷方专业段编码",
          code: "crBandSegCode",
          initialValue: handleDate.crBandSegCode || "00",
          getFieldDecorator,
          inputType: "modal",
          onSearchModal() {
            dispatch({
              type: "calculateAccruedCfgCreate/updateState",
              payload: {
                coaType: "03",
                currentCoaTypeInput: "crBandSegCode",
                modalVisible: "bizCoa"
              }
            });
          },
          onClear() {
            onBizCoaClear("crBandSegCode")
          }
        },
      ]
    },
    {
      td: [
        {
          label: "贷方部门段编码",
          code: "crCostSegCode",
          initialValue: handleDate.crCostSegCode || '0',
          getFieldDecorator,
          inputType: "modal",
          onSearchModal() {
            dispatch({
              type: "calculateAccruedCfgCreate/updateState",
              payload: {
                coaType: "02",
                currentCoaTypeInput: "crCostSegCode",
                modalVisible: "bizCoa"
              }
            });
          },
          onClear() {
            onBizCoaClear("crCostSegCode")
          }
        },
        {
          label: "贷方部门段名称",
          code: "crCostSeg",
          initialValue: handleDate.crCostSeg || '缺省',
          getFieldDecorator,
          inputEle: <Input disabled/>
        },
        {
          label: "贷方专业段名称",
          code: "crBandSeg",
          initialValue: handleDate.crBandSeg || "不可分摊专业",

          getFieldDecorator,
          inputEle: <Input disabled/>
        },
      ]
    },
    {
      td: [
        {
          label: "贷方科目段编码",
          code: "crSegCode",
          initialValue: handleDate.crSegCode,

          getFieldDecorator,
          inputType: "modal",
          onSearchModal() {
            dispatch({
              type: "calculateAccruedCfgCreate/updateState",
              payload: {
                coaType: "04",
                currentCoaTypeInput: "crSegCode",
                modalVisible: "bizCoa"
              }
            });
          },
          onClear() {
            onBizCoaClear("crSegCode")
          }
        },
        {
          label: "贷方科目段名称",
          code: "crSeg",
          initialValue: handleDate.crSeg,

          getFieldDecorator,
          inputEle: <Input disabled/>
        },
        {}
      ]
    },
    {
      td: [
        {
          label: "贷方往来段编码",
          code: "crIcSegCode",
          initialValue: handleDate.crIcSegCode || '0',

          getFieldDecorator,
          inputType: "modal",
          onSearchModal() {
            dispatch({
              type: "calculateAccruedCfgCreate/updateState",
              payload: {
                coaType: "05",
                currentCoaTypeInput: "crIcSegCode",
                modalVisible: "bizCoa"
              }
            });
          },
          onClear() {
            onBizCoaClear("crIcSegCode")
          }
        },
        {
          label: "贷方往来段名称",
          code: "crIcSeg",
          initialValue: handleDate.crIcSeg || "缺省",

          getFieldDecorator,
          inputEle: <Input disabled/>
        },
        {}
      ]
    },
    {
      td: [
        {
          label: "税金支付借方科目.公司段编码",
          code: "taxDrCoSegCode",
          initialValue: handleDate.taxDrCoSegCode,
          getFieldDecorator,
          inputType: "modal",
          onSearchModal() {
            dispatch({
              type: "calculateAccruedCfgCreate/updateState",
              payload: {
                coaType: "01",
                currentCoaTypeInput: "taxDrCoSegCode",
                modalVisible: "bizCoa"
              }
            });
          },
          onClear() {
            onBizCoaClear("taxDrCoSegCode")
          }
        },
        {
          label: "税金支付借方科目.公司段名称",
          code: "taxDrCoSeg",
          initialValue: handleDate.taxDrCoSeg,
          getFieldDecorator,
          inputEle: <Input disabled/>
        },
        {
          label: "税金支付借方科目.专业段编码",
          code: "taxDrBandSegCode",
          initialValue: handleDate.taxDrBandSegCode || "00",
          getFieldDecorator,
          inputType: "modal",
          onSearchModal() {
            dispatch({
              type: "calculateAccruedCfgCreate/updateState",
              payload: {
                coaType: "03",
                currentCoaTypeInput: "taxDrBandSegCode",
                modalVisible: "bizCoa"
              }
            });
          },
          onClear() {
            onBizCoaClear("taxDrBandSegCode")
          }
        },
      ]
    },
    {
      td: [
        {
          label: "税金支付借方科目.部门段名称",
          code: "taxDrCostSeg",
          initialValue: handleDate.taxDrCostSeg || '缺省',
          getFieldDecorator,
          inputEle: <Input disabled/>
        },
        {
          label: "税金支付借方科目.部门段编码",
          code: "taxDrCostSegCode",
          initialValue: handleDate.taxDrCostSegCode || '0',
          getFieldDecorator,
          inputType: "modal",
          onSearchModal() {
            dispatch({
              type: "calculateAccruedCfgCreate/updateState",
              payload: {
                coaType: "02",
                currentCoaTypeInput: "taxDrCostSegCode",
                modalVisible: "bizCoa"
              }
            });
          },
          onClear() {
            onBizCoaClear("taxDrCostSegCode")
          }
        },
        {
          label: "税金支付借方科目.专业段名称",
          code: "taxDrBandSeg",
          initialValue: handleDate.taxDrBandSeg || "不可分摊专业",
          getFieldDecorator,
          inputEle: <Input disabled/>
        },
      ]
    },
    {
      td: [
        {
          label: "税金支付借方科目.科目段编码",
          code: "taxDrSegCode",
          initialValue: handleDate.taxDrSegCode,
          getFieldDecorator,
          inputType: "modal",
          onSearchModal() {
            dispatch({
              type: "calculateAccruedCfgCreate/updateState",
              payload: {
                coaType: "04",
                currentCoaTypeInput: "taxDrSegCode",
                modalVisible: "bizCoa"
              }
            });
          },
          onClear() {
            onBizCoaClear("taxDrSegCode")
          }
        },
        {
          label: "税金支付借方科目.科目段名称",
          code: "taxDrSeg",
          initialValue: handleDate.taxDrSeg,
          getFieldDecorator,
          inputEle: <Input disabled/>
        },
        {}

      ]
    },
    {
      td: [
        {
          label: "税金计提是否按金额进行计提",
          code: "isMoney",
          initialValue: handleDate.isMoney,
          getFieldDecorator,
          isDetail: false,
          inputEle: pageType==='detail'?<span/>:<Checkbox onChange={e => changeIsMoney(e)}/>
        },
        {
          label: "判断规则",
          code: "valueRange",
          initialValue: handleDate.valueRange || 1,
          getFieldDecorator,
          isDetail: false,
          inputEle: pageType==='detail'?<span/>:(isMoney && <RadioGroup>
            <Radio value={1}>大于0</Radio>
            <Radio value={-1}>小于0</Radio>
          </RadioGroup>)
        },
        {},
      ]
    }

  ]

  const baseInfoProps = {
    dataSource: formItems,
    isDetail: pageType === 'detail',
  }

  const goBack = () => {
    history.go(-1)
  }
  const changeTaxNo = (e) => {
    let params = {
      taxNo: e,
    }
    dispatch({
      type: 'calculateAccruedCfgCreate/taxFormType',
      payload: params,
    })
    let formData = {}
    // 根据modal输入框类型，清空值,
    formData.formType = ""
    setFieldsValue(formData)
  }

  const changeIsMoney = (e) => {
    dispatch({
      type: "calculateAccruedCfgCreate/updateState",
      payload: {
        isMoney: e.target.checked
      }
    })
  }
  // 税目
  const TaxItemModalProps = {
    taxNo: getFieldValue('taxNo'),
    onOk(data) {
      let formData = {}
      // 根据modal输入框类型，作不同的赋值
      formData.itemNo = data.itemNo
      formData.itemName = data.itemName
      setFieldsValue(formData)
      hideModal()
    },
    onCancel() {
      hideModal()
    },
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
  // 科目
  const BizCoaModalProps = {
    coaType,
    onOk(data) {
      let formData = {}
      let related = CurrentCoaTypeInputConfig[currentCoaTypeInput]

      // 根据modal输入框类型，作不同的赋值
      formData[related] = data.coaDesc
      formData[currentCoaTypeInput] = data.coaValue
      setFieldsValue(formData)
      hideModal()
    },
    onCancel() {
      hideModal()
    },
  }

  //render
  return (
    <div className="form-pane detail-list">
      <div className="form-btn-group">
        {pageType!=='detail'&&<Button onClick={onCreate}>保存</Button>}
        <Button onClick={goBack}>返回</Button>
      </div>
      <Collapse className="collapse" defaultActiveKey={['1']}>
        <Panel header="基本信息" key="1">
          <DetailList {...baseInfoProps} />
        </Panel>
      </Collapse>
      {modalVisible === 'taxItem' && <TaxItemModal {...TaxItemModalProps} />}
      {modalVisible === 'taxpayerBody' && <TaxpayerBodyModal {...TaxpayerBodyModalProps} />}
      {modalVisible === 'bizCoa' && <BizCoaModal {...BizCoaModalProps} />}
    </div>
  )
}
Create.propTypes = {
  optionStatus: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({calculateAccruedCfgCreate, loading}) => ({
  calculateAccruedCfgCreate,
  loading
}))(Form.create()(Create))

