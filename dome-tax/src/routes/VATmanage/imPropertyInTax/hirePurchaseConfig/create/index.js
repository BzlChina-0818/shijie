import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'dva'
import Lodash from "lodash"
import { Form, Input, InputNumber, Radio,Collapse, Icon, Table,Button,Row,Col,Select,message } from 'antd'
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;
const ButtonGroup = Button.Group;
const Panel = Collapse.Panel;

import { UFormItem, ModalInputSearch } from "components"
import { PATH,formValidMsg } from "utils"
const path = PATH.VAT_IMPROPERTYINTAX

import GroupTreeModal from "routes/baseModule/groupTreeModal"
const Create=({
    dispatch,
    hirePurchaseConfigCreate,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
      setFieldsValue,
    },
})=>{
    // state or variable
  const { formData, pageType, modalInputConfig, detailDatas, count, modalVisible } = hirePurchaseConfigCreate
  let handleDate=formData
  console.log(handleDate)
  const databaseName = "不动产进项税配置"

  let formItems = [
    {
      label:"不动产进项税编号",
      code:"housedutyCode",
      initialValue:handleDate.housedutyCode,
      rules:[
        {
          required: true,
          message: formValidMsg("不动产进项税编号")
        }
      ],
      getFieldDecorator,
      inputEle:<Input  disabled />
    },
    {
      label:"公司名称",
      code:"groupNo",
      displayCode:"groupName",
      initialValue:handleDate.groupNo,
      initialDisplayValue:handleDate.groupName,
      rules:[
        {
          required: true,
          message: formValidMsg("公司名称")
        },
      ],
      getFieldDecorator,
      inputType: "modal",
      onSearchModal() {
        dispatch({
          type: "hirePurchaseConfigCreate/showModal",
        });
      },
      onClear() {
        let formData = {}

        // 根据modal输入框类型，清空值,
        formData.groupNo = null
        formData.groupName = null
        setFieldsValue(formData)
        validateFields(['groupNo'])
      }
    },
    {
      label:"启用状态",
      code:"status",
      initialValue:pageType=='detail'?(handleDate.status==1?"启用":"未启用"):(handleDate.status?handleDate.status+"":"1"),
      rules:[
        {
          required: true,
          message: formValidMsg("启用状态")
        },
      ],
      getFieldDecorator,
      inputEle:<RadioGroup name="status">
        <Radio value="1">启用</Radio>
        <Radio value="0">未启用</Radio>
      </RadioGroup>
    },
  ]

  //下面table中的columns
  const columns = [
    {
      title: "序号",
      dataIndex: "seqNo",
      render: (text) => {
        return (
          <p>{text}</p>
        );
      }
    },
    {
      title: "抵扣周期",
      dataIndex: "period",
      render: (text, record) => {
        return (
          <InputNumber
            style={{width:'200px'}}
            min={1} max={99}
            defaultValue={record.period}
            onBlur={e => {
              record.period = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: "抵扣比例",
      dataIndex: "rate",
      render: (text, record) => {
        return (
          <div>
            <InputNumber
              style={{width:'200px'}}
              min={1} max={99}
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
        type: 'hirePurchaseConfigCreate/hideModal',
      })
    },
    onCancel () {
      dispatch({
        type: 'hirePurchaseConfigCreate/hideModal',
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
        type: "hirePurchaseConfigCreate/updateState",
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
          type: "hirePurchaseConfigCreate/updateState",
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
            url = "hirePurchaseConfigCreate/create"
            method = "新增"
        }else{
            url = "hirePurchaseConfigCreate/update"
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
export default connect(({ hirePurchaseConfigCreate, loading }) => ({ hirePurchaseConfigCreate, loading })) (Form.create()(Create))

