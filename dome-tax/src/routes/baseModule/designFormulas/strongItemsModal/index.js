import React, { Component } from 'react'
import { Modal, message, Form, Input, Icon, Row, Col, Button, Table } from 'antd'
import { queryBiztaxItemList } from 'services/baseAPI'

const FormItem = Form.Item;

/**
 * @description 业务配置> 指标定义>新增>计算的税目
 * @author wangliang
 */

class StrongItemsModal extends Component {
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
    this.setState({
      loading:true,
    })
    this.fetch(formData)
  } 
  handleReset = () => {
    const  { form } = this.props;
    const { resetFields } = form;
    resetFields();
    this.fetch();
  }
  fetch = (formData) => {
    queryBiztaxItemList(formData || this.state.payload).then(resData => {
      if(resData.code === 1000 && resData.success){
        this.setState({
          salesList:resData.data.content,
          pagination:resData.data.pagination,
          loading:false
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
        title: '税种代码',
        dataIndex: 'taxNo',
        key: 'taxNo',
      },
      {
        title: '税种名称',
        dataIndex: 'taxName',
        key: 'taxName',
      },
      {
        title: '税目代码',
        dataIndex: 'itemNo',
        key: 'itemNo',
      },
      {
        title: '税目名称',
        dataIndex: 'itemName',
        key: 'itemName',
      },
    ]

    const modalOpts = {
      ...modalProps,
      title:"选择合作方",
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
      pagination,
      loading,
      columns,
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
      rowKey:record => record.id,
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
              <FormItem style={formItem} label="税种代码" {...formItemLayout}>
                {getFieldDecorator('taxNo')(
                  <Input />
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

const WrappedSalesUnitNameModal = Form.create()(StrongItemsModal);
export default WrappedSalesUnitNameModal