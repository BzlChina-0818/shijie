// 登记信息发票添加发票行模块
import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux,History} from 'dva/router'
import { connect } from 'dva'
import { Form, Button, Row, Col, DatePicker, Input, Icon,Select,Table } from 'antd'
import {message} from "antd/lib/index";
import { Page,SelectModal} from 'components'
import queryString from 'query-string'
import { PATH } from "utils"
const path = PATH.ENTRY_INVOICE
const ButtonGroup = Button.Group;
const Option = Select.Option;
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
  span:8,
  style: {
    marginBottom: 16,
  },
}
const AddInvoice = ({
  location, dispatch, addInvoice, loading,
  form:{
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const{detailDatas,count,ruleTypes,rates,formData}=addInvoice
  const invoiceLineState=queryString.parse(location.state)
  const onAddDetail=()=>{
    const newData = {
      key: count,
      productCode:null,
      productName: "",
      noTaxAmount: "",
      taxAmount: "",
      sumAmount: "",
      rate: "",
      ruleType: 1,
    }
    dispatch({
      type: "addInvoice/updateState",
      payload: {
        detailDatas: [...detailDatas, newData],
        count: count + 1,
        ruleTypes:[]
      }
    });
  }
  const onDelete = (record, e) => {
    dispatch({
      type: "addInvoice/updateState",
      payload: {
        //删除当前项
        detailDatas: detailDatas.filter(item => item.key !== record.key),
        count: count - 1,
      }
    });
  }
  const rateChange = (record, value) => {
    if(record&&value){
      record.rate=value
      //计算金额税率总额
      if(record.noTaxAmount!=''&&record.noTaxAmount!=null){
          record.taxAmount=Number(value)*Number(record.noTaxAmount)/100
          record.sumAmount = record.taxAmount+Number(record.noTaxAmount);
          dispatch({
            type: "addInvoice/updateState",
          });
      }
    }
    const ruleType='ruleType_'+Number(value)/100
    dispatch({
      type:'addInvoice/getRuleType',
      payload:{
          dictId:ruleType
      }
    })
  };
  const rateChange1=(key)=>{
    const ruleType='ruleType_'+Number(key)/100
    dispatch({
      type:'addInvoice/getRuleType',
      payload:{
          dictId:ruleType
      }
    })
  }
  const ruleTypeChange = (record, value) => {
    record.ruleType=value
  };
  const columns = [
    {
      title: "货物或应税劳务、服务名称",
      dataIndex: "productName",
      render: (text, record) => {
        return (
          <Input
            defaultValue={record.productName}
            onBlur={e => {
              record.productName = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: "税率",
      dataIndex: "rate",
      width:200,
      render: (text, record) => {
        return (
          <Select
            // dropdownMatchSelectWidth={false}
            style={{width: "200px"}}
            placeholder="请选择"
            onChange={rateChange.bind(null, record)}
          >
            {rates&&rates.map(item => {
              return <Option key={item.fldValue}>{item.dispValue}</Option>;
            })}
          </Select>
        );
      }
    },
    {
      title: "类别",
      dataIndex: "ruleType",
      width:250,
      render: (text, record) => {
        return (
          <Select
            // dropdownMatchSelectWidth={false}
            style={{width: "250px"}}
            defaultValue={record.fldValue}
            placeholder="请选择"
            onChange={ruleTypeChange.bind(null, record)}
          >
            {ruleTypes&&ruleTypes.map(item => {
              return <Option key={item.fldValue}>{item.dispValue}</Option>;
            })}
          </Select>
        );
      }
    },
    {
      title: "金额",
      dataIndex: "noTaxAmount",
      render: (text, record) => {
        return (
          <Input style={{width: "100px"}}
             defaultValue={record.noTaxAmount}
             type="number"
             onBlur={e => {
              record.noTaxAmount=Number(e.target.value)
               console.log(record.rate)
               if(record.rate){
                  record.taxAmount=Number(e.target.value)*Number(record.rate)/100
                  record.sumAmount = Number(e.target.value)+Number(record.taxAmount);   
              } 
              dispatch({
                type: "addInvoice/updateState",
              }); 
            }}
          />
        );
      }
    },
    {
      title: "税额",
      dataIndex: "taxAmount",
      render: (text, record) => {
        return (
          <Input style={{width: "100px"}}
              disabled
             value={record.taxAmount}
          />
        );
      }
    },
    {
      title: "总金额",
      dataIndex: "sumAmount",
      render: (text, record) => {
        return (
          <Input style={{width: "100px"}}
           disabled
            value={record.sumAmount}
          />
        );
      }
    },
    {
      title: "操作",
      dataIndex: "operation",
      render: (text, record) => {
        return detailDatas.length > 0 ? (
          <Button onClick={e => onDelete(record, e)}>删除</Button>
        ) : null;
      }
    }
  ];
  const handleFields = (fields) => {
    const { makeInvoiceDate } = fields
    if (makeInvoiceDate&&makeInvoiceDate!=null) {
      fields.makeInvoiceDate = makeInvoiceDate.format('YYYY-MM-DD HH:mm:ss');
    }
    return fields
  }
  const onSave=()=>{
    validateFields(errors => {
      if (errors) {
        return;
      }
        const invoiceLineList = detailDatas.map(item=>{
          const {key,...other} = item
          return other
        })
        // if(invoiceLineState.invoiceType==='01'){
        //  const payload={//新增
        //     bizData:{
        //       invoiceBatch:invoiceLineState.invoiceBatch,
        //       ...fields,
        //       invInvoiceLineDetailOutVO:invoiceLineList
        //     }  
        //   }
        // }else{
        //  const payload={///修改
        //     bizData:{
        //       invoiceBatch:invoiceLineState.invoiceBatch,
        //       ...fields,
        //       invInvoiceLineDetailOutVO:invoiceLineList,
        //       formId:invoiceLineState.formId,
        //     }  
        //   }
        // }
        let fields = getFieldsValue()
        fields=handleFields(fields)
        dispatch({
          type:"addInvoice/saveInvoiceLine",
          payload:{
            bizData:{
              invoiceBatch:invoiceLineState.invoiceBatch, 
              ...fields,
              invInvoiceLineDetailOutVO:invoiceLineList
            }  
          }
        }).then(data => {
          if (data.success&&data.code===1000) {
            message.success(`新增发票行成功`);
            onBack();
          } else {
            message.error(data.message);
          }
        });
      });
  }
  const onSaveAdd=()=>{
    onSave()
    dispatch({
      type: "addInvoice/updateState",
      payload: {
        detailDatas: [],
        count: 0
      }
    });
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
  }
  const onBack=()=>{
    history.go(-1)
  }
  return (
    <Page inner> 
      <div className="op-btn-group">
        <Button onClick={onSave}>保存</Button>
        <Button onClick={onSaveAdd}>保存并新增</Button>
        <Button onClick={onBack}>返回</Button>
      </div>
      <div className="condition-filter">
      {/* 增值税专票 */}
      {invoiceLineState.invoiceType==='01'&&<Form>
        <Row gutter={24}>
              <Col {...ColProps} >
                <FormItem {...formItemLayout} label="发票代码">
                  {getFieldDecorator('invoiceCode', { initialValue: formData.invoiceCode,
                    rules: [
                      {
                        required: true,
                        len:10,
                        message:"发票代码必须为十位"
                      },
                    ],
                })(<Input />)}
                </FormItem>
              </Col>
              <Col {...ColProps} >
                <FormItem {...formItemLayout} label="发票号码">
                  {getFieldDecorator('invoiceNum', { initialValue: formData.invoiceNum,
                  rules: [
                    {
                      required: true,
                      len:9,
                      message:"发票号码必须为9位"
                    },
                  ],})(<Input />)}
                </FormItem>
              </Col>
              <Col {...ColProps} >
                <FormItem {...formItemLayout} label="开票日期">
                  {getFieldDecorator('makeInvoiceDate', { initialValue: formData.makeInvoiceDate ,
                  rules: [
                    {
                      required: true,
                      message:"输出开票日期"
                    },
                  ],
                })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
                </FormItem>
              </Col>
            </Row>
        </Form>}
        {/* 非增值税专票和非增值税普票情况 */}
        {invoiceLineState.invoiceType!='02'&&invoiceLineState.invoiceType!='01'&&<Form>
        <Row gutter={24}>
              <Col {...ColProps} >
                <FormItem {...formItemLayout} label="发票代码">
                  {getFieldDecorator('invoiceCode', { initialValue: formData.invoiceCode,
                    rules: [
                      {
                        required: true,
                        len:10,
                        message:"发票代码必须为十位"
                      },
                    ],
                })(<Input />)}
                </FormItem>
              </Col>
              <Col {...ColProps} >
                <FormItem {...formItemLayout} label="发票号码">
                  {getFieldDecorator('invoiceNum', { initialValue: formData.invoiceNum,
                  rules: [
                    {
                      required: true,
                      len:9,
                      message:"发票号码必须为9位"
                    },
                  ],})(<Input />)}
                </FormItem>
              </Col>
              <Col {...ColProps} >
                <FormItem {...formItemLayout} label="开票日期">
                  {getFieldDecorator('makeInvoiceDate', { initialValue: formData.makeInvoiceDate,
                  rules: [
                    {
                      required: true,
                      message:"输出开票日期"
                    },
                  ],
                })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
                </FormItem>
              </Col>
              <Col {...ColProps} >
                <FormItem {...formItemLayout} label="校验码(后六位)">
                  {getFieldDecorator('verifierCode', { initialValue: formData.noTaxAmount ,
                  rules: [
                    {
                      required: true,
                      message:"校验码不能为空"
                    },
                  ],
                })(<Input />)}
                </FormItem>
              </Col>
              <Col {...ColProps} >
                <FormItem {...formItemLayout} label="金额">
                  {getFieldDecorator('noTaxAmount', { initialValue: formData.noTaxAmount ,
                  rules: [
                    {
                      required: true,
                      message:"金额不能为空"
                    },
                  ],
                })(<Input />)}
                </FormItem>
              </Col>
              <Col {...ColProps} >
                <FormItem {...formItemLayout} label="税率">
                  {getFieldDecorator('rate', { initialValue: formData.rate,
                  rules: [
                    {
                      required: true,
                      message:"税率不能为空"
                    },
                  ],
                })(<Select
                  placeholder="请选择" onChange={rateChange1}
                >
                  {rates&&rates.map(item => {
                    return <Option key={item.fldValue}>{item.dispValue}</Option>;
                  })}
                </Select>)}
                </FormItem>
              </Col>
              <Col {...ColProps} >
                <FormItem {...formItemLayout} label="税额">
                  {getFieldDecorator('taxAmount', { initialValue: formData.taxAmount,
                  rules: [
                    {
                      required: true,
                      message:"税额不能为空"
                    },
                  ],
                })(<Input />)}
                </FormItem>
              </Col>
              <Col {...ColProps} >
                <FormItem {...formItemLayout} label="价税合计">
                  {getFieldDecorator('sumAmount', { initialValue:formData.sumAmount,
                  rules: [
                    {
                      required: true,
                      message:"价税合计不能为空"
                    },
                  ],
                })(<Input />)}
                </FormItem>
              </Col>
              <Col {...ColProps} >
                <FormItem {...formItemLayout} label="类别">
                  {getFieldDecorator('ruleType', { initialValue: formData.ruleType ,
                  rules: [
                    {
                      required: true,
                      message:"选择类别"
                    },
                  ],
                })(<Select
                  placeholder="请选择"
                >
                  {ruleTypes&&ruleTypes.map(item => {
                    return <Option key={item.fldValue}>{item.dispValue}</Option>;
                  })}
                </Select>)}
                </FormItem>
              </Col>
            </Row>
        </Form>}
        {invoiceLineState.invoiceType=='02'&&<Form>
        <Row gutter={24}>
              <Col {...ColProps} >
                <FormItem {...formItemLayout} label="发票代码">
                  {getFieldDecorator('invoiceCode', { initialValue: formData.invoiceCode,
                    rules: [
                      {
                        required: true,
                        len:10,
                        message:"发票代码必须为十位"
                      },
                    ],
                })(<Input />)}
                </FormItem>
              </Col>
              <Col {...ColProps} >
                <FormItem {...formItemLayout} label="发票号码">
                  {getFieldDecorator('invoiceNum', { initialValue: formData.invoiceNum,
                  rules: [
                    {
                      required: true,
                      len:9,
                      message:"发票号码必须为9位"
                    },
                  ],})(<Input />)}
                </FormItem>
              </Col>
              <Col {...ColProps} >
                <FormItem {...formItemLayout} label="开票日期">
                  {getFieldDecorator('makeInvoiceDate', { initialValue: formData.makeInvoiceDate,
                  rules: [
                    {
                      required: true,
                      message:"输出开票日期"
                    },
                  ],
                })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
                </FormItem>
              </Col>
              <Col {...ColProps} >
                <FormItem {...formItemLayout} label="校验码(后六位)">
                  {getFieldDecorator('verifierCode', { initialValue: formData.noTaxAmount ,
                  rules: [
                    {
                      required: true,
                      message:"校验码不能为空"
                    },
                  ],
                })(<Input />)}
                </FormItem>
              </Col>
              <Col {...ColProps} >
                <FormItem {...formItemLayout} label="金额">
                  {getFieldDecorator('noTaxAmount', { initialValue: formData.noTaxAmount ,
                  rules: [
                    {
                      required: true,
                      message:"金额不能为空"
                    },
                  ],
                })(<Input />)}
                </FormItem>
              </Col>
              <Col {...ColProps} >
                <FormItem {...formItemLayout} label="普票类型">
                  {getFieldDecorator('rate', { initialValue: formData.ruleType,
                  rules: [
                    {
                      required: true,
                      message:"税率不能为空"
                    },
                  ],
                })(<Select
                  placeholder="请选择" onChange={rateChange1}
                >
                    <Option key=''>请选择</Option>
                    <Option key='1'>电子普通发票</Option>
                    <Option key='2'>普通发票</Option>
                  })}
                </Select>)}
                </FormItem>
              </Col>
            </Row>
            </Form>}
        </div>
        {invoiceLineState.invoiceType==='01'&&<div className="content-list">
          <div style={{height:'24px',lineHeight:'24px',border:'1px solid #ccc',paddingLeft:'20px'}}>详情</div>
          <div className="op-btn-group">
            <Button onClick={onAddDetail}>添加</Button>
          </div>
          {invoiceLineState.edit? <Table bordered dataSource={formData.invInvoiceLineDetailOutVO} columns={columns}/>:<Table bordered dataSource={detailDatas} columns={columns}/>}
        </div>}
    </Page>
  )
}
AddInvoice.propTypes = {
  addInvoice: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({addInvoice,loading }) => ({ addInvoice,loading }))(Form.create()(AddInvoice))
