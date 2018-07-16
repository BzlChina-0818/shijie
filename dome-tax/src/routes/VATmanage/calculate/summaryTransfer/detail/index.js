import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { message as Meaasge} from 'antd'
import { Button, Row, Col } from 'antd'

import { Page } from 'components'
import queryString from 'query-string'

import { PATH } from "utils"
const path = PATH.VAT_CALCULATE

/**
 * @description 增值税管理>增值税计算>增值税汇总传递单详情
 * @author guoqianyuan
 */
const SummaryTransferDetail = ({
  location, dispatch, SummaryTransferDetail, loading,
}) => {
  // const locationState = queryString.parse(location.search)
  // const { pathname } = location
  // const { list, pagination, modalVisible, selectedRows } = SummaryTransferDetail
  const goBack=()=>{
    history.go(-1)
  }
  const onExportRule=()=>{
    history.go(-1)
  }
  const goDetail=()=>{

  }
  return (
    <Page inner>
      <div className="form-pane">
        <div className="form-btn-group">
          <Button className="margin-right" onClick={onExportRule}>导出</Button>
          <Button className="margin-right" onClick={goBack}>返回</Button>
        </div>
        <div className='form-content'>
          <div className="table-form">
            <div className="table-form-title">
              <h1>电信企业分支机构增值税汇总纳税信息传递单</h1>
              <div className="desc">
                <Row>
                  <Col  span={6}>
                    纳税人名称: 中国dd
                  </Col>
                  <Col  span={6}>
                    纳税人识别码: 9102930
                  </Col>
                  <Col  span={6}>
                    所属期间：2018年09月
                  </Col>
                  <Col  span={6}>
                    金额单位：元（至角、分）
                  </Col>
                </Row>
              </div>
            </div>
            <div className="table-form-content">
              <table>
                <thead>
                  <tr>
                    <th colSpan={2} rowSpan={2}>项目</th>
                    <th colSpan={10}>已缴纳增值税情况</th>
                    <th colSpan={4}>取得进项税额情况</th>
                  </tr>
                  <tr>
                    <th>基础电信服务销售额</th>
                    <th>增值电信服务销售额</th>
                    <th>其它应税服务销售额</th>
                    <th>预收款</th>
                    <th>汇总业务预缴税额</th>
                    <th>异地预征税额</th>
                    <th>税额差异调整</th>
                    <th>查补销售额</th>
                    <th>查补税额</th>
                    <th>属地业务预缴税额</th>
                    <th>金额</th>
                    <th>进项税额</th>
                    <th>税款设备及技术服务费</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>1</td>
                      <td>中国</td>
                      <td>中国</td>
                      <td>中国</td>
                      <td>中国</td>
                      <td>中国</td>
                      <td>中国</td>
                      <td>中国</td>
                      <td>中国</td>
                      <td>中国</td>
                      <td>中国</td>
                      <td>中国</td>
                      <td>中国</td>
                      <td>中国</td>
                      <td>中国</td>
                      <td><Button onClick={goDetail}>详情</Button></td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

SummaryTransferDetail.propTypes = {
  SummaryTransferDetail: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ SummaryTransferDetail, loading }) => ({ SummaryTransferDetail, loading }))(SummaryTransferDetail)
