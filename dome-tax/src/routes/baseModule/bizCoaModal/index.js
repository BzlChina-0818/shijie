import React, { Component } from 'react'
import { Modal, message, Form, Input, Table, Row, Col, Button } from 'antd'
import { request } from 'utils'
import { queryBizCoaList } from 'services/baseAPI'
const FormItem = Form.Item;
/**
 * @description 科目列表modal
 * @use：业务配置>计算表计提配置新增 src/routes/businessConfig/baseInfo/calculateAccruedCfg/create/index.js
 * @return 选中当前行数据对象
 * @author guoqianyuan
 */

const formItem = {
  marginBottom:0
}

const formItemLayout = {
  labelCol: {span: 8 },
  wrapperCol: { span: 16},
}

const BizCoaConfig = {
  "01":"公司",
  "02":"部门",
  "03":"专业",
  "04":"科目",
  "05":"往来",
  "06":"项目",
  "07":"客户",
}

class BizCoaModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      tableDataList:[],
      choiceItem:'',
      pagination: {
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => `共 ${total} 条`,
        current: 1,
        total: 0,
        pageSize: 10,
      },
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount(){
    this.fetch();
  }

  handleSubmit(){
    let { form } = this.props;
    const fields = form.getFieldsValue()
    this.fetch(fields)
  }

  handleReset = () => {
    let { form } = this.props;
    const fields = form.getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = ""
        }
      }
    }
    form.setFieldsValue(fields)
    this.fetch(fields)
  }
  fetch = (params) => {
    const { coaType } = this.props
    let payload =  {
      page: 1,
      pageSize: 10,
      // 查询字段
      coaType,
      coaValue:null,
      coaDesc:null,
      ...params
    }
    this.setState({
      loading:true
    })

    queryBizCoaList({...payload}).then(resData => {
      if(resData.code === 1000 && resData.success){
        this.setState({
          tableDataList:resData.data.content,
          loading:false,
          pagination:resData.data.pagination
        })
      } else {
        message.warning(resData.message)
      }
    })
  }

  render(){
    const { form:{getFieldDecorator},...modalProps}  = this.props;
    const { coaType } = modalProps
    const { loading, tableDataList, choiceItem, pagination } = this.state;

    const nowTitle = BizCoaConfig[coaType]
    const columns = [
      {
        title: `${nowTitle}名称`,
        dataIndex: 'coaValue',
        key: 'coaValue',
      },
      {
        title: `${nowTitle}税目代码`,
        dataIndex: 'coaDesc',
        key: 'coaDesc',
      },
    ]

    const modalOpts = {
      ...modalProps,
      title:`选择${nowTitle}段`,
      visible: true,
      maskClosable: false,
      wrapClassName: 'vertical-center-modal',
      bodyStyle:{'minHeight':'350px','maxHeight':'550px'},
      width:850,
      onOk(){
        if(!choiceItem){
          message.warning(`请选择${nowTitle}段`);
          return;
        }
        modalProps.onOk(choiceItem);
      },
    }

    const listProps = {
      pagination,
      dataSource:tableDataList,
      loading,
      columns,
      onChange: (page)=> {
        let { form } = this.props;
        const fields = form.getFieldsValue()
        this.fetch({
            ...fields,
            page: page.current,
            pageSize: page.pageSize,
        })
      },
      rowKey:record => record.id,
    }

    const rowSelection = {
      type:'radio',
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          choiceItem:selectedRows[0],
        })
      },
    };

    return (
      <Modal {...modalOpts}>
        <div className="condition-filter">
          <Form>
            <Row gutter={24}>
              <Col span={8}>
                <FormItem style={formItem} label={`${nowTitle}段值`} {...formItemLayout}>
                  {getFieldDecorator('coaValue')(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem style={formItem} label={`${nowTitle}段编码`} {...formItemLayout}>
                  {getFieldDecorator('coaDesc')(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                  <Button onClick={this.handleSubmit}>查询</Button>
                  <Button onClick={this.handleReset}>清空</Button>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="content-list">
          <Table rowSelection={rowSelection} {...listProps}/>
        </div>
      </Modal>
    )
  }
}

const WrappedBizCoaModal = Form.create()(BizCoaModal);
export default WrappedBizCoaModal
