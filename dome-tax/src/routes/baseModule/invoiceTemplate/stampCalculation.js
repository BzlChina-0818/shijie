import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import {Page} from 'components'
import queryString from 'query-string'
import styles from './stampCalculation.less'
import { Modal, message, Form, Input, Table, Row, Col, Button } from 'antd'
import { request } from 'utils'
import { queryBizCoaList } from 'services/baseAPI'
const FormItem = Form.Item;
export default class stampCalculation extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title:"印花税计算表",
      updateData:{},
    }
  }
  render (){
    let {title,updateData}=this.props
    const data1=[{'place':'134'},{'place':'234'},{'place':'334'}]
    const data={'4':111,'5':222,'6':333,'7':444,'8':888,'9':999,'10':110,'11':111,'12':112,'13':113,'14':114,'15':115,ss:111}
    
    const trs=data1.map((item,index)=>
             <tr>
              <td>{item.place}</td>
              <td>{data+'['+(4+4*index).toString()+']'}</td>
              <td>{data+'['+(5+4*index).toString()+']'}</td>
              <td>{data+'['+(6+4*index).toString()+']'}</td>
              <td>{data.ss}</td>
             </tr>
           )
     return ( <div className={styles.stampContent}>
       <div className={styles.stampTitle}>
         <p className={styles.title}>{title}</p>
         <p>纳税人识别码: {updateData.invoiceCode}</p>
         <p>
            <span>申报单位: {updateData.invoiceNum}</span>
            <span>所属期间: {updateData.invoiceNum}</span>
            <span>金额单位: 人民币元(列至角分)</span>
        </p>
       </div>
       <div className={styles.addInvoiceTable}>
         <table>
             <thead border="1" >
             <tr>
             <td>税目</td>
                <td>件数</td>
                <td>计算依据</td>
                <td>税率</td>
                <td>税额</td>
             </tr>  
             </thead>
           <tbody border="1">
           {trs}
           {/* {data1.map((item,index)=>{
             <tr>
              <td>{item.place}</td>
              <td>{data+`.${num+num*index}`}</td>
              <td>{data+`.${(num+1)+num*index}`}</td>
              <td>{data+`.${(num+2)+num*index}`}</td>
              <td>{data+`.${(num+3)+num*index}`}</td>
             </tr>
           })} */}
           {/* {updateData.itemList && updateData.itemList != null && updateData.itemList.map((item, index) =>
             <tr key={item.productName}>
               <td >{item.taxItem}</td>
               <td>{item.spec}</td>
               <td>{item.unit}</td>
               <td>{item.quantity}</td>
               <td>{item.priceDisp}</td>
             </tr>
           )} */}

           <tr>
             <td className={styles.bg}>合计(大写)</td>
             <td className={styles.alignLeft}><span>{updateData.totalZH}</span></td>
             <td></td>
             <td className={styles.alignLeft}><span>{updateData.totalDisp}</span></td>
             <td></td>
           </tr>
           </tbody>
         </table>
       </div>
     </div>)

  }
}

