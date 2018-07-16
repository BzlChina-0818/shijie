import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card, Icon } from 'antd'
import { Page } from 'components'
import { MoreCarousel, DashTabs, AgentContent } from './components'

let dataImg = [
  {
    icon: <Icon type="smile"/>,
    id:1,
    dataImgTit:"我的代办"
  },
  {
    icon: <Icon type="smile"/>,
    id:2,
    dataImgTit:"专票接收池"
  },
  {
  icon: <Icon type="smile"/>,
  id:3,
  dataImgTit:"自动接收池"
  },
  {
    icon: <Icon type="smile"/>,
    id:4,
    dataImgTit:"发票登记"
  },
  {
    icon: <Icon type="smile"/>,
    id:5,
    dataImgTit:"我的代办"
  },
  {
    icon: <Icon type="smile"/>,
    id:6,
    dataImgTit:"专票接收池"
  },
  {
    icon: <Icon type="smile"/>,
    id:7,
    dataImgTit:"自动接收池"
  },
  {
    icon: <Icon type="smile"/>,
    id:8,
    dataImgTit:"发票登记"
  },
  {
    icon: <Icon type="smile"/>,
    id:9,
    dataImgTit:"发票登记"
  },
  {
    icon: <Icon type="smile"/>,
    id:10,
    dataImgTit:"发票登记"
  }]

let tabData = [
  {
    title:"系统状态",
    id:1,
    content:'内容1'
  },
  {
    title:"来源系统",
    id:2,
    content:'内容2'
  },
  {
    title:"开票服务器",
    id:3,
    content:'内容3'
  },
  {
    title:"打印终端",
    id:4,
    content:'内容4'
  }]

let list = [
    {
      key:1,
      "type":"专票开票申请",
      "title":"XXX请求开具专票金额2000元"
    },
    {
      key:2,
      "type":"普票开票申请",
      "title":"XXX请求开具专票金额1520元"
    },
    {
      key:3,
      "type":"专票开票申请",
      "title":"XXX请求开具专票金额2000元"
    },
    {
      key:4,
      "type":"普票开票申请",
      "title":"XXX请求开具专票金额1300元"
    },
    {
      key:5,
      "type":"专票开票申请",
      "title":"XXX请求开具专票金额600元"
    },
    {
      key:6,
      "type":"普票开票申请",
      "title":"XXX请求开具专票金额2000元"
    },
    {
      key:7,
      "type":"专票开票申请",
      "title":"XXX请求开具专票金额2000元"
    }]

    
function Dashboard ({ dashboard, loading }) {
  const carouselProps = {
    leftRigthBtn:true,
    addBtn:true,
    slides:7
  }

  return (
    <Fragment>
      <MoreCarousel dataImg={dataImg} { ...carouselProps }/>
      <Page inner loading={loading.models.dashboard}>
        <AgentContent list={list}/>
        <DashTabs tabData={tabData}/>
      </Page>
    </Fragment>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ dashboard, loading }) => ({ dashboard, loading }))(Dashboard)
