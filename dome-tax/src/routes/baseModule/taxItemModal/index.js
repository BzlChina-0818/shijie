import React, { Component } from 'react'
import { Modal, message, Form, Input, Table, Row, Col, Button } from 'antd'
import { request } from 'utils'
import { queryBiztaxItemList } from 'services/baseAPI'
const FormItem = Form.Item;
/**
 * @description 税目列表modal
 * @use 业务配置>计算表计提配置新增 src/routes/businessConfig/baseInfo/calculateAccruedCfg/create/index.js
 * @param taxNo:税种编码
 * @return 选中当前行数据对象
 * @author guoqianyuan
 */

class TaxItemModal extends Component {
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
      itemName:null,
      itemNo:null,
      taxNo:this.props.taxNo,
      ...params
    }
    this.setState({
      loading:true
    })

    queryBiztaxItemList({...payload}).then(resData => {
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
    const {form:{getFieldDecorator},...modalProps}  = this.props;
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
        title: '税目名称',
        dataIndex: 'itemName',
        key: 'itemName',
      },
      {
        title: '税目代码',
        dataIndex: 'itemNo',
        key: 'itemNo',
      },
    ]

    const modalOpts = {
      ...modalProps,
      title:"选择税目",
      visible: true,
      maskClosable: false,
      wrapClassName: 'vertical-center-modal',
      bodyStyle:{'minHeight':'350px','maxHeight':'550px'},
      width:850,
      onOk(){
        if(!choiceItem){
          message.info(`请选择税目`);
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
      rowKey:record => record.id,
    }

    const rowSelection = {
      type:'radio',
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          choiceItem:selectedRows[0],
        })
        console.log(this.state)
      },
    };

    return (
      <Modal {...modalOpts}>
        <div className="condition-filter">
          <Form>
            <Row gutter={24}>
              <Col span={8}>
                <FormItem style={formItem} label="税目名称" {...formItemLayout}>
                  {getFieldDecorator('itemName')(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem style={formItem} label="税目代码" {...formItemLayout}>
                  {getFieldDecorator('itemNo')(
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

const WrappedTaxItemModal = Form.create()(TaxItemModal);
export default WrappedTaxItemModal
