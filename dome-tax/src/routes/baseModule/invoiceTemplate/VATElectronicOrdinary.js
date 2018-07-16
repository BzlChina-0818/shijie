import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import {Page} from 'components'
import queryString from 'query-string'
import styles from './VATElectronicOrdinary.less'
import { Modal, message, Form, Input, Table, Row, Col, Button } from 'antd'
import { request } from 'utils'
import { queryBizCoaList } from 'services/baseAPI'
const FormItem = Form.Item;
export default class AddInvoiceDetail extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title:"",
      updateData:{},

    }
  }
  render (){
    let {title,updateData}=this.props
    return ( <div className={styles.addInvoiceContent}>
      <div className={styles.addInvoiceTitle}>
        <span className={styles.Number}>{updateData.invoiceCode}</span>
        <span>{title}</span>
        <span className={styles.NoNumber}>NO:  {updateData.invoiceNum}</span>
        <div>
          <span>发票代码: {updateData.invoiceNum}</span><span>开票日期：{updateData.issueDate}</span></div>
      </div>
      <div className={styles.addInvoiceTable}>
        <table>
          <tbody border="1">
          <tr>
            <td rowSpan="4" className={styles.bg}>购买方</td>
            <td className={styles.alignLeft} colSpan="8"><span>名称：{updateData.purchaseName}</span></td>
          </tr>
          <tr>
            <td colSpan="8" className={styles.alignLeft}><span>纳税人识别号：{updateData.purchaseNum}</span></td>
          </tr>
          <tr>
            <td colSpan="8" className={styles.alignLeft}><span>地址、电话：{updateData.purchaseAddrTel}</span></td>
          </tr>
          <tr>
            <td colSpan="8" className={styles.alignLeft}><span>开户行及账号：{updateData.purchaseBankAccount}</span></td>
          </tr>

          <tr className={styles.bg}>
            <td colSpan="2">项目名称</td>
            <td>车牌号</td>
            <td>类型</td>
            <td>通行日期起</td>
            <td>通行日期止</td>
            <td>金额</td>
            <td>税率</td>
            <td>税额</td>
          </tr>
          {updateData.itemList && updateData.itemList != null && updateData.itemList.map((item, index) =>
            <tr key={item.productName}>
              <td colSpan="2">{item.taxItem}</td>
              <td>{item.spec}</td>
              <td>{item.unit}</td>
              <td>{item.quantity}</td>
              <td>{item.priceDisp}</td>
              <td>{item.amountWithoutTaxDisp}</td>
              <td>{item.taxRateDisp}</td>
              <td>{item.taxAmountDisp}</td>
            </tr>
          )}

          <tr>
            <td className={styles.bg} colSpan="2">价税合计(大写)</td>
            <td className={styles.alignLeft} colSpan="4"><span>{updateData.totalZH}</span></td>
            <td className={styles.alignLeft} colSpan="3"><span>{updateData.totalDisp}</span></td>
          </tr>
          <tr>
            <td className={styles.bg} rowSpan="4">销售方</td>
            <td colSpan="5" className={styles.alignLeft}><span>名称：{updateData.salesName}</span></td>
            <td className={styles.bg} rowSpan="4">备注</td>
            <td rowSpan="4" colSpan="2">{updateData.memo}</td>
          </tr>
          <tr>
            <td colSpan="5" className={styles.alignLeft}><span>纳税人识别号：{updateData.salesNum}</span></td>
          </tr>
          <tr>
            <td colSpan="5" className={styles.alignLeft}><span>地址、电话：{updateData.salesAddrTel}</span></td>
          </tr>
          <tr>
            <td colSpan="5" className={styles.alignLeft}><span>开户行及账号：{updateData.salesBankAccount}</span></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.addInvoiceBottom}>
        <span>收款人:</span><span>复核:</span><span>开票人:</span><span>管理员:</span><span>销售方：(章)</span></div>
    </div>)

  }
}

