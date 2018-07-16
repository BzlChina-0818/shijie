import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'dva'
import { Button, Icon, Row, Col, Input, Collapse } from 'antd'
import { History } from 'dva/router'
import queryString from 'query-string'
import styles from './index.less'
const { TextArea } = Input;
const Panel = Collapse.Panel;
/**
 * @description 动态表单>输出日志
 * @author wangliang + guoqianyuan
 */
const journalDetail = ({ location, journalDetailModels }) => {
  // 动态详情数据
  let { jDetails } = journalDetailModels;

  const callback = (key) => {
    console.log(key)
  }

  const goBack = () =>{
    history.go(-1)
  }

  return (
    <div className="form-pane detail-list">
      <div className="op-btn-group">
        <Button onClick={goBack} >返回</Button>
      </div>
      <Collapse className="collapse" defaultActiveKey={['1']} onChange={callback}>
        <Panel header="数据源执行脚本日志" key="1">
          <Row gutter={4} className={styles.wrapTitle}>
            <Col span={2} offset={1}>
              执行时间:
            </Col>
            <Col span={4}>
              {jDetails !== undefined && jDetails.createTime}
            </Col>
            <Col span={2}>
              执行状态:
            </Col>
            <Col span={6} offset={1}>
              {jDetails !== undefined && jDetails.datasourceName}
            </Col>
          </Row>
          <Row gutter={4} justify="center">
            <Col span={2} offset={1}>
              执行时长:
            </Col>
            <Col span={4}>
              {jDetails !== undefined && jDetails.endTime}
            </Col>
            <Col span={2}>
              执行人:
            </Col>
            <Col span={6} offset={1}>
              {jDetails !== undefined && jDetails.createUser}
            </Col>
          </Row>
        </Panel>
      </Collapse>
      <Row type="flex" align="center" className={styles.jdTextarea} justify="center">
        <Col span={2} offset={1} className={styles.jdTextareaTit}>
          错误代码:
        </Col>
        <Col span={21}>
          <p>{jDetails !== undefined && jDetails.errorCode}</p>
        </Col>
      </Row>
    </div>

  )
}

export default connect(({journalDetailModels}) => ({journalDetailModels}))(journalDetail)
