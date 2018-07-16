import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Pagination,Button } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'

const List=({})=>{
    const columns =[{
        title:'打印终端编号',
        dataIndex:'Code',
        key:'Code'
    },{
        title:'打印终端名称',
        dataIndex:'name',
        key:'name'
    },{
        title:'是否手工开票',
        dataIndex:'ticket',
        key:'ticket'
    },{
        title:'专票管理员',
        dataIndex:'admin',
        key:'admin'
    },{
        title:'所属打印池',
        dataIndex:'printPool',
        key:'printPool'
    },{
        title:'usbKey编号',
        dataIndex:'usbKeyCode',
        key:'usbKeyCode'
    },{
        title:'usbKey名称',
        dataIndex:'usbKeyName',
        key:'usbKeyName'
    },{
        title:'操作',
        key:'operation',
        width:100,
        render:(text, record)=>{
            return (
                <a href="javascript:;">删除</a>
            )
        }
    }]
    return(
        <div className="content-list">
            <div>打印终端清单</div>
            <div><Button type="primary" size="small">新增</Button></div>
            <Table size="small" columns={columns}></Table>
        </div>
    )
}
export default List