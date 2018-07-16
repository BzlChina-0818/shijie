import React, { Component } from 'react'
import { Modal, message, Form, Input, Table, Row, Col, Button } from 'antd'
import { request } from 'utils'
import { queryIndexList } from 'services/baseAPI'
const FormItem = Form.Item;
/**
 * @description 指标列表modal
 * @param taxNo:税种编码
 * @return 选中当前行数据对象
 * @author guoqianyuan
 */

class IndexModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      salesList:[],
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
    let payload =  {
      page: 1,
      pageSize: 10,
      // 查询字段
      indNo:null,
      indName:null,
      ...params
    }
    this.setState({
      loading:true
    })

    queryIndexList({...payload}).then(resData => {
      if(resData.code === 1000 && resData.success){
        this.setState({
          salesList:resData.data.content,
          loading:false,
          pagination:resData.data.pagination
        })
      } else {
        this.info(resData.message)
      }
    })
  }

  render(){
    const { form:{getFieldDecorator},...modalProps}  = this.props;
    const { loading, salesList, choiceItem, pagination } = this.state;
    const formItemLayout = {
      labelCol: {span: 8 },
      wrapperCol: { span: 16},
    };
    const formItem = {
      marginBottom:0
    }

    const columns = [
      {
        title: '指标名称',
        dataIndex: 'indName',
        key: 'indName',
      },
      {
        title: '指标编号',
        dataIndex: 'indNo',
        key: 'indNo',
      },
      {
        title: '计算类型',
        dataIndex: 'applyType',
        key: 'applyType',
      },
    ]

    const modalOpts = {
      ...modalProps,
      title:"选择指标",
      visible: true,
      maskClosable: false,
      wrapClassName: 'vertical-center-modal',
      bodyStyle:{'minHeight':'350px','maxHeight':'550px'},
      width:850,
      onOk(){
        if(!choiceItem){
          message.info(`请选择指标`);
          return;
        }
        modalProps.onOk(choiceItem);
      },
    }

    const listProps = {
      pagination,
      dataSource:salesList,
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
      rowKey:record => record.indId,
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
                <FormItem style={formItem} label="指标编号" {...formItemLayout}>
                  {getFieldDecorator('indNo')(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem style={formItem} label="指标名称" {...formItemLayout}>
                  {getFieldDecorator('indName')(
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
          <Table rowSelection={rowSelection} {...listProps} />
        </div>
      </Modal>
    )
  }
}

const WrappedTaxItemModal = Form.create()(IndexModal);
export default WrappedTaxItemModal
