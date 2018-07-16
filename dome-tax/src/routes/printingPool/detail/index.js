import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Form, Input, Button,Row,Col } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import styles from './index.less'
// import city from '../../../utils/city'
// import Modal from './Modal'
const detail=({
    printingPoolDetail,dispatch,location
})=>{
    //const { data } = printingPoolDetail
    const detailData = queryString.parse(location.query)
    //console.log(detailData)
    const goBack=()=>{
        dispatch(routerRedux.push({
            pathname:'/printingPool'
        }))
    }
    return(
        <div>
           <div><Button style={{marginLeft:'10'}} type="primary" size='small' onClick={goBack} icon="left-circle">返回</Button></div> 
           <div className={styles.content}>
               <div className={styles.title}>查看打印池信息</div>
                <Row gutter={24}>
                    <Col span={8}>
                        <span className={styles.colLeft}>打印池代码：</span><span>{detailData.printPoolCode}</span>
                    </Col>
                    <Col span={8}>
                        <span className={styles.colLeft}>打印池名称：</span><span>{detailData.printPoolName}</span>
                    </Col>
                    <Col span={8}>
                        <span className={styles.colLeft}>所属区域：</span><span>{detailData.address}</span>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={8}>
                        <span className={styles.colLeft}>所属组织：</span><span>{detailData.phone}</span>
                    </Col>
                    <Col span={8}>
                        <span className={styles.colLeft}>开始使用时间：</span><span>{detailData.startTime}</span>
                    </Col>
                    <Col span={8}>
                        <span className={styles.colLeft}>结束使用时间：</span><span>{detailData.endTime}</span>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={8}>
                        <span className={styles.colLeft}>启用标识：</span><span>{detailData.isOpen?'是':'否'}</span>
                    </Col>
                </Row>
           </div>
           <div>
               
           </div>
        </div>

    ) 
}
export default connect(({ printingPoolDetail, loading }) => ({ printingPoolDetail, loading}))(detail)
