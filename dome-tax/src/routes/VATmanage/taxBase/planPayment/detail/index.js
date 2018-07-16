import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'dva'
import Lodash from "lodash"
import { Form, Input, InputNumber, Radio,Collapse, DatePicker, Table,Button,Row,Col,Select,message } from 'antd'
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;
const Panel = Collapse.Panel;
const { MonthPicker } = DatePicker;
import moment from "moment"
import queryString from 'query-string'


import { UFormItem, ModalInputSearch } from "components"
import { PATH,formValidMsg } from "utils"
const path = PATH.VAT_TAXBASE

const Detail=({
    dispatch,
    planPaymentDetail,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        setFieldsValue,
    },
})=>{
    // state or variable
  const locationState = queryString.parse(location.search)

  const { formData, pageType, modalInputConfig, detailDatas, count, modalVisible } = planPaymentDetail
  let handleDate = formData
  const databaseName = "预收款明细"

  const formItems = [
    {
      label:"纳税主体名称",
      code:"taxPayer",
      initialValue:handleDate.taxPayer,
    },
    {
      label:"纳税主体识别号",
      code:"taxPayerNo",
      displayCode:"taxPayerNo",
    },
    {
      label:"所属时间",
      code:"period",
      initialValue:handleDate.period,
    },
    {
      label:"项目名称",
      code:"itemName",
      initialValue:handleDate.itemName,
    },
  ]
    console.log(detailDatas)
  //下面table中的columns
    const columns = [
    {
      title: "收入确认期间",
      dataIndex: "period",
      render: (text, record) => {
        return (record.approvalStatus==3?<span>{record.period}</span>:
          <MonthPicker
            defaultValue={moment(record.period)}
            onBlur={e => {record.period = e.target.value;}}/>
        );
      }
    },
    {
      title: "预收税款金额",
      dataIndex: "amount",
      render: (text, record) => {
        return (record.id?<span>{record.amount}</span>:
          <Input
            defaultValue={record.amount}
            onBlur={e => {record.amount = e.target.value;}}/>
        );
      }
    },
    {
      title: "税额",
      dataIndex: "taxAmount",
      render: (text, record) => {
        return (record.id?<span>{record.taxAmount}</span>:
            <InputNumber
              defaultValue={record.taxAmount}
              onBlur={e => {
                record.taxAmount = e.target.value;
              }}
            />
        );
      }
    },
    {
      title: "收入确认金额",
      dataIndex: "confirmAmount",
      render: (text, record) => {
        return (record.approvalStatus==3?<span>{record.confirmAmount}</span>:
            <InputNumber
              style={{width:'200px'}}
              defaultValue={record.confirmAmount}
              onBlur={e => {
                record.confirmAmount = e.target.value;
              }}
            />
        );
      }
    },
    {
      title: "收入确认税金",
      dataIndex: "confirmTaxAmount",
      render: (text, record) => {
        return (record.confirmTaxAmount==3?<span>{record.confirmTaxAmount}</span>:
            <InputNumber
              style={{width:'200px'}}
              defaultValue={record.confirmTaxAmount}
              onBlur={e => {
                record.confirmTaxAmount = e.target.value;
              }}
            />
        );
      }
    },
    {
      title: "状态",
      dataIndex: "approvalStatus",
      width: 100,
      render: (text, record) => {
        return (
            <span>{record.approvalStatusName}</span>
        );
      }
    },
    {
      title: "",
      dataIndex: "operate",
      width: 120,
      render: (text, record) => {
        return (
          record.id?<span/>:<Button onClick={()=>onDelete(record)}>删除</Button>
        );
      }
    },
  ];

    // methods
    //点击添加按钮触发,新增一个newData,赋给detailDatas,并让count也就是number加一,在更新给后台的数据
    const onAddDetail = () => {
      const newData = {
        id:null,
        key: count,
        period: moment(),
        amount: "",
        taxAmount: "",
        confirmAmount: "",
        confirmTaxAmount: "",
        approvalStatus: 1,
        approvalStatusName: "草稿",
      };
      dispatch({
        type: "planPaymentDetail/updateState",
        payload: {
          detailDatas: [...detailDatas, newData],
          count: count + 1
        }
      });

    };

    //删除功能
    const onDelete = (record) => {
      dispatch({
        type: "planPaymentDetail/updateState",
        payload: {
          //删除当前项
          detailDatas: detailDatas.filter(item => item.key !== record.key),
          count: count - 1,
        }
      });

    };

    const onCreate= ()=>{
      validateFields((errors) => {
        if (errors) {
          return
        }

        const newDetailDatas = detailDatas.map(item=>{
          return {
            id:item.id,
            period:moment(item.period).format("YYYY-MM"),
            confirmAmount:item.confirmAmount||2.34,
            confirmTaxAmount:item.confirmTaxAmount||2.34,
            amount:item.amount||2.34,
            taxAmount:item.taxAmount||2.34,
          }
        })

        // 校验
        // 1. 详情列表中是否有值为空
        if(!Lodash.some(newDetailDatas,item=>{
            return item.period&&item.confirmAmount&&item.confirmTaxAmount
          })){
          message.warning("请检查收入确认期间、收入确认金额、收入确认税金是否为空！");
          return
        }
        // 2. 收入确认期间不能有重复月份
        if(Lodash.uniqBy(newDetailDatas, 'period').length !== newDetailDatas.length){
          message.warning("收入确认期间不能有重复月份！");
          return
        }

        const data = {
          id:locationState.id,
          bizData: newDetailDatas,
        }
        let url = "planPaymentDetail/saveAndUpdate"
        let method = "修改"

        dispatch({
          type: url,
          payload:data,
        }).then((data) =>{
            if(data.success){
              message.success(`${method}${databaseName}成功`);
              // goBack()
            }else{
              message.error(data.message);
            }
          }

        )
      })
    }
    const goBack=()=>{
      history.go(-1)
    }


    //render
    return(
        <div className="form-pane detail-list">
            <div className="form-btn-group">
              <Button onClick={onCreate} >保存</Button>
              <Button onClick={goBack} >返回</Button>
            </div>
            <Collapse className="collapse" defaultActiveKey={['1']}>
              <Panel header="基本信息" key="1">
                <Form>
                  <Row gutter={24} type="flex" className='message'>
                    {
                      formItems.map((item,index) => (
                        <Col span={8} key={index}>
                          <UFormItem {...item} isDetail={pageType==='detail'}></UFormItem>
                        </Col>
                      ))
                    }
                  </Row>
                </Form>
              </Panel>
            </Collapse>
            <Collapse className="collapse" defaultActiveKey={['1']}>
              <Panel header="查询结果" key="1">
              <div className="detailTable">
                <div className="op-btn-group">
                  <Button onClick={onAddDetail}>添加</Button>
                </div>
                <Table bordered dataSource={detailDatas} columns={columns} rowKey={(record)=>record.key}/>
              </div>
              </Panel>
            </Collapse>
        </div>
    )
}
Detail.propTypes = {
  optionStatus: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({ planPaymentDetail, loading }) => ({ planPaymentDetail, loading })) (Form.create()(Detail))

