import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Form, Input, Button,Row,Col,} from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import styles from './index.less'
// import city from '../../../utils/city'
// import Modal from './Modal'

const printingInfo={
  labelCol: {
    span: 8,
    style:{
      border:'1px solid #000'
    }
  },
  wrapperCol: {
    span: 16,
  },
}
const detail=({
                printingTerminalDetail,dispatch,location
})=>{

    const detailData = queryString.parse(location.search)
    const goBack=()=>{
        dispatch(routerRedux.push({
            pathname:'/printingTerminal'
        }))
    }
    return(
        <div>
           <div><Button style={{marginLeft:'10'}} type="primary" size='small' onClick={goBack} icon="left-circle">返回</Button></div>
           <div className={styles.content}>
               <div className={styles.title}>查看打印池信息</div>
                <Row gutter={24}>
                    <Col span={8} >
                        <span className={styles.colLeft}>打印终端编号：</span><span>{detailData.printingCode}</span>
                    </Col>
                    <Col span={8}>
                        <span className={styles.colLeft}>打印终端名称：</span><span>{detailData.printingName}</span>
                    </Col>
                    <Col span={8}>
                        <span className={styles.colLeft}>详细地址：</span><span>{detailData.address}</span>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={8}>
                        <span className={styles.colLeft}>发票打印员：</span><span>{detailData.InvoicePrinter}</span>
                    </Col>
                    <Col span={8}>
                        <span className={styles.colLeft}>可否手工开票：</span><span>{detailData.make}</span>
                    </Col>
                    <Col span={8}>
                        <span className={styles.colLeft}>复核人：</span><span>{detailData.InvoiceReviewer}</span>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={8}>
                        <span className={styles.colLeft}>发票数量上限：</span><span>{detailData.quantityCeiling}</span>
                    </Col><Col span={8}>
                        <span className={styles.colLeft}>所属打印池：</span><span>{detailData.InvoicePrintingPool}</span>
                    </Col><Col span={8}>
                        <span className={styles.colLeft}>启用标识：</span><span>{detailData.biaoshi}</span>
                    </Col>
                </Row>
             <Row gutter={24}>
             <Col span={8}>
               <span className={styles.colLeft}>发票数量下限：</span><span>{detailData. lowerNumber}</span>
             </Col><Col span={8}>
             <span className={styles.colLeft}>开始使用时间：</span><span>{detailData.createTime}</span>
           </Col><Col span={8}>
             <span className={styles.colLeft}>结束使用时间：</span><span>{detailData.endTime}</span>
           </Col>
           </Row>
             <Row gutter={24}>
               <Col span={10}>
                 <span className={styles.colLeft}>未盘点可以开票期限：</span><span>{detailData. invoiceDate}</span>
               </Col>
             </Row>
           </div>
           <div>

           </div>
        </div>

    )
}
export default connect(({ printingPoolDetail, loading }) => ({ printingPoolDetail, loading}))(detail)
