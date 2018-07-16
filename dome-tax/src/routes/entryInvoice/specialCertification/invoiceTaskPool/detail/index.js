import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux,History } from 'dva/router'
import classnames from 'classnames'
import { connect } from 'dva'
import { CustomTable } from "components"
import { PATH,formValidMsg } from "utils"
import queryString from 'query-string'
import { Button,Row,Col } from 'antd'
const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: { 
    span: 16,
  },
}
const path = PATH.ENTRY_INVOICE
const Detail=({
    location,
    dispatch, 
    invoiceTaskPoolDetail,
    loading,
})=>{
  const {selectedRowKeys,formData}=invoiceTaskPoolDetail
  const invoiceState=queryString.parse(location.search)
  let choiceItem={}   
    function handleChange(key,value){
      console.log(key,value)
    }
    function onChange(value, dateString) {
      console.log('Selected Time: ', value);
      console.log('Formatted Selected Time: ', dateString);
    }
    const columns = [
      {
        title: '发票代码',
        dataIndex: 'invoiceCode',
        key: 'invoiceCode',
        width:200
      }, {
        title: '发票号码',
        dataIndex: 'invoiceNum',
        key: 'invoiceNum',
        width:150
      }, {
        title: '发票日期',
        dataIndex: 'makeInvoiceDate',
        key: 'makeInvoiceDate',
        width:250,
      },{
          title: '发票类型',
          dataIndex: 'deductibleInvoiceTypeDesc',
          key: 'deductibleInvoiceTypeDesc',
          width:200
        }, {
        title: '金额',
        dataIndex: 'noTaxAmount',
        key: 'noTaxAmount',
        width:100
      },{
        title: '税额',
        dataIndex: 'tax',
        key: 'tax',
        width:100
      },
      {
          title: '价税合计',
          dataIndex: 'totalTax',
          key: 'totalTax',
          width:100
      },
      {
          title: '认证/查验状态',
          dataIndex: 'deductibleStatusDesc',
          key: 'deductibleStatusDesc',
          width:150
      },
      {
          title: '备注',
          dataIndex: 'memo',
          key: 'memo',
          width:200
      },
      {
        title: '操作',
        key: 'operation',
        width: 220,
        render: (text,record) => {
            return(
              <div className="operation">
                  <Button onClick={e=>onDetailItem(record,e)} size="small">详情</Button>
              </div> 
            )     
        },     
        fixed: 'right',
      },
    ]
    const rowSelection={
      type:'radio',
      onChange: (selectedRowKeys, selectedRows) => {
          console.log(selectedRows)
      },
    }
    let list=[]
    if(formData&&formData.invoiceLineOutVO!=null){
       list=formData.invoiceLineOutVO
    }
    //发票行
    const goBack=()=>{
      history.go(-1)
    }
    //查看详情
    const onDetailItem=(record)=>{
      dispatch(routerRedux.push({
        pathname:'/addInvoiceDetail',
        state: queryString.stringify({
          formId:record.formId
        }),
      }))
    }
    //render
    return(
        <div className="form-pane">
            <div className="op-btn-group">
              <Button>领取</Button>
              <Button>审批历史</Button>
            </div>
            <div className="form-content condition-filter" style={{marginBottom:'10px',padding:'10px'}}>
                <Row gutter={24}>
                  <Col span={8}>
                    <Row>
                      <Col style={{textAlign:'right'}} span={10}><span>发票业务类型：</span></Col>
                      <Col span={14}><span>{formData.bizType}</span></Col>
                    </Row>
                  </Col>
                  <Col span={8}>
                    <Row>
                      <Col style={{textAlign:'right'}} span={10}><span>是否代开发票：</span></Col>
                      <Col span={14}><span>{formData.issuedInvoiceName}</span></Col>
                    </Row>
                  </Col>
                  <Col span={8}>
                    <Row>
                      <Col style={{textAlign:'right'}} span={10}><span>发票批次：</span></Col>
                      <Col span={14}><span>{formData.invoiceBatch}</span></Col>
                    </Row> 
                  </Col>
                  <Col span={8}>
                    <Row>
                      <Col style={{textAlign:'right'}} span={10}><span>申请人：</span></Col>
                      <Col span={14}><span>{formData.applyUserId}</span></Col>
                    </Row>  
                  </Col>
                  <Col span={8}>
                    <Row>
                      <Col style={{textAlign:'right'}} span={10}><span>申请时间：</span></Col>
                      <Col span={14}><span>{formData.applyDate}</span></Col>
                    </Row> 
                  </Col>
                  <Col span={8}>
                    <Row>
                      <Col style={{textAlign:'right'}} span={10}><span>所属组织机构：</span></Col>
                      <Col span={14}><span>{formData.groupNo}</span></Col>
                    </Row>
                  </Col>
                  <Col span={8}>
                    <Row>
                      <Col style={{textAlign:'right'}} span={10}><span>联系电话：</span></Col>
                      <Col span={14}><span>{formData.applyUserTel}</span></Col>
                    </Row>
                  </Col>
                  <Col span={8}>
                    <Row>
                      <Col style={{textAlign:'right'}} span={10}><span>发票类型：</span></Col>
                      <Col span={14}><span>{formData.invoiceType}</span></Col>
                    </Row>
                  </Col>
                  <Col span={8}>
                  <Row>
                      <Col style={{textAlign:'right'}} span={10}><span>销货单位编码：</span></Col>
                      <Col span={14}><span>{formData.salesNo}</span></Col>
                    </Row>
                  </Col> 
                  <Col span={8}>
                    <Row>
                      <Col style={{textAlign:'right'}} span={10}><span>销货单位角色及对应系统：</span></Col>
                      <Col span={14}> <span>{formData.salesRole}</span></Col>
                    </Row>  
                  </Col>
                  <Col span={8}>
                    <Row>
                      <Col style={{textAlign:'right'}} span={10}><span>销货单位名称：</span></Col>
                      <Col span={14}><span>{formData.salesName}</span></Col>
                    </Row>
                  </Col>
                  <Col span={8}>
                    <Row>
                      <Col style={{textAlign:'right'}} span={10}><span>销货单位纳税人识别号：</span></Col>
                      <Col span={14}><span>{formData.salesTaxPayerNo}</span></Col>
                    </Row>
                  </Col>
                  <Col span={8}>
                    <Row>
                      <Col style={{textAlign:'right'}} span={10}><span>购货单位纳税人识别号：</span></Col>
                      <Col span={14}><span>{formData.purchaseTaxPayerNo}</span></Col>
                    </Row>
                  </Col>
                  <Col span={8}>
                    <Row>
                      <Col style={{textAlign:'right'}} span={10}><span>购货单位名称：</span></Col>
                      <Col span={14}><span>{formData.purchaseName}</span></Col>
                    </Row>
                  </Col>
                </Row>
            </div>
            <CustomTable dataSource={list} rowSelection={rowSelection} columns={columns} />
        </div>
    )
}
Detail.propTypes = {
  invoiceTaskPoolDetail: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({ invoiceTaskPoolDetail, loading }) => ({ invoiceTaskPoolDetail, loading })) (Detail)

