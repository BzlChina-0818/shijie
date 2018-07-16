import React, { Fragment } from 'react'
import moment from 'moment'
import { Collapse, Button, Input, Form, DatePicker, InputNumber, message, Select } from 'antd'
import { connect } from 'dva'
import { ModalInputSearch } from "components"
import { formValidMsg } from "utils"
import { DetailList } from 'components'
import TaxpayerBodyModal from '../../../../baseModule/taxpayerBodyModal'
import styles from './index.less'

const { TextArea } = Input
const { MonthPicker } = DatePicker
const Panel = Collapse.Panel
const Option = Select.Option

const Create = ({
                  houseTaxCreate,
                  form:{
                    getFieldDecorator,
                    getFieldsValue,
                    validateFields, 
                  },
                  dispatch,
                }) => {
  let { formData, pageType } = houseTaxCreate
  const modalInputSearchProps = ({name,placeholder,initialValue,dataSource,submitData}) =>{
    return {
      onSearchModal(){
        dispatch({
          type:'houseTaxCreate/updateState',
          payload:{
            pageType:name
          }
        })
      },
      onClear(){
        dispatch({
          type:'houseTaxCreate/setFromData',
          payload:{
            period:'',
            groupName:'',
            taxPayerNo:'',
          }
        })
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

  const basicInfor = [
    {
      td:[
        {
          label:"所属期间",
          code:"period",
          initialValue: formData.period && (pageType==='detail' ? formData.period : moment(formData.period,'YYYY-MM')),
          rules:[
            {
              required: true,
              message: formValidMsg("对方单位名称")
            },
          ],
          getFieldDecorator,
          inputEle: <MonthPicker />
        },
        {
          code:"groupName",
          getFieldDecorator,
          label:"公司名称",
          initialValue:formData.groupName,
          rules:[
            {
              required: true,
              message: formValidMsg("对方单位名称")
            },
          ],
          
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
              message: formValidMsg("对方单位名称")
            },
          ],
          getFieldDecorator,
          inputEle:<Input disabled={true}/>
        },
        {
          label:"纳税主体识别号",
          code:"taxPayerNo",
          initialValue:formData.taxPayerNo,
          rules:[
            {
              required: true,
              message: formValidMsg("对方单位名称")
            },
          ],
          getFieldDecorator,
          inputEle:<Input disabled={true}/>
        },
      ]
    },
  ];

  const oracleAssets = [
    {
      td:[
        {
          label:"资产编码:",
          code:"assetNo",
          initialValue:formData.assetNo,
          rules:[
            {
              required: true,
              message: formValidMsg("资产编码")
            },
          ],
          getFieldDecorator,
          inputEle:<Input />
        },
        {
          label:"资产名称:",
          code:"assetName",
          initialValue:formData.assetName,
          rules:[
            {
              required: true,
              message: formValidMsg("资产名称")
            },
          ],
          getFieldDecorator,
          inputEle:<Input />
        }
      ]
    },
    {
      td:[
        {
          label:"房屋坐落:",
          code:"location",
          initialValue:formData.location,
          rules:[
            {
              required: true,
              message: formValidMsg("房屋坐落")
            },
          ],
          getFieldDecorator,
          inputEle:<Input />
        },
        {
          label:"产权证号:",
          code:"houseCertNo",
          initialValue:formData.houseCertNo,
          rules:[
            {
              required: true,
              message: formValidMsg("产权证号")
            },
          ],
          getFieldDecorator,
          inputEle:<Input />
        }
      ]
    },
    {
      td:[
        {
          label:"资产状态:",
          code:"assetState",
          initialValue:formData.assetState,
          rules:[
            {
              required: true,
              message: formValidMsg("资产状态")
            },
          ],
          getFieldDecorator,
          inputEle:<Select>
                    <Option value="">请选择</Option>
                    <Option value="1">在用</Option>
                    <Option value="2">报废</Option>
                  </Select>
        },
        {
          label:"扣除率:",
          code:"deductRatio",
          initialValue:formData.deductRatio,
          rules:[
            {
              required: true,
              message: formValidMsg("扣除率")
            },
          ],
          getFieldDecorator,
          inputEle:<InputNumber />
        },
      ]
    },
    {
      td:[
        {
          label:"房屋原值:",
          code:"initialAmt",
          initialValue:formData.initialAmt,
          rules:[
            {
              required: true,
              message: formValidMsg("房屋原值")
            },
          ],
          getFieldDecorator,
          inputEle:<InputNumber/>
        },
        {
          label:"免税原值:",
          code:"freeAmtForTax",
          initialValue:formData.freeAmtForTax,
          rules:[
            {
              required: true,
              message: formValidMsg("免税原值")
            },
          ],
          getFieldDecorator,
          inputEle:<InputNumber />
        }
      ]
    },
    {
      td:[
        {
          label:"数量:",
          code:"area",
          initialValue:formData.area,
          rules:[
            {
              required: true,
              message: formValidMsg("数量")
            },
          ],
          getFieldDecorator,
          inputEle:<InputNumber />
        },
        {
          label:"资产属性:",
          code:"assetProp",
          initialValue:formData.assetProp,
          getFieldDecorator,
          inputEle:<Select>
                      <Option value="">请选择</Option>
                      <Option value="01">划拨地</Option>
                      <Option value="02">出让地</Option>
                      <Option value="03">授权经营</Option>
                    </Select>
        }
      ]
    },
    {
      td:[
        {
          label:"启用时间:",
          code:"startTimeTax",
          initialValue:formData.startTimeTax && (pageType==='detail' ? formData.startTimeTax :moment(formData.startTimeTax, 'YYYY-MM-DD')),
          rules:[
            {
              required: true,
              message: formValidMsg("资产属性")
            },
          ],
          getFieldDecorator,
          inputEle:<DatePicker />
        },
        {
          label:"报废日期:",
          code:"failDate",
          initialValue:formData.failDate && (pageType==='detail' ? formData.failDate : moment(formData.failDate, 'YYYY-MM-DD')),
          getFieldDecorator,
          inputEle:<DatePicker />
        }
      ]
    },
  ]
  
  const Manually = [
    {
      td:[
        {
          label:"出租面积:",
          code:"rentArea",
          initialValue:formData.rentArea,
          getFieldDecorator,
          inputEle:<InputNumber />
        },
        {
          label:"出租原值：:",
          code:"rentAmt",
          initialValue:formData.rentAmt,
          getFieldDecorator,
          inputEle:<InputNumber />
        },
      ]
    },
    {
      td:[
        {
          label:"月租金收入:",
          code:"monthIncome",
          initialValue:formData.monthIncome,
          getFieldDecorator,
          inputEle:<InputNumber />
        },
        {
          label:"出租合同号:",
          code:"rentContrNo",
          initialValue:formData.rentContrNo,
          getFieldDecorator,
          inputEle:<Input />
        },
      ]
    },
    {
      td:[
        {
          label:"对方单位名称:",
          code:"clientName",
          initialValue:formData.clientName,
          getFieldDecorator,
          inputEle:<Input />
        },
        {
          label:"资产类别:",
          code:"assetType",
          initialValue:formData.assetType,
          getFieldDecorator,
          inputEle:<Input />
        },
      ]
    },
    {
      td:[
        {
          label:"单位:",
          code:"unit",
          initialValue:formData.unit,
          getFieldDecorator,
          inputEle:<Input />
        },
        {
          code:"1",
        },
      ]
    },
    {
      entireLine:true,
      td:[
        {
          label:"备注:",
          code:"remark",
          initialValue:formData.remark,
          getFieldDecorator,
          inputEle: <TextArea autosize />
        }
      ]
    },
  ]

  const onBack = () => {
    history.go(-1);
  }

  const handleFields = (fields) => {
    const { period, startTimeTax } = fields
    
    if (period) {
      fields.period = period.format('YYYY-MM')
    }
    if (startTimeTax) {
      fields.startTimeTax = startTimeTax.format('YYYY-MM-DD')
    }
    return fields
  }

  const onSave = () => {
    let files = getFieldsValue();
    files = handleFields(files)
    validateFields((errors) => {
      if (errors) {
        return
      }
     
    })
  }

  const basicInforProps = {
    dataSource:basicInfor,
    isDetail:pageType==='detail',
  }
  const oracleAssetsProps = {
    dataSource:oracleAssets,
    isDetail:pageType==='detail',
  }
  const ManuallyProps = {
    dataSource:Manually,
    isDetail: pageType==='detail',
  }

  const ModalProps = {
    groupName:{
      onOk(recode){
        dispatch({
          type:'houseTaxCreate/setFromData',
          payload:{
            ...recode
          }
        })
        dispatch({
          type:'houseTaxCreate/updateState',
          payload:{
            pageType:''
          }
        })
      },
      onCancel(){
        dispatch({
          type:'houseTaxCreate/updateState',
          payload:{
            pageType:''
          }
        })
      }
    }
  }

  return (
    <div className="detail-list">
      <div className="op-btn-group">
        { 
          pageType !== 'detail' && <Button className="margin-right" onClick={onSave}>保存</Button>
        }
        <Button className="margin-right" onClick={onBack}>返回</Button>
      </div>
      <Collapse className="collapse" defaultActiveKey={['1']} >
        <Panel header="基本信息" key="1">
          <DetailList {...basicInforProps}/>
        </Panel>
      </Collapse>
      <Collapse className="collapse" defaultActiveKey={['1']}>
        <Panel header="ERP核心系统资产模块" key="1">
          <DetailList {...oracleAssetsProps}/>
        </Panel>
      </Collapse>
      <Collapse className="collapse" defaultActiveKey={['1']}>
        <Panel header="手工录入" key="1">
          <DetailList {...ManuallyProps}/>
        </Panel>
      </Collapse>
      { pageType === 'groupName' && <TaxpayerBodyModal {...ModalProps[pageType]}></TaxpayerBodyModal> }
    </div>
  )
}

export default connect(({houseTaxCreate}) => ({houseTaxCreate}))(Form.create()(Create))