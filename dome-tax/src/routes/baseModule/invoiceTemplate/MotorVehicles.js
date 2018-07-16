import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import {Page} from 'components'
import queryString from 'query-string'
import styles from './MotorVehicles.less'
import { Modal, message, Form, Input, Table, Row, Col, Button } from 'antd'
import { request } from 'utils'
const FormItem = Form.Item;


/*机动车发票票面信息*/
export default class MotorVehicles extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title:"",
      updateData:{},

    }
  }
  render (){
    let {title,updateData}=this.props
    return (  <div className={styles.addInvoiceContent}>
      <div className={styles.addInvoiceTitle}>
        <span className={styles.Number}>{updateData.invoiceCode}</span>
        <span>{title}</span>
        <span className={styles.NoNumber}>NO:  {updateData.invoiceNum}</span>
        <p>发票联</p>
        <div>
          <span>发票代码:{updateData.invoiceCode}</span><span>发票号码：{updateData.invoiceNum}</span>
        </div>
      </div>
      <div className={styles.addInvoiceTable}>
        <table>
          <tbody border="1">
          <tr>
            <td rowSpan="1" >
              <span>机打号码:</span></td>
            <td className={styles.alignLeft} colSpan="8">
              <span>名称：{updateData.purchaseName}</span></td>
          </tr>
          <tr>
            <td rowSpan="1" >
              <span>机打号码:</span></td>
            <td colSpan="8" className={styles.alignLeft}><span>纳税人识别号：{updateData.invoiceCode}</span></td>
          </tr>
          <tr>
            <td rowSpan="1" >
              <span>机器编号:</span></td>
            <td colSpan="8" className={styles.alignLeft}><span>地址、电话：{updateData.invoiceNum}</span></td>
          </tr>
          <tr>
            <td rowSpan="1" >
              <span>购买方名称及身份证号码/组织机构代码:</span></td>
            <td className={styles.alignLeft} colSpan="3">
              <span>{updateData.purchaseName}{updateData.purchaseIdentify}</span></td>
            <td className={styles.alignLeft} colSpan="3">
              <span>纳税人识别号：</span></td>
            <td className={styles.alignLeft} colSpan="3">
              <span>{updateData.purchaseNum}</span></td>
          </tr>
          <tr>
            <td rowSpan="1" >
              <span>车辆类型:</span></td>
            <td className={styles.alignLeft} colSpan="1">
              <span>{updateData.vehicleUsage}</span></td>
            <td className={styles.alignLeft} colSpan="2">
              <span>厂牌型号：</span></td>
            <td className={styles.alignLeft} colSpan="2">
              <span>{updateData.modelSpec}</span></td>
            <td className={styles.alignLeft} colSpan="2">
              <span>产地：</span></td>
            <td className={styles.alignLeft} colSpan="1">
              <span>{updateData.madeIn}</span></td>
          </tr>
          <tr>
            <td rowSpan="1" >
              <span>合格证号:</span></td>
            <td className={styles.alignLeft} colSpan="1">
              <span>{updateData.certificationNo}</span></td>
            <td className={styles.alignLeft} colSpan="2">
              <span>进口证明书号：</span></td>
            <td className={styles.alignLeft} colSpan="2">
              <span>{updateData.importCertificationNo}</span></td>
            <td className={styles.alignLeft} colSpan="2">
              <span>商检单号：</span></td>
            <td className={styles.alignLeft} colSpan="1">
              <span>{updateData.inspectionNo}</span></td>
          </tr>
          <tr>
            <td rowSpan="1" >
              <span>发动机号码:</span></td>
            <td className={styles.alignLeft} colSpan="3">
              <span>{updateData.engineNo}</span></td>
            <td className={styles.alignLeft} colSpan="3">
              <span>车辆识别号/车架号码：</span></td>
            <td className={styles.alignLeft} colSpan="3">
              <span>{updateData.vehicleIdentifyNo}</span></td>
          </tr>
          <tr>
            <td  colSpan="1">价税合计(大写)</td>
            <td className={styles.alignLeft} colSpan="4"><span>{updateData.totalZH}</span></td>
            <td className={styles.alignLeft} colSpan="3"><span>{updateData.vehicleAmountDisp}</span></td>
          </tr>
          <tr>
            <td  colSpan="1">销货单位名称</td>
            <td className={styles.alignLeft} colSpan="4"><span>{updateData.salesName}</span></td>
            <td >电话</td>
            <td className={styles.alignLeft} colSpan="3"><span>{updateData.SalesTel}</span></td>
          </tr>
          <tr>
            <td  colSpan="1">纳税人识别号</td>
            <td className={styles.alignLeft} colSpan="4"><span>{updateData.salesNum}</span></td>
            <td >账号</td>
            <td className={styles.alignLeft} colSpan="3"><span>{updateData.salesBankAccount}</span></td>
          </tr>
          <tr>
            <td  colSpan="1">地址</td>
            <td className={styles.alignLeft} colSpan="4"><span>{updateData.salesAddress}</span></td>
            <td >开户银行</td>
            <td className={styles.alignLeft} colSpan="3"><span>{updateData.salesBank}</span></td>
          </tr>

          <tr>
            <td rowSpan="1" >
              <span>增值税税率或征收率:</span></td>
            <td className={styles.alignLeft} colSpan="1">
              <span>{updateData.vehicleTaxRateDisp}</span></td>
            <td className={styles.alignLeft} colSpan="2">
              <span>增值税税额：</span></td>
            <td className={styles.alignLeft} colSpan="2">
              <span>{updateData.vehicleTaxAmountDisp}</span></td>
            <td className={styles.alignLeft} colSpan="2">
              <span>主管税务机关及代码：</span></td>
            <td className={styles.alignLeft} colSpan="2">
              <span>{updateData.supervisorName}{updateData.supervisorTaxNo}</span></td>
          </tr>
          <tr>
            <td rowSpan="1" >
              <span>不含税价:</span></td>
            <td className={styles.alignLeft} colSpan="2">
              <span>{updateData.vehicleAmountWithTaxDisp}</span></td>
            <td className={styles.alignLeft} colSpan="1">
              <span>完税凭证号码：</span></td>
            <td className={styles.alignLeft} colSpan="1">
              <span>{updateData.taxPaymentReceiptNo}</span></td>
            <td className={styles.alignLeft} colSpan="1">
              <span>吨位：</span></td>
            <td className={styles.alignLeft} colSpan="1">
              <span>{updateData.tonnage}</span></td>
            <td className={styles.alignLeft} colSpan="1">
              <span>限乘人数：</span></td>
            <td className={styles.alignLeft} colSpan="1">
              <span>{updateData.vehicleLimit}</span></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>)

  }
}

