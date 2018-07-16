import React from 'react'
import PropTypes from 'prop-types'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import {Row, Col, Form, Table} from 'antd'
import {Page, UFormItem} from 'components'
import queryString from 'query-string'
import styles from './index.less'

const AddInvoiceDetail = ({
                            location,
                            dispatch,
                            addInvoiceDetail,
                            loading,
                            /* form: {
                               getFieldDecorator,
                               validateFields,
                               getFieldsValue,
                               setFieldsValue,
                             }*/
                          }) => {
  const {invoiceData} = addInvoiceDetail
  const {invInvoiceLineDetailOutVO} = addInvoiceDetail

  let formItems = [
    {
      label: "纳税人识别号",
      code: "redApplyNum",

      inputEle: <p>{invoiceData.redApplyNum}</p>
    },
    {
      label: "纳税所属期间",
      code: "notificationNo",
      initialValue: invoiceData.notificationNo,


      inputEle: <p>{invoiceData.notificationNo}</p>
    },
    {
      label: "填表日期",
      code: "applyUserName",

      inputEle: <p>{invoiceData.applyUserName}</p>
    },
    {
      label: "纳税人名称(公章)",
      code: "applyUserTel",

      inputEle: <p>{invoiceData.applyUserTel}</p>
    },
    {
      label: "金额单位",
      code: "applyDeptName",

      inputEle: <p>{invoiceData.applyDeptName}</p>
    },

  ]
  const columns = [{
    title: '项目',
    dataIndex: 'name',
    key: 'name',
    width: 600,

  }, {
    title: '档次',
    dataIndex: 'name',
    key: 'name',
    width: 117,

  }, {
    title: '一般货物及劳务和应税服务',
    width: 339,
    children: [
      {
        title: '本月数',
        dataIndex: 'age',
        key: 'age',
        width: 170,

      },
      {
        title: '本年累计',
        dataIndex: 'age',
        key: 'age',
        width: 170,
      }],
  }, {
    title: '即征即退货物及劳务和应税服务',
    width: 339,
    children: [{
      title: '本月数',
      dataIndex: 'companyAddress',
      key: 'companyAddress',
      width: 170,
    }, {
      title: '本年累计',
      dataIndex: 'companyName',
      key: 'companyName',
      width: 170,
    }],
  }];
  const data = [];

  return (
    <Page inner>
      <div className={styles.addInvoiceContent}>
        <div className={styles.addInvoiceTitle}>
          <span>增值税销项基础表</span>
          <Form>
            <Row gutter={24} type="flex" className='message'>
              {/*     {
                formItems.map((item, index) => (
                  <Col span={12} key={index} >
                    <UFormItem {...item} pageType="detail"></UFormItem>
                  </Col>
                ))
              }*/}
            </Row>
          </Form>
        </div>
        <div className={styles.addInvoiceTable}>

          <table>
            <tbody border="1">
            <tr>
              <td colSpan={5} rowSpan={2}>项目</td>
              <td colSpan={1} rowSpan={2}>档次</td>
              <td colSpan={2}>一般货物及劳务和应税服务</td>
              <td colSpan={2}>即征即退货物及劳务和应税服务</td>
            </tr>
            <tr>
              <td>本月数</td>
              <td>本年累计</td>
              <td>本月数</td>
              <td>本年累计</td>
            </tr>
            <tr>
              <td rowSpan={10} colSpan={1}>销售额</td>
              <td colSpan={4}>(一)按适用税率征税销售额</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td colSpan={4}>其中:应税货物销售额</td>
              <td>2</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td colSpan={4}>应税劳务销售额</td>
              <td>3</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td colSpan={4}>纳税检查调整的销售额</td>
              <td>4</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td colSpan={4}>(二)按简易办法计税销售额</td>
              <td>5</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td colSpan={4}>其中:纳税检查调整的销售额</td>
              <td>6</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td colSpan={4}>(三)免、抵、退办法出口销售额</td>
              <td>7</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td colSpan={4}>(四)免税销售额</td>
              <td>8</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td colSpan={4}>其中:免税货物销售额</td>
              <td>9</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td colSpan={4}>免税劳务销售额</td>
              <td>10</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            </tbody>
          </table>
        </div>
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

export default connect(({addInvoiceDetail, loading}) => ({addInvoiceDetail, loading}))(AddInvoiceDetail)
