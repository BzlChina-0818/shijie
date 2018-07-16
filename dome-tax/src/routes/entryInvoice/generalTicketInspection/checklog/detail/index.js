import React from 'react'
import PropTypes from 'prop-types'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import {Row, Col, Button, Popconfirm} from 'antd'
import {Page} from 'components'
import queryString from 'query-string'
import styles from './index.less'
import {Form} from "antd/lib/index";
import ButtonGroup from './ButtonGroup'
/**
 * @description（进项发票管理>普票查验>普通发票查验日志管理）
 * @author linxiaonan
 *  @backEnd chenhao

 */

//将小写金额转化为大写金额
var nzhcn = require("nzh/cn"); //直接使用简体中文

const Detail = ({
                  location, dispatch, checklogDetail, loading
                }) => {
  const {updateData} = checklogDetail
  location.query = queryString.parse(location.search)
  const {checkInvline, checkInvlinedetail} = updateData

  const buttonGroupProps={
    onGoback(){
      history.go(-1)
    }
  }
  return (
    <Page inner>
      <ButtonGroup {...buttonGroupProps}/>
      {  checkInvline&&checkInvlinedetail?
        <div className={styles.addInvoiceContent}>
          <div className={styles.addInvoiceTitle}>
            <span>普通发票</span>
            <div><span>No.01122349</span><span>开票日期：{checkInvline.invoicingTime}</span></div>
          </div>
          <div className={styles.addInvoiceTable}>
            <table>
              <tbody border="1">
              <tr>
                <td rowSpan="4" className={styles.bg}>购买方</td>
                <td className={styles.alignLeft} colSpan="8"><span>名称：{checkInvline.purchaseCompName}</span></td>
              </tr>
              <tr>
                <td colSpan="8" className={styles.alignLeft}><span>纳税人识别号：{checkInvline.purchaseTaxPayerNo}</span></td>
              </tr>
              <tr>
                <td colSpan="8" className={styles.alignLeft}><span>地址、电话：{checkInvline.purchaseAddr}</span></td>
              </tr>
              <tr>
                <td colSpan="8" className={styles.alignLeft}><span>开户行及账号：{checkInvline.purchaseBankAccount}</span></td>
              </tr>
              <tr className={styles.bg}>
                <td colSpan="2"><span>货物或应税劳务、服务名称：{checkInvlinedetail.commodityName}</span></td>
                <td><span>规格型号：{checkInvlinedetail.modelType}</span></td>
                <td><span>单位：{checkInvlinedetail.unit}</span></td>
                <td><span>数量：{checkInvlinedetail.count}</span></td>
                <td><span>单价：{checkInvlinedetail.price}</span></td>
                <td><span>金额：{checkInvlinedetail.amount}</span></td>
                <td><span>税率：{checkInvlinedetail.rate}</span></td>
                <td><span>税额：{checkInvlinedetail.tax}</span></td>

              </tr>

              <tr>
                <td className={styles.bg} colSpan="2">价税合计(大写)</td>
                <td className={styles.alignLeft} colSpan="4"><span>{nzhcn.toMoney(checkInvline.total,{outSymbol:false})}</span></td>
                <td className={styles.bg}>小写</td>
                <td className={styles.alignLeft} colSpan="2"><span>￥{checkInvline.total}</span></td>
              </tr>
              <tr>
                <td className={styles.bg} rowSpan="4">销售方</td>
                <td colSpan="5" className={styles.alignLeft}><span>名称：{checkInvline.salesCompName}</span></td>
                <td className={styles.bg} rowSpan="4">备注:{checkInvline.description}</td>
                <td rowSpan="4" colSpan="2">校验码：{checkInvline.checkCode}</td>
              </tr>
              <tr>
                <td colSpan="5" className={styles.alignLeft}><span>纳税人识别号：{checkInvline.salesTaxPayerNo}</span></td>
              </tr>
              <tr>
                <td colSpan="5" className={styles.alignLeft}><span>地址、电话：{checkInvline.salesAddr}</span></td>
              </tr>
              <tr>
                <td colSpan="5" className={styles.alignLeft}><span>开户行及账号：{checkInvline.salesBankAccount}</span></td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.addInvoiceBottom}>
            <span>收款人:</span><span>复核:</span><span>开票人:</span><span>管理员:</span><span>销售方：(章)</span></div>
        </div>:null}
    </Page>
  )
}

Detail.propTypes = {
  AddInvoiceDetail: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({checklogDetail, loading}) => ({
  checklogDetail, loading
}))(Form.create()(Detail))
