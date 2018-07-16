import React from 'react'
import { Tabs, Calendar, Steps } from 'antd';
import styles from './dashTabs.less'
const TabPane = Tabs.TabPane;
const Step = Steps.Step;

const callback = (key) => {
  console.log(key)
}

function onPanelChange(value, mode) {
  console.log(value, mode);
}

const DashTabs = ({ tabData }) => {
  return (
    <Tabs onChang={callback} type="card">
      <TabPane tab="系统状态" key="1">
        <div className={styles.DashTabsCalendar}>
          <Calendar fullscreen={false} onPanelChange={onPanelChange} />
        </div>
        <div className={styles.DashTabsSteps}>
          
        </div>
      </TabPane>
      <TabPane tab="来源系统" key="2">内容2</TabPane>
      <TabPane tab="开票服务器" key="3">内容3</TabPane>
      <TabPane tab="打印终端" key="4">内容4</TabPane>
      {
        /* tabData.map(value => {
          return <TabPane tab={value.title} key={value.id}>{value.content}</TabPane>
        }) */
      }
    </Tabs>
  )
}

export default DashTabs;