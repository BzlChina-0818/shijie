import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Form, Input, Button,Row,Col,Table} from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import styles from './index.less'
// import city from '../../../utils/city'
// import Modal from './Modal'


const detail=({
    ticketServerDetail,dispatch,location
})=>{
    //const { data } = printingPoolDetail
    const detailData = queryString.parse(location.query)||{};
    const goBack=()=>{
        dispatch(routerRedux.push({
            pathname:'/ticketServer'
        }))
    } 
    const dataSource = [{
        code: '1',
        name: '胡彦斌',
        biaoshi:true,
        startTime:'2017-10-10',
        endTime:'2017-10-11',
        printAddress:'西湖区湖底公园1号',
        invoiceAdministrator: 'lll22'
      },{
        code: '1',
        name: '胡彦斌',
        biaoshi:true,
        startTime:'2017-10-10',
        endTime:'2017-10-11',
        printAddress:'西湖区湖底公园1号',
        invoiceAdministrator: 'lll22'
      },{
        code: '1',
        name: '胡彦斌',
        biaoshi:true,
        startTime:'2017-10-10',
        endTime:'2017-10-11',
        printAddress:'西湖区湖底公园1号',
        invoiceAdministrator: 'lll22'
      },{
        code: '1',
        name: '胡彦斌',
        biaoshi:true,
        startTime:'2017-10-10',
        endTime:'2017-10-11',
        printAddress:'西湖区湖底公园1号',
        invoiceAdministrator: 'lll22'
      },{
        code: '1',
        name: '胡彦斌',
        biaoshi:true,
        startTime:'2017-10-10',
        endTime:'2017-10-11',
        printAddress:'西湖区湖底公园1号',
        invoiceAdministrator: 'lll22'
      },{
        code: '1',
        name: '胡彦斌',
        biaoshi:true,
        startTime:'2017-10-10',
        endTime:'2017-10-11',
        printAddress:'西湖区湖底公园1号',
        invoiceAdministrator: 'lll22'
      },{
        code: '1',
        name: '胡彦斌',
        biaoshi:true,
        startTime:'2017-10-10',
        endTime:'2017-10-11',
        printAddress:'西湖区湖底公园1号',
        invoiceAdministrator: 'lll22'
      },{
        code: '1',
        name: '胡彦斌',
        biaoshi:true,
        startTime:'2017-10-10',
        endTime:'2017-10-11',
        printAddress:'西湖区湖底公园1号',
        invoiceAdministrator: 'lll22'
      },{
        code: '1',
        name: '胡彦斌',
        biaoshi:true,
        startTime:'2017-10-10',
        endTime:'2017-10-11',
        printAddress:'西湖区湖底公园1号',
        invoiceAdministrator: 'lll22'
      },{
        code: '1',
        name: '胡彦斌',
        biaoshi:true,
        startTime:'2017-10-10',
        endTime:'2017-10-11',
        printAddress:'西湖区湖底公园1号',
        invoiceAdministrator: 'lll22'
      },{
        code: '1',
        name: '胡彦斌',
        biaoshi:true,
        startTime:'2017-10-10',
        endTime:'2017-10-11',
        printAddress:'西湖区湖底公园1号',
        invoiceAdministrator: 'lll22'
      },{
        code: '1',
        name: '胡彦斌',
        biaoshi:true,
        startTime:'2017-10-10',
        endTime:'2017-10-11',
        printAddress:'西湖区湖底公园1号',
        invoiceAdministrator: 'lll22'
      },];
      
      const columns = [{
        title: '打印终端名称',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '打印终端编号',
        dataIndex: 'code',
        key: 'code',
      }, {
        title: '启用标识',
        dataIndex: 'biaoshi',
        key: 'biaoshi',
      },
      {
        title: '开始使用时间',
        dataIndex: 'startTime',
        key: 'startTime',
      },
      {
        title: '结束使用时间',
        dataIndex: 'endTime',
        key: 'endTime',
      },
      {
        title: '打印网点',
        dataIndex: 'printAddress',
        key: 'printAddress',
      },{
        title: '发票管理员',
        dataIndex: 'invoiceAdministrator',
        key: 'invoiceAdministrator',
      }]; 
    return(
        <div className="content-detail">
           <div className="go-back"><Button type="primary" size='small' onClick={goBack} icon="left-circle">返回</Button></div> 
           <div className={styles.content}>
                <div>
                    <div className="title">开票信息服务器维护</div>
                    <Row className="message" gutter={24}>
                        <Col span={8}>
                            <span>纳税主体名称：</span><span>{detailData.printingName}</span>
                        </Col>
                        <Col span={8}>
                            <span>纳税人识别号：</span><span>{detailData.printingCode}</span>
                        </Col>
                        <Col span={8}>
                            <span>服务器开票名称：</span><span>{detailData.createTime3}</span>
                        </Col>
                        <Col span={8}>
                            <span>金税卡名称：</span><span>{detailData.jinshui}</span>
                        </Col>
                        <Col span={8}>
                            <span>金税卡编号：</span><span>{detailData.jinshuibianhao}</span>
                        </Col>
                        <Col span={8}>
                            <span>开票服务器代码：</span><span>{detailData.address}</span>
                        </Col>
                        <Col span={8}>
                            <span>发票版本限额：</span><span>{detailData.jinshuibianhao}</span>
                        </Col>
                        <Col span={8}>
                            <span>分发服务器IP：</span><span>{detailData.address}</span>
                        </Col>
                        <Col span={8}>
                            <span>是否主开票服务器：</span><span>{detailData.biaoShi ? '是' : '否'}</span>
                        </Col>
                        <Col span={8}>
                            <span>详细地址：</span><span>{detailData.address}</span>
                        </Col>
                        <Col span={8}>
                            <span>主开票服务器：</span><span>{detailData.address}</span>
                        </Col>
                        <Col span={8}>
                            <span>接受服务器IP：</span><span>{detailData.address}</span>
                        </Col>
                        <Col span={8}>
                            <span>税务专员：</span><span>{detailData.endTime}</span>
                        </Col>
                        <Col span={8}>
                            <span>主开票服务器：</span><span>{detailData.address}</span>
                        </Col>
                        <Col span={8}>
                            <span>开始使用时间：</span><span>{detailData.createTime}</span>
                        </Col>
                        <Col span={8}>
                            <span>结束使用时间：</span><span>{detailData.endTime}</span>
                        </Col>
                        <Col span={8}>
                            <span>启用标识：</span><span>{detailData.biaoShi ? '是' : '否'}</span>
                        </Col>
                    </Row>
                </div>
                <div>
                    <div className={styles.title}>打印终端清单</div>
                    <Table className="content-list" style={{background:'#fff'}} bordered columns={columns} dataSource={dataSource} size="small"></Table>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}
export default connect(({ ticketServerDetail, loading }) => ({ ticketServerDetail, loading}))(detail)