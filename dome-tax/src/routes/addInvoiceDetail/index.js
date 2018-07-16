import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import styles from './index.less'

const AddInvoiceDetail = ({
  location, dispatch, addInvoiceDetail, loading
}) => {
  const {invoiceData}=addInvoiceDetail
  const {invInvoiceLineDetailOutVO}=invoiceData
  const data=[{name1:'修理',name2:'111',name3:'辆',name4:1,name5:'2234.53',name6:'2234.53',name7:'17%',name8:'379.87'},
              {name1:'111',name2:'113',name1:'111',name1:'111',name1:'111',name1:'111',name1:'111',name1:'111'}
            ]
  return (
    <Page inner>
        <div className={styles.addInvoiceContent}>
            <div className={styles.addInvoiceTitle}>
                <span>增值税专用发票</span>
                <div><span>No.{invoiceData.invoiceNum}</span><span>开票日期：{invoiceData.makeInvoiceDate}</span></div>
            </div>
            <div className={styles.addInvoiceTable}>
              <table>
                <tbody border="1">
                  <tr><td rowSpan="4" className={styles.bg}>购买方</td><td className={styles.alignLeft} colSpan="8"><span>名称：{data.purchaseTaxPayer}</span></td></tr>
                  <tr><td colSpan="8" className={styles.alignLeft}><span>纳税人识别号：{data.purchaseTaxPayerNo}</span></td></tr>
                  <tr><td colSpan="8" className={styles.alignLeft}><span>地址、电话：{data.purchaseAddrTel}</span></td></tr>
                  <tr><td colSpan="8" className={styles.alignLeft}><span>开户行及账号：{data.purchaseBankAccount}</span></td></tr>
                  <tr className={styles.bg}><td colSpan="2">货物或应税劳务、服务名称</td><td>规格型号</td><td>单位</td><td>数量</td><td>单价</td><td>金额</td><td>税率</td><td>税额</td></tr>
                  {data&&data!=null &&data.map((item,index) =>
                     <tr key={item.productName}><td colSpan="2">{item.model}</td><td>{item.uom}</td><td>{item.price}</td><td>{item.noTaxAmount}</td><td>{item.taxAmount}</td><td>{item.rate}</td><td>{item.taxAmount}</td><td>{item.name8}</td></tr>
                  )}
                  <tr><td className={styles.bg} colSpan="2">价税合计(大写)</td><td className={styles.alignLeft} colSpan="4"><span>{data.cnTotalAmount}</span></td><td className={styles.bg}>小写</td><td className={styles.alignLeft} colSpan="2"><span>{data.totalTax}</span></td></tr>
                  <tr><td className={styles.bg} rowSpan="4">销售方</td><td colSpan="5" className={styles.alignLeft}><span>名称：{data.salesTaxPayer}</span></td><td className={styles.bg} rowSpan="4">备注</td><td rowSpan="4" colSpan="2">{data.memo}</td></tr>
                  <tr><td colSpan="5" className={styles.alignLeft}><span>纳税人识别号：{data.salesTaxPayerNo}</span></td></tr>
                  <tr><td colSpan="5" className={styles.alignLeft}><span>地址、电话：{data.salesAddrTel}</span></td></tr>
                  <tr><td colSpan="5" className={styles.alignLeft}><span>开户行及账号：{data.salesBankAccount}</span></td></tr>
                </tbody>
              </table>
            </div>
            <div className={styles.addInvoiceBottom}><span>收款人:</span><span>复核:</span><span>开票人:</span><span>管理员:</span><span>销售方：(章)</span></div>
        </div>
    </Page>
  )
}

AddInvoiceDetail.propTypes = {
    AddInvoiceDetail: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ addInvoiceDetail, loading }) => ({ addInvoiceDetail, loading }))(AddInvoiceDetail)
