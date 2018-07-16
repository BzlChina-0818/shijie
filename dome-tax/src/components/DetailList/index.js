import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment';
import { List, Row, Col, Form, Select } from 'antd'
import { ModalInputSearch } from "components"
import { UFormItem } from 'components'

/* 列表详情 */
/**
 * 【!!!注意】新增活修改页使用有bug,getFieldDecorator需要从父级组件传过来，否则无法触发校验。仅使用于查询条件
 * listDetailProps: 对象形式 参数有 pageType判断是否是详情 listProps为antd中List配置项
 * dataSource array 是列表每一项参数
 *
 * 横跨多列 entireLine:true,
 */

const formItemLayoutDefault = {
  labelCol: {
    span: 4,
    style: {
      whiteSpace: 'normal',
    }
  },
  wrapperCol: {
    span: 20,
    style: {
      whiteSpace: 'normal',
    }

  },
}

const ListDetail = ({
                      ...listDetailProps
                    }) => {
  let { isDetail, ...listProps } = listDetailProps;
  let { dataSource } = listProps;
  let len = (dataSource[0].td.length === dataSource[1].td.length) ? dataSource[1].td.length : Math.max.apply(Math,[dataSource[0].td.length,dataSource[1].td.length]);
  return (
    <List
      {...listProps}
      renderItem={(item,index) => (
        <List.Item key={index}>
            <Row className="detail-list-row" type="flex">
              {
                item.td.map(value => {
                  return  (
                      <Fragment key={value.code}>
                        <Col span={item.entireLine? 24 : 24/(len)}  key={value.code}>
                          {value.codeLabel ? value.inputEle : (item.entireLine
                          ?
                          <UFormItem isDetail={isDetail}  {...value} formItemLayout={formItemLayoutDefault}></UFormItem>
                          :
                          <UFormItem isDetail={isDetail} {...value} ></UFormItem>)} 
                          
                        </Col>
                      </Fragment>
                    )
                })
              }
            </Row>
        </List.Item>
      )}
    />
  )
}

ListDetail.propTypes = {
  listDetailProps:PropTypes.object,
}

export default ListDetail

