import React from "react";
import PropTypes from "prop-types";
import {routerRedux} from "dva/router";
import {connect} from "dva";
import Lodash from "lodash";
import { Form, Input, Select, Button, Row, Col, Table, Radio, Collapse } from "antd";
import { Page, ModalInputSearch, FilterItem,CustomTable,DropOption,UFormItem } from "components";
import queryString from "query-string";
import {} from "components";
import Modal from "./Modal";
import classnames from "classnames";
import {PATH, formValidMsg} from "utils";
import {message} from "antd/lib/index";
import dataConfig from "../dataConfig"
const RadioGroup = Radio.Group;
const path = PATH.CUSTOMER_FORM;
const FormItem = Form.Item;
const Option = Select.Option;
const Panel = Collapse.Panel;

import styles from "./index.less"

/**
 * @description 动态表单>功能定义
 * @author linxiaonan + guoqianyuan
 */
const Create = ({
                  dispatch,
                  actionCreate,
                  location,
                  loading,
                  form: {getFieldDecorator, validateFields, getFieldsValue}
                }) => {
  const {
    modalVisible, formData, pageType,  count, detailDatas, choiceModalInput, dataListObject,  modalInputConfig, columnDataOrigin
  } = actionCreate

  const databaseName = "功能定义"
  const locationState = queryString.parse(location.search)

  const {datasourceId="",datasourceCode=""} = locationState
  const actionId = locationState.id

  // 通过配置字典渲染Select下拉框内容
  const {functionTypeList,buttonTypeList,functionPositionList} = dataConfig
  const functionTypeListJSX = Object.keys(functionTypeList).map(key => <Option key={key} value={key}>{functionTypeList[key]}</Option>)
  const buttonTypeListJSX = Object.keys(buttonTypeList).map(key => <Option key={key} value={key}>{buttonTypeList[key]}</Option>)
  const functionPositionListJSX = Object.keys(functionPositionList).map(key => <Option key={key} value={key}>{functionPositionList[key]}</Option>)
  // 表单默认值
  const {functionType='1',buttonType='SAVE',functionPosition='1',isShow='1',isValid='1'} = formData

  //点击添加按钮触发,新增一个newData,赋给detailDatas,并让count也就是number加一,在更新给后台的数据
  const onAddDetail = () => {
    const newData = {
      key: count,
      datacolCode: "",
      datacolName: "",
      datacolSort: "",
      isModify: "1",
      inputMode: "1",
      valueSet: "",
      isValid: "1",
      isShow: "1",
      isPk: "0",
      isRequired: "1"
    };
    dispatch({
      type: "actionCreate/updateState",
      payload: {
        detailDatas: [...detailDatas, newData],
        count: count + 1
      }
    });

  };
  //当选中模态框后调用接口,返回当前biztable所对应的值,数组
  let DataTableNameList = actionCreate.columnData;
  /*过滤数据表名对象 */
  const onFilterBizList = record => {
    const value = record.datacolCode;
    // 过滤已选择datacolCode的行
    const chooseDatacolCodes = Lodash.filter(detailDatas, data => {
      return data.key != record.key && data.datacolCode;
    });
    // 从过滤后的数组中取出datacolCode并组成数组
    const codes = Lodash.map(chooseDatacolCodes, "datacolCode");
    //对后台得到的DataTableNameList做过滤,互斥
    const newColumnList = DataTableNameList.filter(item => {
      return codes.indexOf(item.datacolCode) == -1;
    });

    dispatch({
      type: "actionCreate/updateState",
      payload: {
        columnData: newColumnList
      }
    });
  };
  const onChangeDatacolCode = (record, value) => {
    //从数组中获取当前列对应的对象
    let an = DataTableNameList.find(item => {
      return item.datacolCode == value;
    });
    record.datacolName = an.datacolName;
    record.datacolCode = value;
    const newTableDate = [...detailDatas];
    newTableDate[record.key] = record;
    dispatch({
      type: "actionCreate/updateState",
      payload: {
        detailDatas: newTableDate
      }
    });
  };
  const handleChangeSelect = (record, value) => {
    record.inputMode = value;
    dataListObject.push(record);
    dispatch({
      type: "actionCreate/updateState",
      payload: {
        dataListObject
      }
    });
  };
  // 基础表单
  const formItems = [
    {
      label: "功能代码",
      code: "functionCode",
      initialValue: formData.functionCode,
      rules: [
        {
          required: true,
          message: formValidMsg("功能代码")
        },
        {
          validator: (rule, value, callback) => {
            let params = {
              bizData:{
                id:formData.id,
                datasourceId,
                functionCode:value
              }

            }
            dispatch({
              type: 'actionCreate/uniqueData',
              payload:params,
            }).then((data) => {
              if(data.code===1010){
                callback(`功能代码${value}已存在`);
              }else {
                callback()
              }
            })
          }
        }
      ],
      getFieldDecorator,
      inputEle: <Input/>
    },
    {
      label: "功能名称",
      code: "functionName",
      initialValue: formData.functionName,
      rules: [
        {
          required: true,
          message: formValidMsg("功能名称")
        }
      ],
      getFieldDecorator,
      inputEle: <Input/>
    },
    {
      label: "功能分类",
      code: "functionType",
      initialValue: pageType=='detail'?(functionTypeList[functionType]):functionType+'',
      rules: [
        {
          required: true,
          message: formValidMsg("功能分类")
        }
      ],
      getFieldDecorator,
      inputEle: (
        <Select>
          {functionTypeListJSX}
        </Select>
      )
    },
    {
      label: "按钮分类",
      code: "buttonType",
      initialValue:  pageType=='detail'?(buttonTypeList[buttonType]):buttonType+'',
      rules: [
        {
          required: true,
          message: formValidMsg("按钮分类")
        }
      ],
      getFieldDecorator,
      inputEle: (
        <Select>
          {buttonTypeListJSX}
        </Select>
      )
    },
    {
      label: "功能位置",
      code: "functionPosition",
      initialValue:  pageType=='detail'?(functionPositionList[functionPosition]):functionPosition+'',
      rules: [
        {
          required: true,
          message: formValidMsg("功能位置")
        }
      ],
      getFieldDecorator,
      inputEle: (
        <Select>
          {functionPositionListJSX}
        </Select>
      )
    },
    {
      label: "是否显示",
      code: "isShow",
      initialValue: pageType=='detail'?(isShow==1?"是":"否"):isShow+'',
      rules: [
        {
          required: true,
          message: formValidMsg("是否显示", "select")
        }
      ],
      getFieldDecorator,
      inputEle: (
        <RadioGroup
          name="isShow"
        >
          <Radio value="1">是</Radio>
          <Radio value="0">否</Radio>
        </RadioGroup>
      )
    },
    {
      label: "是否启用",
      code: "isValid",
      initialValue: pageType=='detail'?(isValid==1?"是":"否"):isValid+'',
      rules: [
        {
          required: true,
          message: formValidMsg("是否启用", "select")
        }
      ],
      getFieldDecorator,
      inputEle: (
        <RadioGroup  name="isValid">
          <Radio value="1">是</Radio>
          <Radio value="0">否</Radio>
        </RadioGroup>
      )
    },
    {
      label: "对应值集",
      code: "valueSet",
      initialValue: formData.valueSet,
      getFieldDecorator,
      inputEle: <Input/>
    },
    {
      label: "数据表名对象",
      code: "bizTable",
      initialValue: formData.bizTable || "",
      getFieldDecorator,
      inputType: "modal",
      onSearchModal() {
        dispatch({
          type: "actionCreate/showModal",
          payload: {
            choiceModalInput: "bizTable"
          }
        });
        dispatch({
          type: "actionCreate/queryListModal",
          payload: {
            page: 1,
            pageSize: 10
          }
        });
      },
      onClear(name) {
        // 根据modal输入框类型，清空值,
        let associateInputs = modalInputConfig[name].associateInput;
        associateInputs.forEach(item => {
          formData[item.formName] = undefined;
        });
        // 更新formData
        dispatch({
          type: "actionCreate/selectSuccess",
          payload: formData
        });
      }
    }
  ];

  //下面table中的columns
  const columns = [
    {
      title: "数据列",
      dataIndex: "datacolCode",
      render: (text, record) => {
        return (
          <Select
            disabled={pageType==='detail'}
            dropdownMatchSelectWidth={false}
            style={{width: "90px"}}
            defaultValue={record.datacolCode}
            onChange={onChangeDatacolCode.bind(null, record)}
            onFocus={e => onFilterBizList(record, e)}
          >
            {DataTableNameList.map(item => {
              return <Option key={item.datacolCode}>{item.datacolCode}</Option>;
            })}
          </Select>
        );
      }
    },
    {
      title: "数据列名",
      dataIndex: "datacolName",
      render: (text, record) => {
        return (
          <Input
            disabled={pageType==='detail'}

            defaultValue={record.datacolName}
            onBlur={e => {
              record.datacolName = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: "排列顺序",
      dataIndex: "datacolSort",
      render: (text, record) => {
        return (
          <Input
            disabled={pageType==='detail'}

            defaultValue={record.datacolSort}
            onBlur={e => {
              record.datacolSort = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: "是否允许修改",
      dataIndex: "isModify",
      render: (text, record) => {
        return (
          <RadioGroup
            disabled={pageType==='detail'}

            style={{width: "107px"}}
            name="isModify"
            defaultValue={record.isModify+''}
            onChange={e => {
              record.isModify = e.target.value;
            }}
          >
            <Radio value="1">是</Radio>
            <Radio value="0">否</Radio>
          </RadioGroup>
        );
      }
    },
    {
      title: "输入方式",
      dataIndex: "inputMode",
      render: (text, record) => {
        return (
          <Select
            disabled={pageType==='detail'}

            style={{width: "100px"}}
            defaultValue={record.inputMode}
            onChange={handleChangeSelect.bind(null, record)}
          >
            <Option value="1">手工录入</Option>
            <Option value="2">下拉列表</Option>
            <Option value="3">下拉列表(多选)</Option>
            <Option value="4">列表选择</Option>
            <Option value="5">列表选择(多选)</Option>
            <Option value="6">日期(弹出框)</Option>
            <Option value="7">期间(弹出框)</Option>
          </Select>
        );
      }
    },
    {
      title: "对应值集或序列",
      dataIndex: "valueSet",
      render: (text, record) => {
        return (
          <Input style={{width: "100px"}}
                 disabled={pageType==='detail'}

                 defaultValue={record.valueSet}
             onBlur={e => {
              record.valueSet = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: "是否应用",
      dataIndex: "isValid",
      render: (text, record) => {
        return (
          <RadioGroup
            disabled={pageType==='detail'}

            style={{width: "107px"}}
            name="isValid"
            defaultValue={record.isValid+''}
            onChange={e => {
              record.isValid = e.target.value;
            }}
          >
            <Radio value="1">是</Radio>
            <Radio value="0">否</Radio>
          </RadioGroup>
        );
      }
    },
    {
      title: "是否可用",
      dataIndex: "isShow",
      render: (text, record) => {
        return (
          <RadioGroup
            disabled={pageType==='detail'}

            style={{width: "107px"}}
            name="isShow"
            defaultValue={record.isShow+''}
            onChange={e => {
              record.isShow = e.target.value;
            }}
          >
            <Radio value="1">是</Radio>
            <Radio value="0">否</Radio>
          </RadioGroup>
        );
      }
    },
    {
      title: "是否必须",
      dataIndex: "isRequired",
      render: (text, record) => {
        return (
          <RadioGroup
            disabled={pageType==='detail'}

            style={{width: "107px"}}
            name="isRequired"
            defaultValue={record.isRequired+''}
            onChange={e => {
              record.isRequired = e.target.value;
            }}
          >
            <Radio value="1">是</Radio>
            <Radio value="0">否</Radio>
          </RadioGroup>
        );
      }
    },
    {
      title: "是否主键",
      dataIndex: "isPk",
      render: (text, record) => {
        return (
          <RadioGroup
            disabled={pageType==='detail'}

            style={{width: "107px"}}
            name="isPk"
            defaultValue={record.isPk+''}
            onChange={e => {
              record.isPk = e.target.value;
            }}
          >
            <Radio value="1">是</Radio>
            <Radio value="0">否</Radio>
          </RadioGroup>
        );
      }
    },
    {
      title: "操作",
      dataIndex: "operation",
      render: (text, record) => {
        return detailDatas.length > 0 && pageType!=='detail'
        ? (
          <Button onClick={e => onDelete(record, e)}>删除</Button>
        ) : null;
      }
    }
  ];
  //删除功能
  const onDelete = (record, e) => {
    // console.log(record,DataTableNameList)
    // 如果有值，并且在DataTableNameList没有，添加到DataTableNameList
    if(record.datacolCode&&!Lodash.find(DataTableNameList,{datacolCode:record.datacolCode})){
      DataTableNameList.splice(record.key,0,Lodash.find(columnDataOrigin,{datacolCode:record.datacolCode}))
    }
    // console.log(DataTableNameList)

    dispatch({
      type: "actionCreate/updateState",
      payload: {
        //删除当前项
        detailDatas: detailDatas.filter(item => item.key !== record.key),
        count: count - 1,
        columnData: DataTableNameList,
      }
    });
  };
  const onCreate = () => {
    validateFields(errors => {
      if (errors) {
        return;
      }
      // 去掉详情列表中的key字段
      const newDetailDatas = detailDatas.map(item=>{
        const {key,...other} = item
        return other
      })
      const data = {
        bizData:{
          datasourceId,
          // datasourceCode,
          ...getFieldsValue(),
          detailList: newDetailDatas,
          id:actionId
        }
      };
      let url = "",
        method = "";
      if (pageType === "create") {
        url = "actionCreate/create";
        method = "新增";
      } else {
        url = "actionCreate/update";
        method = "修改";
      }
      dispatch({
        type: url,
        payload: data
      }).then(data => {
        if (data.success) {
          message.success(`${method}${databaseName}成功`);
          goBack();
        } else {
          message.error(data.message);
        }
      });
    });
  };
  const goBack = () => {
    history.go(-1);
  };
  const modalProps = {
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects[`actionCreate/queryCode`],
    title: "选择商品编码",
    wrapClassName: "vertical-center-modal",
    width: 840,
    onOk(data) {
      // 若选择的数据表跟已选择的数据表不同
      if(data.bizTableName!=formData.bizTable){
        let formData = {};
        // 根据modal输入框类型，作不同的赋值
        let associateInputs = modalInputConfig[choiceModalInput].associateInput;
        associateInputs.forEach(item => {
          formData[item.formName] = data[item.listName];
        });
        // 更新formData
        dispatch({
          type: "actionCreate/selectSuccess",
          payload: formData
        });
        dispatch({
          type: `actionCreate/queryCode`,
          payload: data.bizTableName
        });
      }
      dispatch({
        type: "actionCreate/hideModal"
      });
    },
    onCancel() {
      dispatch({
        type: "actionCreate/hideModal"
      });
    },
    handleModalRefresh(data) {
      // 刷新页面
      const {page, pageSize} = data;
      dispatch({
        type: "actionCreate/queryListModal",
        payload: {
          page,
          pageSize
        }
      });
    }
  };

  return (
    <div className="form-pane detail-list">
      <div className="form-btn-group">
        {pageType!=='detail'&&<Button onClick={onCreate} >保存</Button>}
        <Button onClick={goBack}>返回</Button>
      </div>
      <Collapse className="collapse mb10" defaultActiveKey={['1']} >
        <Panel header="基本信息" key="1">
          <Form>
            <Row gutter={24} type="flex" className='message'>
              {
                formItems.map((item, index) => (
                  <Col span={8} key={index}>
                    <UFormItem {...item} isDetail={pageType==='detail'}></UFormItem>
                  </Col>
                ))
              }
            </Row>
          </Form>
        </Panel>
      </Collapse>
      <div className="detailTable">
        <div className="op-btn-group">
          {pageType!=='detail'&&<Button onClick={onAddDetail} >添加</Button>}
          {pageType!=='detail'&&<Button  >导入</Button>}
        </div>
        <Table bordered dataSource={detailDatas} columns={columns}/>
      </div>
      <div/>
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
};
export default connect(({actionCreate, loading}) => ({
  actionCreate,
  loading
}))(Form.create()(Create));
