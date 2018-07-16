import React, { Component } from 'react'
import { Modal,message,Form, Button, Row, Col, Input,Select,Table,Icon } from 'antd'
import { request } from 'utils'
import { SelectModal,CustomTable } from 'components'
import { queryTaxpayerBody } from 'services/baseAPI'
const ButtonGroup = Button.Group;
const Option = Select.Option;
const FormItem = Form.Item
const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  }
class TaxpayerBodyModal extends Component {
    constructor(props){
        super(props)
        this.state={
            loading:false,
            list:[],
            pagination: {
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: total => `共 ${total} 条`,
                current: 1,
                total: 0,
                pageSize: 10,
              },
            selectedDatas:{},
        }
    }
    componentDidMount(){
        let payload = {
            page: 1,
            pageSize: 10,
        }
        this.fetch(payload)
    }
    fetch = (params) => {
        this.setState({ loading: true })
        queryTaxpayerBody(params).then((result) => {
            if(result.success&&result.code===1000){
                this.setState({
                    loading: false,
                    list: result.data.content,
                    pagination:result.data.pagination
                })
            }else{
                message.error(result.message)
            }
        })
      }
      handleSubmit=()=>{
        let { form } = this.props;
        let fields = form.getFieldsValue()
        let payload={
            page: 1,
            pageSize: 10,
            ...fields
        }
      }
      handleReset=()=>{
        const fields = getFieldsValue()
        for (let item in fields) {
          if ({}.hasOwnProperty.call(fields, item)) {
            if (fields[item] instanceof Array) {
              fields[item] = []
            } else {
              fields[item] = ""
            }
          }
        }
        setFieldsValue(fields)
      }
    render(){
        const {form, onOk, onCancel,checkbox,...modalProps}=this.props
        const {getFieldDecorator}=this.props.form
        const {list,pagination,selectedDatas,loading} = this.state
        const columns = [{
            title: '纳税人名称',
            dataIndex: 'taxPayer',
            key: 'taxPayer',
          }, {
            title: '纳税人识别号',
            dataIndex: 'taxPayerNo',
            key: 'taxPayerNo',
          }];
        const modalLists={
            dataSource:list,
            pagination,
            columns:columns,
            rowSelection:{
                type:checkbox?'checkbox':'radio',
                onChange: (selectedRowKeys, selectedRows) => {  
                    this.setState({
                        selectedDatas:selectedRows[0]
                    })
                },
            }
        }
        const modalOpts={
            ...modalProps,
            title:'选择纳税主体',
            visible:true,
            loading,
            width:840,
            maskClosable: false, 
            wrapClassName: 'vertical-center-modal',
            onOk(){
                if(selectedDatas){
                    onOk(selectedDatas) 
                }else{
                    message.warning('请选择纳税人主体')
                }
              },
            onCancel(){
                onCancel()
            },
        }
        return (
          <div>
            <Modal {...modalOpts}>
                <div className="condition-filter">
                    <Row gutter={24}>
                        <Col span={8}>
                            <FormItem {...formItemLayout} label="区(限)：">
                            {getFieldDecorator('profsnlId', { initialValue: '' })
                            (<Select>
                                <Option value="">请选择</Option>
                                <Option value="1">中国春田教育有限公司</Option>
                            </Select>)}
                            </FormItem>
                        </Col>
                        <Col offset={8} span={8} className="button-col">
                            <Button className="margin-right" onClick={this.handleSubmit}>查询</Button>
                            <Button onClick={this.handleReset}>重置</Button>
                        </Col>
                    </Row>
                </div>
                <div className="content-list">
                {/* {loading&&<Icon type="loading" />} */}
                    <Table
                    {...modalLists}
                    bordered
                    // scroll={{ x: 1250 }}
                    simple
                    size="small"
                    rowKey={record => record.taxPayerNo}
                    />
                    </div>
            </Modal>
          </div>
        )
    }
}
export default Form.create()(TaxpayerBodyModal)