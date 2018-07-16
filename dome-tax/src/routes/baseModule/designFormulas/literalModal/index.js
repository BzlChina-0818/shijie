import React, { Component } from 'react'
import { Modal, message, Form, InputNumber, Icon, Row, Col, Button, Table } from 'antd'
import { queryLiteralList } from 'services/baseAPI'

const FormItem = Form.Item;

/**
 * @description 业务配置> 指标定义>新增>计算的常值
 * @author wangliang
 */

class LiteralModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      salesList:[],
      selectedRows:[],
      payload: {
        page: 1,
        pageSize:10,
      },
      pagination: {
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => `共 ${total} 条`,
        current: 1,
        total: 0,
        pageSize: 10,
      },
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
    queryLiteralList(formData || this.state.payload).then(resData => {
      console.log(resData)
      if(resData.code === 1000 && resData.success){
        this.setState({
          salesList:resData.data.content,
          loading:false,
           pagination: resData.data.pagination,
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
        title: '表ID',
        dataIndex: 'constId',
        key: 'constId',
      },
      {
        title: '公司ID',
        dataIndex: 'compId',
        key: 'compId',
      },
      {
        title: '常量编号',
        dataIndex: 'constNo',
        key: 'constNo',
      },
      {
        title: '常量名称',
        dataIndex: 'constName',
        key: 'constName',
      },
      {
        title: '常量值',
        dataIndex: 'constValue',
        key: 'constValue',
      },
    ]

    const modalOpts = {
      ...modalProps,
      title:"常量选择",
      cancelText:"关闭",
      okText:"选择",
      visible: true,
      maskClosable: false,
      wrapClassName: 'vertical-center-modal',
      bodyStyle:{'minHeight':'350px'},
      width:850,
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
      rowKey:record => record.constId,
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
              <FormItem style={formItem} label="公司编号" {...formItemLayout}>
                {getFieldDecorator('compId')(
                  <InputNumber />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <Col offset={8} span={4} style={buttonCol}>
                <Button style={{marginRight:'15px'}} onClick={this.handleSubmit}>查询</Button>
                <Button onClick={this.handleReset}>清空</Button>
              </Col>
            </Col>
          </Row>
        </Form>
        <Table rowSelection={rowSelection} {...listProps}/>
      </Modal>
    )
  }
}

const WrappedSalesUnitNameModal = Form.create()(LiteralModal);
export default WrappedSalesUnitNameModal