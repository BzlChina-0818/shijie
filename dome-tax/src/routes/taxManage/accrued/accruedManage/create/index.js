import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'dva'
import Lodash from "lodash"
import { Form, Input, InputNumber, Radio,Collapse, Icon, Table,Button,Row,Col,Select,message } from 'antd'
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;
const Panel = Collapse.Panel;
const ButtonGroup = Button.Group;
import { UFormItem, ModalInputSearch, DetailList } from "components"
import { PATH,formValidMsg } from "utils"
const path = PATH.TAX_ACCRUED

import GroupTreeModal from "routes/baseModule/groupTreeModal"
const Create=({
    dispatch,
    taxFeeAccruedManageCreate,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        setFieldsValue,
    },
})=>{

    // state or variable
  const { formData, pageType, modalVisible, detailDatas, count } = taxFeeAccruedManageCreate
  let handleDate=formData

  const databaseName = "税金计提"

  const formItems = [
    {
      td : [
        {
          label:"制单人",
          code:"taxPayerNo",
          initialValue:handleDate.taxPayerNo,
          getFieldDecorator,
          inputEle:<p>{handleDate.taxPayerNo}</p>,
        },
        {
          label:"归属公司",
          code:"itemNo",
          initialValue:handleDate.itemNo,
          getFieldDecorator,
          inputEle:<p>{handleDate.taxPayerNo}</p>,
        },
      ]
    },
    {
      td : [
        {
          label:"部门",
          code:"taxPayerNo",
          initialValue:handleDate.taxPayerNo,
          getFieldDecorator,
          inputEle:<p>{handleDate.taxPayerNo}</p>,
        },
        {
          label:"日记账头信息",
          code:"itemNo",
          initialValue:handleDate.itemNo,
          getFieldDecorator,
          inputEle:<Input/>,
        },
      ]
    },
    {
      td : [
        {
          label:"创建日期",
          code:"taxPayerNo",
          initialValue:handleDate.taxPayerNo,
          getFieldDecorator,
          inputEle:<p>{handleDate.taxPayerNo}</p>,
        },
        {
          label:"计提总额",
          code:"itemNo",
          initialValue:handleDate.itemNo,
          getFieldDecorator,
          inputEle:<Input disabled />,
        },
      ]
    },
  ]

  //下面table中的columns
  const columns = [
    {
      title: "借方全成本指标",
      dataIndex: "period",
      render: (text, record) => {
        return (
          <Input
            style={{width:'200px'}}
            defaultValue={record.period}
            onBlur={e => {
              record.period = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: "借方公司段",
      dataIndex: "rate",
      render: (text, record) => {
        return (
          <div>
            <Input
              style={{width:'200px'}}
              defaultValue={record.rate}
              onBlur={e => {
                record.rate = e.target.value;
              }}
            /> %
          </div>
        );
      }
    },
    {
      title: "借方专业",
      dataIndex: "rate",
      render: (text, record) => {
        return (
          <div>
            <Input
              style={{width:'200px'}}
              defaultValue={record.rate}
              onBlur={e => {
                record.rate = e.target.value;
              }}
            /> %
          </div>
        );
      }
    },
    {
      title: "借方成本中心",
      dataIndex: "rate",
      render: (text, record) => {
        return (
          <div>
            <Input
              style={{width:'200px'}}
              defaultValue={record.rate}
              onBlur={e => {
                record.rate = e.target.value;
              }}
            /> %
          </div>
        );
      }
    },
    {
      title: "借方往来",
      dataIndex: "rate",
      render: (text, record) => {
        return (
          <div>
            <Input
              style={{width:'200px'}}
              defaultValue={record.rate}
              onBlur={e => {
                record.rate = e.target.value;
              }}
            /> %
          </div>
        );
      }
    },
    {
      title: "借方科目",
      dataIndex: "rate",
      render: (text, record) => {
        return (
          <div>
            <Input
              style={{width:'200px'}}
              defaultValue={record.rate}
              onBlur={e => {
                record.rate = e.target.value;
              }}
            /> %
          </div>
        );
      }
    },
    {
      title: "借方金额",
      dataIndex: "rate",
      render: (text, record) => {
        return (
          <div>
            <Input
              style={{width:'200px'}}
              defaultValue={record.rate}
              onBlur={e => {
                record.rate = e.target.value;
              }}
            /> %
          </div>
        );
      }
    },
    {
      title: "贷方全成本指标",
      dataIndex: "rate",
      render: (text, record) => {
        return (
          <div>
            <Input
              style={{width:'200px'}}
              defaultValue={record.rate}
              onBlur={e => {
                record.rate = e.target.value;
              }}
            /> %
          </div>
        );
      }
    },
    {
      title: "贷方公司段",
      dataIndex: "rate",
      render: (text, record) => {
        return (
          <div>
            <Input
              style={{width:'200px'}}
              defaultValue={record.rate}
              onBlur={e => {
                record.rate = e.target.value;
              }}
            /> %
          </div>
        );
      }
    },
    {
      title: "贷方专业",
      dataIndex: "rate",
      render: (text, record) => {
        return (
          <div>
            <Input
              style={{width:'200px'}}
              defaultValue={record.rate}
              onBlur={e => {
                record.rate = e.target.value;
              }}
            /> %
          </div>
        );
      }
    },
    {
      title: "贷方成本中心",
      dataIndex: "rate",
      render: (text, record) => {
        return (
          <div>
            <Input
              style={{width:'200px'}}
              defaultValue={record.rate}
              onBlur={e => {
                record.rate = e.target.value;
              }}
            /> %
          </div>
        );
      }
    },
    {
      title: "贷方往来",
      dataIndex: "rate",
      render: (text, record) => {
        return (
          <div>
            <Input
              style={{width:'200px'}}
              defaultValue={record.rate}
              onBlur={e => {
                record.rate = e.target.value;
              }}
            /> %
          </div>
        );
      }
    },
    {
      title: "贷方科目",
      dataIndex: "rate",
      render: (text, record) => {
        return (
          <div>
            <Input
              style={{width:'200px'}}
              defaultValue={record.rate}
              onBlur={e => {
                record.rate = e.target.value;
              }}
            /> %
          </div>
        );
      }
    },
    {
      title: "贷方金额",
      dataIndex: "rate",
      render: (text, record) => {
        return (
          <div>
            <Input
              style={{width:'200px'}}
              defaultValue={record.rate}
              onBlur={e => {
                record.rate = e.target.value;
              }}
            /> %
          </div>
        );
      }
    },
    {
      title: "行摘要",
      dataIndex: "rate",
      render: (text, record) => {
        return (
          <div>
            <Input
              style={{width:'200px'}}
              defaultValue={record.rate}
              onBlur={e => {
                record.rate = e.target.value;
              }}
            /> %
          </div>
        );
      }
    }
  ];

  const modalProps = {
    onOk (data) {
      let formData = {}
      // 根据modal输入框类型，作不同的赋值

      formData.groupNo = data.code
      formData.groupName = data.name
      setFieldsValue(formData)

      dispatch({
        type: 'taxFeeAccruedManage/hideModal',
      })
    },
    onCancel () {
      dispatch({
        type: 'taxFeeAccruedManage/hideModal',
      })
    },
  }
    // methods
  //点击添加按钮触发,新增一个newData,赋给detailDatas,并让count也就是number加一,在更新给后台的数据
    const onAddDetail = () => {
      const newData = {
        seqNo: count,
        period: "",
        rate: "",
      };
      dispatch({
        type: "summaryTransferCreate/updateState",
        payload: {
          detailDatas: [...detailDatas, newData],
          count: count + 1
        }
      });

    };

    //删除功能
    const onDelete = () => {
      if(count>1){
        detailDatas.pop()
        dispatch({
          type: "summaryTransferCreate/updateState",
          payload: {
            //删除当前项
            detailDatas: detailDatas,
            count: count - 1,
          }
        });
      }

    };

    const onCreate= ()=>{
      validateFields((errors) => {
        if (errors) {
          return
        }

        // todo 默认值
        // 去掉详情列表中的key字段
        const newDetailDatas = detailDatas.map(item=>{
          const {key,...other} = item
          return other
        })
        let defaultValue={
            housedutyCode:formData.housedutyCode
        }
        const {groupName,...other} = getFieldsValue()
        const data = {
          bizData:{
            detailList:newDetailDatas,
            ...other,
            ...defaultValue,
          }
        }
        let url = "",
            method = ""
        if(pageType==="create"){
            url = "taxFeeAccruedManageCreate/create"
            method = "新增"
        }else{
            url = "taxFeeAccruedManageCreate/update"
            method = "修改"
        }
        dispatch({
          type: url,
          payload:data,
        }).then((data) =>{
            if(data.success){
              message.success(`${method}${databaseName}成功`);
              goBack()
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
    const baseInfoProps = {
      dataSource:formItems,
      isDetail:pageType==='detail',
    }

    //render
    return(
        <div className="form-pane detail-list">
            <div className="form-btn-group">
              <Button onClick={onCreate} >保存</Button>
              <Button onClick={goBack} >返回</Button>
            </div>
            <Collapse className="collapse mb10" defaultActiveKey={['1']} >
              <Panel header="基本信息" key="1">
                <DetailList {...baseInfoProps} />
              </Panel>
            </Collapse>
            <Collapse className="collapse" defaultActiveKey={['1']} >
              <Panel header="计提行信息" key="1">
                <div className="detailTable">
                  <div className="form-btn-group">
                    <Button onClick={onAddDetail}>添加</Button>
                    <Button onClick={onDelete}>删除</Button>
                  </div>
                  <Table bordered dataSource={detailDatas} columns={columns} rowKey={record=>record.seqNo}/>
                </div>
              </Panel>
            </Collapse>
            {modalVisible&&<GroupTreeModal {...modalProps} />}
        </div>
    )
}
Create.propTypes = {
  optionStatus: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({ taxFeeAccruedManageCreate, loading }) => ({ taxFeeAccruedManageCreate, loading })) (Form.create()(Create))

