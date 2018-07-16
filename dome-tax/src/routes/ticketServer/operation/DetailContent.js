import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Form, Input, Button,Row,Col,Table} from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import ButtonGroup from './ButtonGroup'
import styles from './index.less'
const DetailContent=({
    item,
    back,
})=>{
    const goBack=()=>{
        back()
    }
    return(
        <div className="content-detail">
        <Button type="primary" onClick={goBack} icon="left-circle">返回</Button>
            {/* <ButtonGroup {...formProps}/> */}
            <div className="title">开票信息服务器维护</div>
            <Row className="message" gutter={24}>
                <Col span={8}>
                    <span>纳税主体名称：</span><span>{item.printingName}</span>
                </Col>
                <Col span={8}>
                    <span>纳税人识别号：</span><span>{item.printingCode}</span>
                </Col>
                <Col span={8}>
                    <span>服务器开票名称：</span><span>{item.createTime3}</span>
                </Col>
                <Col span={8}>
                    <span>金税卡名称：</span><span>{item.jinshui}</span>
                </Col>
                <Col span={8}>
                    <span>金税卡编号：</span><span>{item.jinshuibianhao}</span>
                </Col>
                <Col span={8}>
                    <span>开票服务器代码：</span><span>{item.address}</span>
                </Col>
                <Col span={8}>
                    <span>发票版本限额：</span><span>{item.jinshuibianhao}</span>
                </Col>
                <Col span={8}>
                    <span>分发服务器IP：</span><span>{item.address}</span>
                </Col>
                <Col span={8}>
                    <span>是否主开票服务器：</span><span>{item.biaoShi ? '是' : '否'}</span>
                </Col>
                <Col span={8}>
                    <span>详细地址：</span><span>{item.address}</span>
                </Col>
                <Col span={8}>
                    <span>主开票服务器：</span><span>{item.address}</span>
                </Col>
                <Col span={8}>
                    <span>接受服务器IP：</span><span>{item.address}</span>
                </Col>
                <Col span={8}>
                    <span>税务专员：</span><span>{item.endTime}</span>
                </Col>
                <Col span={8}>
                    <span>主开票服务器：</span><span>{item.address}</span>
                </Col>
                <Col span={8}>
                    <span>开始使用时间：</span><span>{item.createTime}</span>
                </Col>
                <Col span={8}>
                    <span>结束使用时间：</span><span>{item.endTime}</span>
                </Col>
                <Col span={8}>
                    <span>启用标识：</span><span>{item.biaoShi ? '是' : '否'}</span>
                </Col>
            </Row>
        </div>
    )
}

export default DetailContent