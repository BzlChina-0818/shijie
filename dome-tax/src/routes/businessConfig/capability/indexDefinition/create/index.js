import React, { Fargment } from 'react'
import { connect } from 'dva'
import { routerRedux, History } from 'dva/router'
import { Collapse, Button, Input, Form, Select, Checkbox } from 'antd'
import { DetailList }  from 'components'
import { formValidMsg } from "utils"
import SelectGroup from './selectGroup'
import Design from './design'
import { BusinessType, tblname } from '../dataConfig'

const { TextArea } = Input;
const Panel = Collapse.Panel
const Option = Select.Option

const indexDefinitionCreate = ({
  definitionCreate,
  dispatch,
  form:{
    getFieldDecorator,
    getFieldsValue,
    validateFields, 
  },
  pageType,
}) => {
  let { RadioValue, formData } = definitionCreate
  const BusinessTypeJSX = Object.keys(BusinessType).map(key => <Option key={key} value={key}>{BusinessType[key]}</Option>)       
  const tblnameJSX = Object.keys(tblname).map(key => <Option key={key} value={key}>{tblname[key]}</Option>)          
  const onIncreased = () => {
    let field = getFieldsValue();
    if(field.frmlist){
      field.frmlist = field.frmlist.join(',');
    } 
    if(field.frmlist2 ){
      field.frmlist2 = field.frmlist2.join(',');
    }
    validateFields((errors) => {
      if (errors) {
        return
      }
      dispatch({
        type:'definitionCreate/query',
        payload:{
          bizData:{
            ...field
          }
        }
      })
    })
  }

  const onBack = () => {
    history.go(-1);
  }

  const handleChange = () =>{
    console.log(1)
  }

  const basic = [
    {
      td:[
        {
          label:"指标编码",
          code:"indNo",
          initialValue: formData.indNo,
          rules:[
            {
              required: true,
              message: formValidMsg("指标编码")
            },
          ],
          getFieldDecorator,
          inputEle: <Input />
        },
        {
          label:"指标名称",
          code:"indName",
          initialValue: formData.indName,
          rules:[
            {
              required: true,
              message: formValidMsg("指标名称")
            },
          ],
          getFieldDecorator,
          inputEle: <Input />
        },
        {
          label:"指标分类",
          code:"classes",
          initialValue: formData.classes,
          rules:[
            {
              required: true,
              message: formValidMsg("指标分类")
            },
          ],
          getFieldDecorator,
          inputEle: <Select>
                      <Option value="">请选择</Option>
                      {BusinessTypeJSX}
                    </Select>
        },
      ]
    },
    {
      td:[
        {
          label:"倒挤标识:",
          code:"revFlag",
          initialValue: formData.revFlag,
          getFieldDecorator,
          inputEle: <Select>
                      <Option value="">请选择</Option>
                      <Option value="0">不倒挤</Option>
                      <Option value="1">只按期间倒挤</Option>
                      <Option value="2">只按单位倒挤</Option>
                    </Select>
        },
        {
          label:"指标类型",
          code:"indType",
          initialValue: formData.indType,
          getFieldDecorator,
          inputEle: <Select>
                      <Option value="">请选择</Option>
                      <Option value="0">省本部使用</Option>
                      <Option value="1">所得税会中数据</Option>
                    </Select>
        },
        {
          label:"统计类型:",
          code:"summaryType",
          initialValue: formData.summaryType,
          getFieldDecorator,
          inputEle: <Select>
                      <Option value="">请选择</Option>
                      <Option value="1">求和</Option>
                      <Option value="2">求平均值</Option>
                      <Option value="3">求最大值</Option>
                      <Option value="4">求最小值</Option>
                      <Option value="5">求计数</Option>
                    </Select>
        },
      ]
    },
    {
      td:[
        {
          label:"数据来源:",
          code:"sourceTable",
          initialValue: formData.sourceTable,
          rules:[
            {
              required: true,
              message: formValidMsg("数据来源")
            },
          ],
          getFieldDecorator,
          inputEle: <Select>
                      {tblnameJSX}
                    </Select>
        },
        {
          label:"来源数据项:",
          code:"sourceFiled",
          initialValue: formData.sourceFiled,
          rules:[
            {
              required: true,
              message: formValidMsg("来源数据项")
            },
          ],
          getFieldDecorator,
          inputEle: <Input />
        },
        {
          label:"当前有效状态:",
          code:"isValid",
          initialValue: formData.isValid,
          getFieldDecorator,
          inputEle: <Select>
                      <Option value="">请选择</Option>
                      <Option value="1">有效</Option>
                      <Option value="0">失效</Option>
                    </Select>
        },
      ]
    },
    {
      td:[
        {
          label:"是否多期间取数:",
          code:"periodFlag",
          initialValue: formData.periodFlag,
          getFieldDecorator,
          inputEle: <Checkbox/>
        },
        {
          label:"其他条件:",
          code:"appendSqlAtr",
          initialValue: formData.appendSqlAtr,
          getFieldDecorator,
          inputEle: <Input />
        },
        {
          label:"是否累计:",
          code:"cumFlag",
          initialValue: formData.cumFlag,
          getFieldDecorator,
          inputEle: <Checkbox/>
        },
      ]
    },
    {
      entireLine:true,
      td:[
        {
          label:"运行期间条件:",
          code:"dynSqlStr",
          initialValue: formData.dynSqlStr,
          getFieldDecorator,
          inputEle: <Input/>
        },
      ]
    },
  ]

  const formula = [
    {
      td:[
        {
          label:"指标编码:",
          code:"indNo",
          initialValue: formData.indNo,
          rules:[
            {
              required: true,
              message: formValidMsg("对方单位名称")
            },
          ],
          getFieldDecorator,
          inputEle: <Input />
        },
        {
          label:"指标名称:",
          code:"indName",
          initialValue: formData.indName,
          rules:[
            {
              required: true,
              message: formValidMsg("对方单位名称")
            },
          ],
          getFieldDecorator,
          inputEle: <Input />
        },
        {
          code:"classes", 
          codeLabel:true,
          inputEle: <SelectGroup formData={formData} getFieldDecorator={getFieldDecorator}/>,
        },
      ]
    },
    {
      td:[
        {
          label:"指标类型:",
          code:"indType",
          initialValue: formData.indType,
          getFieldDecorator,
          inputEle: <Select>
                      <Option value="">请选择</Option>
                      <Option value="12">省本部使用</Option>
                      <Option value="14">所得税汇总数据</Option>
                    </Select>
        },
        {
          label:"倒挤标识:",
          code:"revFlag",
          initialValue: formData.revFlag,
          getFieldDecorator,
          inputEle: <Select>
                      <Option value="0">不到挤</Option>
                      <Option value="1">只按期间倒挤</Option>
                      <Option value="2">只按单位倒挤</Option>
                    </Select>
        },
        {
          label:"期间调整:",
          code:"adjust",
          initialValue: formData.adjust,
          getFieldDecorator,
          inputEle: <Input/>
        },
      ]
    },
    {
      td:[
       
        {
          label:"汇总逻辑:",
          code:"sumType",
          initialValue: formData.sumType,
          getFieldDecorator,
          inputEle: <Select>
                      <Option value="">请选择</Option>
                      <Option value="12">省本部使用</Option>
                      <Option value="14">所得税汇总数据</Option>
                    </Select>
        },
        {
          label:'是否多期间取数',
          code:"periodFlag",
          initialValue: formData.periodFlag,
          getFieldDecorator,
          inputEle: <Checkbox></Checkbox>
        },
        {
          label:"是否累计:",
          code:"cumFlag",
          initialValue: formData.cumFlag,
          getFieldDecorator,
          inputEle: <Checkbox></Checkbox>,
        },
      ]
    },
    {
      entireLine:true,
      td:[
        {
          label:"计算公式:",
          code:"express1",
          initialValue: formData.express1,
          getFieldDecorator,
          inputEle: <Design />
        }
      ]
    }
  ]

  const handwork = [
    {
      td:[
        {
          label:"指标编码:",
          code:"indNo",
          initialValue: formData.indNo,
          rules:[
            {
              required: true,
              message: formValidMsg("指标编码")
            },
          ],
          getFieldDecorator,
          inputEle: <Input />
        },
        {
          label:"指标名称:",
          code:"indName",
          initialValue: formData.indName,
          rules:[
            {
              required: true,
              message: formValidMsg("指标名称")
            },
          ],
          getFieldDecorator,
          inputEle: <Input />
        },
        {
          label:"指标分类:",
          code:"classes",
          initialValue: formData.classes,
          rules:[
            {
              required: true,
              message: formValidMsg("指标分类")
            },
          ],
          getFieldDecorator,
          inputEle: <Select>
                      <Option value="">请选择</Option>
                      {BusinessTypeJSX}
                    </Select>
        },
      ]
    },
    {
      td:[
        {
          label:"倒挤标识",
          code:"revFlag",
          initialValue: formData.revFlag,
          getFieldDecorator,
          inputEle: <Select>
                      <Option value="">请选择</Option>
                      <Option value="0">不倒挤</Option>
                    </Select>
        },
        {
          label:"倒挤标识",
          code:"indType",
          initialValue: formData.indType,
          getFieldDecorator,
          inputEle: <Select>
                      <Option value="">请选择</Option>
                      <Option value="12">省本部使用</Option>
                      <Option value="14">所得税汇总数据</Option>
                    </Select>
        },
      ]
    }
  ]

  const modalInputConfig = {
    '1': {
      dataSource:basic,
    },
    '2': {
      dataSource:formula,
    },
    '3': {
      dataSource:handwork,
    }
  }

  return (
    <div className="detail-list">
      <div className="op-btn-group">
        <Button onClick={onIncreased}>保存</Button>
        <Button onClick={onBack}>返回</Button>
      </div>
      <Collapse className="collapse" defaultActiveKey={['1']} >
        <Panel header="基本信息" key="1">
          <DetailList {...modalInputConfig[RadioValue]}/> 
        </Panel>
      </Collapse>
    </div>
  ) 
}

export default connect(({definitionCreate, loading}) => ({definitionCreate, loading}))(Form.create()(indexDefinitionCreate))