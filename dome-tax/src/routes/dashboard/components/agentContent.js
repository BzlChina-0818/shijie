import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Table } from 'antd';
import styles from './agentContent.less'
import AgentContentLeft from './agentContentLeft'
import AgentContentCenter from './agentContentCenter'
import AgentContentRight from './agentContentRight'

const columns = [{
  title: '待办类型',
  dataIndex: 'type',
  key: 'type',
}, {
  title: '标题',
  dataIndex: 'title',
  key: 'title',
}];

let statusData = [
  {
    title:"专票开具",
    id:1,
  invoiceAmount:[
  {
    invoiceTit: "发票库存",
    amount:2321
  },
  {
    invoiceTit: "待打印信息",
    amount:234423
  },
  {
    invoiceTit: "已开专票",
    amount:23421
  },
  {
    invoiceTit: "作废或冲红",
    amount:23442
  }]
},
{
  title:"普通开具",
  id:2,
  invoiceAmount:[{
    invoiceTit: "发票库存",
    amount:3234
  },
  {
    invoiceTit: "待打印信息",
    amount:244
  },
  {
    invoiceTit: "已开专票",
    amount:2324
  },
  {
    invoiceTit: "作废或冲红",
    amount:434
  }]
},
{
  title:"电子票开具",
  id:3,
  invoiceAmount:[
    {
    invoiceTit: "发票库存",
    amount:23344
  },
  {
    invoiceTit: "待打印信息",
    amount:2334
  },
  {
    invoiceTit: "已开专票",
    amount:2434
  },
  {
    invoiceTit: "作废或冲红",
    amount:24345
  }]
}]

let CardData = [{
  id:1,
  expandAmount:8,
  money:12,
  numColor:'#5AAAFB',
  CardTitle:"当日专票开具"
},{
  id:2,
  expandAmount:28,
  money:36,
  numColor:'#FFBF00',
  CardTitle:"当月专票开具"
},{
  id:3,
  expandAmount:36,
  money:60,
  numColor:'#5AA700',
  CardTitle:"当日专票开具"
}]

let option = {
  color: ['#5AAAFA'],
  tooltip : {
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
  },
  grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
  },
  legend: {
    data: ['专票开具金额'],
    left: 'right'
  },
  xAxis : [
      {
          type : 'category',
          data : ['1月', '2月', '3月', '4月'],
          axisTick: {
              alignWithLabel: true
          }
      }
  ],
  yAxis : [
      {
          type : 'value'
      }
  ],
  series : [
      {
          name:'专票开具金额',
          type:'bar',
          barWidth: '40%',
          data:[103, 52, 200, 334]
      }
  ]
};


const AgentContent = ({ list }) => {
  return (
    <Row className={styles.agentContentToWrap} gutter={20}>
      <Col span={8}>
        <AgentContentLeft columns={columns} list={list}/>
      </Col>
      <Col span={5}>
        <AgentContentCenter statusData={statusData}/>
      </Col>
      <Col span={11}>
        <AgentContentRight CardData={CardData} {...option}/>
      </Col>
  </Row>
  )
}

AgentContent.propTypes = {
  list:PropTypes.array
}

export default AgentContent