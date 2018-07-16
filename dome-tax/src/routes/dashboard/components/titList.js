import React from 'react'
import { Table } from 'antd'
import styles from './titList.less'

const columns = [{
  title: '专票开具',
  dataIndex: 'invoiceTit',
  key: 'invoiceTit',
}, {
  dataIndex: 'amount',
  key: 'amount',
}];

const TitList = ( {statusData} ) => {
  //console.log(statusData)
  return (
    <div className={styles.titleList}>
      {
        statusData.map(value => {
          return <div key={value.id} className={styles.lists}>
            <div className={styles.titleListTop}>
              {value.title}
            </div>
            {
              value.invoiceAmount.map((val,index) => {
                return <p key={val.amount}>
                  <span>{val.invoiceTit}</span>
                  <span><b>{val.amount}</b>张</span>
                </p>
              })
            }
            
          </div>
        })
      }
      
    </div>
  )
}

export default TitList;

