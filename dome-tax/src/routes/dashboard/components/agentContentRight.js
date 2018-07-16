import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col } from 'antd';
import AgentContentTit from './agentContentTit'
import { init } from 'echarts'
import styles from './agentContent.less'

class MyEcharts extends Component{
  componentDidMount() {
    let { ...option } = this.props;
    let myChart = init(document.getElementById('agentSum'))
    myChart.setOption({
      ...option
    });
  }
  render(){
    return <div className={styles.AgentSum} id="agentSum"></div>
  }
}

const AgentContentRight = ({
                              CardData,
                              ...option  
                          }) => {
  return (
    <div className={styles.br1}>
       <div className={styles.br1}>
          <AgentContentTit titleLeft="个人信息"/>
        </div>
        <div className={styles.card}>
          <Row gutter={30} className={styles.plr30}> 
            {
              CardData.map((Cards,index) => {
                return (
                  <Col span={8} key={Cards.id}>
                    <Card className={styles.AgentCard}>
                      <p className={styles.AgentCardTit}><span><b style={{color:Cards.numColor}}>{Cards.expandAmount}</b>张</span><span><b style={{color:Cards.numColor}}>{Cards.money}</b>万元</span></p>
                      <p>{Cards.CardTitle}</p>
                    </Card>
                  </Col>
                )
              })
            }
          </Row>
        </div>
        <MyEcharts { ...option }/>
    </div>
  )
}


export default AgentContentRight