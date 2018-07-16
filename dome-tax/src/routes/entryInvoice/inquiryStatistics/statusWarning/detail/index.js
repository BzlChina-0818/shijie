import React, { Fragment } from 'react'
import { Collapse, Button, Input } from 'antd'
import { connect } from 'dva'
import { DetailList } from 'components'
import styles from './index.less'

const Panel = Collapse.Panel;

const Detail = ({statusWarningDetail}) => {
  let { list, formData } = statusWarningDetail
  const data1 = [
    {
      td:[
        {
          label:"发票批次",
          code:"headId",
          initialValue: formData.headId,
        },
        {
          label:"所属组织机构",
          code:"groupName",
          initialValue: formData.groupName,
        },
      ]
    },
    {
      td:[
        {
          label:"登记日期",
          code:"applyTime",
          initialValue: formData.applyTime,
        },
        {
          label:"开票时间",
          code:"makeInvoiceDate",
          initialValue: formData.makeInvoiceDate,
        }
      ]
    },
    {
      td:[
        {
          label:"申请人",
          code:"applyUserName",
          initialValue: formData.applyUserName,
        },
        {
          label:"联系电话",
          code:"applyUserTel",
          initialValue: formData.applyUserTel,
        }
      ]
    },
    {
      td:[
        {
          label:"发票代码",
          code:"invoiceCode",
          initialValue: formData.invoiceCode,
        },
        {
          label:"发票号码",
          code:"invoiceNum",
          initialValue: formData.invoiceNum,
        },
      ]
    },
    {
      td:[
        {
          label:"发票批来源",
          code:"invoiceBatch",
          initialValue: formData.invoiceBatch,
        },
        {
          label:"专用发票类型",
          code:"deductibleInvoiceTypeDesc",
          initialValue: formData.deductibleInvoiceTypeDesc,
        }
      ]
    },
    {
      td:[
        {
          label:"销货单位编号",
          code:"salesNo",
          initialValue: formData.salesNo,
        },
        {
          label:"销货单位角色及对应系统：",
          code:"salesRole",
          initialValue: formData.salesRole,
        }
      ]
    },
    {
      td:[
        {
          label:"销货单位名称",
          code:"salesName",
          initialValue: formData.salesName,
        },
        {
          label:"销货单位纳税人识别号",
          code:"salesTaxPayerNo",
          initialValue: formData.salesTaxPayerNo,
        }
      ]
    },
    {
      td:[
        {
          label:"购货单位名称",
          code:"purchaseName",
          initialValue: formData.purchaseName,
        },
        {
          label:"购货单位纳税人识别号：",
          code:"purchaseTaxPayerNo",
          initialValue: formData.purchaseTaxPayerNo,
        }
      ]
    },
    {
      td:[
        {
          label:"金额",
          code:"noTaxAmount",
          initialValue: formData.noTaxAmount,
        },
      ]
    },
    {
      td:[
        {
          label:"税额",
          code:"tax",
          initialValue: formData.tax,
        },
        {
          label:"价税合计",
          code:"totalTax",
          initialValue: formData.totalTax,
        },
      ]
    }];
  const data2 = [
    {
      td:[
        {
          label:"发票批状态",
          code:"batchStatus",
          initialValue: formData.batchStatus,
        },
        {
          label:"发票批时间",
          code:"batchTime",
          initialValue: formData.batchTime,
        },
      ]
    },
    {
      td:[
        {
          label:"发票认证审核状态",
          code:"authenticationStatusDesc",
          initialValue: formData.authenticationStatusDesc,
        },
        {
          label:"发票认证时间",
          code:"affirmTime",
          initialValue: formData.affirmTime,
        },
      ]
    },
    {
      td:[
        {
          label:"发票抵扣状态",
          code:"deductibleStatus",
          initialValue: formData.deductibleStatus,
        },
        {
          label:"已生成申报表时间：",
          code:"applyTime",
          initialValue: formData.applyTime,
        },
      ]
    },
    {
      td:[
        {
          label:"发票认证人",
          code:"verifier",
          initialValue: formData.verifier,
        },
        {
          label:"发票号码",
          code:"invoiceNum",
          initialValue: formData.invoiceNum,
        },
      ]
    },
    {
      td:[
        {
          label:"认证审核意见",
          code:"opinion",
          initialValue: formData.opinion,
        },
        {
          label:"专用发票类型",
          code:"deductibleInvoiceType",
          initialValue: formData.deductibleInvoiceType,
        },
      ]
    },];



  const onBack = () => {
    history.go(-1);
  }

  const registerProps = {
    dataSource:data1,
    isDetail: true,
  }
  const StateProps = {
    dataSource:data2,
    isDetail: true,
  }

  return (
    <div className="detail-list">
      <div className="op-btn-group">
        <Button className="margin-right" onClick={onBack}>返回</Button>
      </div>
      <Collapse className="collapse" defaultActiveKey={['1']} >
        <Panel header="发票登记信息" key="1" className="panel-content">
          <DetailList {...registerProps}/>
        </Panel>
      </Collapse>
      <Collapse className="collapse" defaultActiveKey={['1']}>
        <Panel header="发票状态信息" key="1">
          <DetailList {...StateProps}/>
        </Panel>
      </Collapse>
    </div>
  )
}

export default connect(({statusWarningDetail}) => ({statusWarningDetail}))(Detail)
