import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber,Row,Col, Radio, Modal, Table,Button } from 'antd'
const FormItem = Form.Item
const Search=Input.Search
const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const columns = [{
  title: '打印池名称',
  dataIndex: 'printingName',
}, {
  title: '打印池编码',
  dataIndex: 'printingCode',
}];
const data = [{
  key: '1',
  printingName: 'John Brown',
  printingCode:'00101001'
}, {
  key: '2',
  printingName: 'Brown',
  printingCode:'00101101'
}, {
  key: '3',
  printingName: 'Joe Black',
  printingCode:'00111001'
}, {
  key: '4',
  printingName: 'Disabled User',
  printingCode:'10101001'
}];
// const rowSelection = {
//     onChange: (selectedRowKeys, selectedRows) => {
//       dispatch({
//         type: 'user/updateState',
//         payload: {
//           selectedRowKeys: keys,
//         },
//       })
//     },
//   };
const TwoColProps = {
  ...ColProps,
  xl: 96,
}
const modal=({
    onOk,
    form: {
        getFieldDecorator,
        getFieldsValue,
        setFieldsValue,
    },
    ...modalProps
    })=>{
  const {rowSelection,selectedRows}=modalProps
  const handleOk = () => {
    // if(selectedRow)
    onOk(selectedRows)
    //console.log(selectedRows)
  }
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  return(
    <Modal
      {...modalOpts}
      title='打印池'
      okText='选择'
      cancelText="关闭"
      width="850"
    >
      <Row gutter={24}>
        <Form layout="inline">
          <Col span={12}>
            <FormItem
              label='打印池名称'
            >
              {getFieldDecorator('printingName', {
                rules: [{ required: true, message: 'Please input your printingName!', whitespace: true }],
              })(
                <Input placeholder="请输入打印池名称" />
              )}
            </FormItem>
          </Col>
          <Col span={12}><FormItem label='打印池编码'>
            {getFieldDecorator('printingCode', {
              rules: [{ required: true, message: 'Please input your printingCode!', whitespace: true }],
            })(
              <Input placeholder="请输入打印池编码" />
            )}
          </FormItem></Col>
        </Form>
      </Row>
      <Row gutter={24}>
        <Col span={8} offset={16}> <Button type="primary" className="margin-right" >查询</Button>
          <Button type="primary">重置</Button></Col>
      </Row>
      <Table style={{marginTop:'5px'}} rowSelection={rowSelection} columns={columns} dataSource={data} size='small' />
    </Modal>
  )
}
modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
