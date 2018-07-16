import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import moment from 'moment'

import { connect } from 'dva'
import { Form, Input, Button,Row,Col,Collapse} from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
// import styles from './index.less'
import dataConfig from "../dataConfig"
const Panel = Collapse.Panel;

const DetailContent=({
    goBack,formData
})=>{
  const {outputTypeList,alignList} = dataConfig

  return(
        <div className="content-detail">
          <div className="form-btn-group">
            <Button style={{marginBottom:'5px'}} onClick={goBack}>返回</Button>
          </div>
          <Collapse className="collapse mb10" defaultActiveKey={['1']} >
            <Panel header="基本信息" key="1">
              <Row className="message" gutter={24}>
                <Col span={8}>
                    <span>数据列代码：</span><span>{formData.dataColCode}</span>
                </Col>
                <Col span={8}>
                    <span>数据列名称：</span><span>{formData.dataColName}</span>
                </Col>
                <Col span={8}>
                  <span>输出列别名：</span><span>{formData.dataColnAme2}</span>
                </Col>
                <Col span={8}>
                    <span>输出类型：</span><span>{outputTypeList[formData.outputType]}</span>
                </Col>
                <Col span={8}>
                    <span>格式掩码：</span><span>{formData.formatMask}</span>
                </Col>
                <Col span={8}>
                    <span>输出长度：</span><span>{formData.outputLength}</span>
                </Col>
                <Col span={8}>
                    <span>对齐方式：</span><span>{alignList[formData.align]}</span>
                </Col>
                <Col span={8}>
                    <span>排序：</span><span>{formData.sort}</span>
                </Col>
                <Col span={8}>
                    <span>是否启用：</span><span>{formData.isvalId==='1' ? '是' : '否'}</span>
                </Col>
                <Col span={8}>
                    <span>是否为主键：</span><span>{formData.isPk==='1' ? '是' : '否'}</span>
                </Col>
                <Col span={8}>
                    <span>最后更新时间：</span><span>{moment(formData.lastupdateTime).format("YYYY-MM-DD")}</span>
                </Col>
            </Row>
            </Panel>
          </Collapse>
        </div>
    )
}

export default DetailContent
