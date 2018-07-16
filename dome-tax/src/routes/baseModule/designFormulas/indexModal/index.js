import React, { Component } from 'react'
import { Modal, message, Form, Input, Icon, Row, Col, Button, Table } from 'antd'
import { queryIndexList } from 'services/baseAPI'

const FormItem = Form.Item;

/**
 * @description 业务配置> 指标定义>新增>计算的指标或者是指标编号
 * @author wangliang
 */

class IndexModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      salesList:[],
      selectedRows:[],
      pagination: {
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => `共 ${total} 条`,
        current: 1,
        total: 0,
        pageSize: 10,
      },
      payload: {
        page: 1,
        pageSize:10,
      }
    }
  }
  componentDidMount(){
    this.fetch()
  }
  info = (messages) => {
    message.info(messages);
  }
  handleSubmit = () => {
    let { form } = this.props;
    let formData = form.getFieldsValue()
    console.log(formData)  
    this.setState({
      loading:true,
    })
    this.fetch(formData)
  } 
  handleReset = () => {
    const  { form } = this.props;
    const { resetFields } = form;
    resetFields();
    this.fetch()
  }
  fetch = (formData) => {
    queryIndexList(formData || this.state.payload).then(resData => {
      if(resData.code === 1000 && resData.success){
        this.setState({
          salesList:resData.data.content,
          pagination:resData.data.pagination,
          loading:false,
        })
      } else {
        this.info(resData.message)
      }
    })
  } 
  render(){
    const  { form, onOk, onCancel, ...modalProps } = this.props;
    const { loading, salesList, selectedRows, pagination } = this.state;
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: {span: 8 },
      wrapperCol: { span: 16},
    };
    const buttonCol = {
      display:'flex'
    }
    const formItem = {
      marginBottom:0
    }

    const columns = [
      {
        title: '指标ID',
        dataIndex: 'indId',
        key: 'indId',
      },
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
    ]

    const modalOpts = {
      ...modalProps,
      title:"指标选择",
      cancelText:"关闭",
      okText:"选择",
      visible: true,
      maskClosable: false,
      wrapClassName: 'vertical-center-modal',
      bodyStyle:{'minHeight':'350px'},
      width:900,
      onOk(){
        if(!selectedRows){
          alert('请选择合作方');
          return;
        }
        onOk(selectedRows);
      },
      onCancel(){
        onCancel();
      },
    }

    const listProps = {
      dataSource:salesList,
      loading,
      columns,
      pagination,
      onChange: (page) => {
        this.setState({
          payload: {
            page: page.current,
            pageSize: page.pageSize,
          }
        },() => {
          this.fetch();
        })
      },
      onRow(record){
        return {
          onDoubleClick:() => {
            onOk(record);
          }
        }
      },
      rowKey:record => record.indId,
    }

    const rowSelection = {
      type:'radio',
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRows:selectedRows[0]
        })
        //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
    };

    return (
      <Modal {...modalOpts}>
         <Form onSubmit={this.handleSubmit} className="login-form">
          <Row gutter={20}>
            <Col span={11}>
              <FormItem style={formItem} label="指标编号" {...formItemLayout}>
                {getFieldDecorator('indNo')(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={11}>
              <FormItem style={formItem} label="指标名称" {...formItemLayout}>
                {getFieldDecorator('indName')(
                  <Input />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={6} offset={16}>
              <Button style={{marginRight:'15px'}} onClick={this.handleSubmit}>查询</Button>
              <Button onClick={this.handleReset}>清空</Button>
            </Col>
          </Row>
        </Form>
        <Table rowSelection={rowSelection} {...listProps}/>
      </Modal>
    )
  }
}

const WrappedSalesUnitNameModal = Form.create()(IndexModal);
export default WrappedSalesUnitNameModal