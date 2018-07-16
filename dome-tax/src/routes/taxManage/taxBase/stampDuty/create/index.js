import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { routerRedux,History } from 'dva/router'
import moment from 'moment'
import classnames from 'classnames'
import { connect } from 'dva'
import { Form, Input, InputNumber, DatePicker, Icon, Button, Row, Col, Select, message, Collapse } from 'antd'
const Option = Select.Option;
const { MonthPicker } = DatePicker;
const { TextArea } = Input;
const Panel = Collapse.Panel
const ButtonGroup = Button.Group;
import { DetailList, ModalInputSearch } from "components"
import { PATH,formValidMsg } from "utils"
const path = PATH.CUSTOMER_FORM
const Create=({
    dispatch,
    stampDutyCreate,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
    },
    onSearchModal,
    onClearModal,
})=>{
    // state or variable
  const { formData, pageType, modalInputConfig, isDetail } = stampDutyCreate
  const databaseName = "数据源"
  const modalInputSearchProps = ({name,placeholder,initialValue,dataSource,submitData}) =>{
    return {
      onSearchModal(){
        onSearchModal(name)
      },
      onClear(){
        onClearModal(name)
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

  let formItems = [
    {
      td:[
        {
          label:"所属期间:",
          code:"period",
          initialValue:formData.period && ( isDetail ? formData.period : moment(formData.period,'YYYY-MM') ),
          rules:[
            {
              required: true,
              message: formValidMsg("所属期间")
            },
          ],
          getFieldDecorator,
          inputEle:<MonthPicker />
        },
        {
          label:"公司名称：",
          code:"groupName",
          initialValue:formData.groupName,
          rules:[
            {
              required: true,
              message: formValidMsg("公司名称")
            },
          ],
          getFieldDecorator,
          customForm:true,
          inputEle: <ModalInputSearch
                      {...modalInputSearchProps({
                        name:'groupName',
                        initialValue:formData.groupName
                      })} />
        },
      ]
    },
    {
      td:[
        {
          label:"纳税主体",
          code:"taxPayer",
          initialValue:formData.taxPayer,
          rules:[
            {
              required: true,
              message: formValidMsg("纳税主体")
            },
          ],
          getFieldDecorator,
          inputEle:<Input disabled={true}/>
        },
        {
          label:"纳税主体识别号：",
          code:"taxPayerNo",
          initialValue:formData.taxPayerNo,
          rules:[
            {
              required: true,
              message: formValidMsg("纳税主体识别号")
            },
          ],
          getFieldDecorator,
          inputEle:<Input disabled={true}/>
        },
      ]
    },
    {
      td:[
        {
          label:"合同编号：",
          code:"contractNo",
          initialValue:formData.contractNo,
          rules:[
            {
              required: true,
              message: formValidMsg("合同编号")
            },
          ],
          getFieldDecorator,
          inputEle:<ModalInputSearch
                    {...modalInputSearchProps({
                      name:'contractNo',
                      initialValue:formData.contractNo
                    })} />
        },
        {
          label:"合同名称",
          code:"contractName",
          initialValue:formData.contractName,
          rules:[
            {
              required: true,
              message: formValidMsg("合同名称")
            },
          ],
          getFieldDecorator,
          inputEle:<Input disabled={true}/>
        },
      ]
    },
    {
      td:[
        {
          label:"检定日期",
          code:"signatureDate",
          initialValue:formData.signatureDate && ( isDetail ? formData.signatureDate : moment(formData.period,'YYYY-MM-DD') ),
          rules:[
            {
              required: true,
              message: formValidMsg("检定日期")
            },
          ],
          getFieldDecorator,
          inputEle:<DatePicker />
        },
        {
          label:"合同类型：",
          code:"contractType",
          initialValue:formData.contractType ,
          rules:[
            {
              required: true,
              message: formValidMsg("合同类型")
            },
          ],
          getFieldDecorator,
          inputEle:<Select
                      showSearch
                      optionFilterProp="children"
                    >
                      <Option value="0">请选择</Option>
                      <Option value="2">加工承揽合同</Option>
                      <Option value="3">建设工程勘察设计合同</Option>
                      <Option value="4">建筑安装工程承包合同</Option>
                      <Option value="5">财产租赁合同</Option>
                      <Option value="6">货物运输合同</Option>
                      <Option value="7">仓库保管合同</Option>
                      <Option value="8">借款合同</Option>
                      <Option value="9">财产保险合同</Option>
                      <Option value="10">技术合同</Option>
                      <Option value="11">产权转移书据</Option>
                      <Option value="12">记载资金的营业账簿</Option>
                      <Option value="13">权利、许可证照</Option>
                      <Option value="14">非记载自己的英特账簿</Option>
                      <Option value="15">其他</Option>
                    </Select>
        },
      ]
    },
    {
      td:[
        {
          label:"签约主体：",
          code:"signature",
          initialValue:formData.signature,
          rules:[
            {
              required: true,
              message: formValidMsg("签约主体")
            },
          ],
          getFieldDecorator,
          inputEle:<Input />
        },
        {
          label:"对方单位名称：",
          code:"vendorName",
          initialValue:formData.vendorName,
          rules:[
            {
              required: true,
              message: formValidMsg("对方单位名称")
            },
          ],
          getFieldDecorator,
          inputEle:<Input />
        },
      ]
    },
    {
      td:[
        {
          label:"合同金额：",
          code:"contractAmt",
          initialValue:formData.contractAmt,
          rules:[
            {
              required: true,
              message: formValidMsg("合同金额")
            },
          ],
          getFieldDecorator,
          inputEle:<Input disabled={true}/>
        },
        {
          label:"税目：",
          code:"itemName",
          initialValue:formData.itemName,
          rules:[
            {
              required: true,
              message: formValidMsg("税目")
            },
          ],
          getFieldDecorator,
          inputEle:<Select
                      showSearch
                      optionFilterProp="children"
                    >
                      <Option value="1">请选择</Option>
                      <Option value="2">加工承揽合同</Option>
                      <Option value="3">建设工程勘察设计合同</Option>
                      <Option value="4">建筑安装工程承包合同</Option>
                      <Option value="5">财产租赁合同</Option>
                      <Option value="6">货物运输合同</Option>
                      <Option value="7">仓库保管合同</Option>
                      <Option value="8">借款合同</Option>
                      <Option value="9">财产保险合同</Option>
                      <Option value="10">技术合同</Option>
                      <Option value="11">产权转移书据</Option>
                      <Option value="12">记载资金的营业账簿</Option>
                      <Option value="13">权利、许可证照</Option>
                      <Option value="14">非记载自己的英特账簿</Option>
                      <Option value="15">其他</Option>
                    </Select>
        },
      ]
    },
    {
      td:[
        {
          label:"税率：",
          code:"rate",
          initialValue:formData.rate,
          rules:[
            {
              required: true,
              message: formValidMsg("税率")
            },
          ],
          getFieldDecorator,
          inputEle:<Input disabled={true}/>
        },
        {
          label:"印花税额：",
          code:"taxAmt",
          initialValue:formData.taxAmt,
          rules:[
            {
              required: true,
              message: formValidMsg("印花税额")
            },
          ],
          getFieldDecorator,
          inputEle:<Input/>
        },
      ]
    },
    {
      td:[
        {
          label:"是否为框架合同：",
          code:"isFrame",
          initialValue:formData.isFrame,
          rules:[
            {
              required: true,
              message: formValidMsg("是否为框架合同")
            },
          ],
          getFieldDecorator,
          inputEle:<Select
                    showSearch
                    optionFilterProp="children"
                  >
                    <Option value="">请选择</Option>
                    <Option value="0">否</Option>
                    <Option value="1">是</Option>
                  </Select>
        },
        {
          label:"纳税执行状态：",
          code:"execTaxStatus",
          initialValue:formData.execTaxStatus,
          rules:[
            {
              required: true,
              message: formValidMsg("纳税执行状态")
            },
          ],
          getFieldDecorator,
          inputEle:<Select
                      showSearch
                      optionFilterProp="children"
                    >
                      <Option value="">请选择</Option>
                      <Option value="01">未生成计算表</Option>
                      <Option value="02">已生成计算表</Option>
                      <Option value="03">已申成申报表</Option>
                      <Option value="04">已申报并已缴纳</Option>
                      <Option value="05">已缴纳未计提</Option>
                    </Select>
        },
      ]
    }
    
  ]
  // methods
  const onCreate= ()=>{
    validateFields((errors) => {
      if (errors) {
        return
      }
      let fields = getFieldsValue();
      // todo 默认值
      let defaultValue={
          id:formData.id,
          period:fields.period.format('YYYY-MM'),
          signatureDate:fields.signatureDate.format('YYYY-MM-DD'),
      }
      const data = {
        ...fields,
        ...defaultValue
      }
      dispatch({
        type: 'stampDutyCreate/save',
        payload:{
          data
        },
      })
    })
  }
  const goBack=()=>{
    history.go(-1)
  }

  const DetailListProps = {
    dataSource:formItems,
    isDetail,
  }

  //render
  return(
    <Fragment>
      <div className="op-btn-group">
        {pageType!=='detail'&&<Button onClick={onCreate} >保存</Button>}
        <Button onClick={goBack} >返回</Button>
      </div>
      <div className="detail-list">
        <Collapse className="collapse" defaultActiveKey={['1']}>
          <Panel header="基本信息" key="1">
            <DetailList {...DetailListProps}/>
          </Panel>
        </Collapse>
      </div>
    </Fragment>
  )
}
Create.propTypes = {
  optionStatus: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({ stampDutyCreate, loading }) => ({ stampDutyCreate, loading })) (Form.create()(Create))

