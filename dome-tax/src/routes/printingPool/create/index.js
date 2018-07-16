import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Form, Input, InputNumber, Radio,DatePicker,TimePicker,Icon, Cascader,Button,Row,Col } from 'antd'
import moment from 'moment'
import { Page } from 'components'
import queryString from 'query-string'
import styles from './index.less'
import city from '../../../utils/city'
import Modal from './Modal'

const FormItem = Form.Item
const ButtonGroup = Button.Group;
const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  }
const Create=({
    dispatch,
    location,
    printingPoolCreate,
    item = {},
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
      },
})=>{
    const {
        modalVisible
    } = printingPoolCreate
  console.log(printingPoolCreate);
  const updateData=queryString.parse(location.query)||{};
    updateData.biaoShi=updateData.biaoShi=='true'? true:false;
    const modalProps = {
        visible: modalVisible,
        maskClosable: false,
        //confirmLoading: loading.effects[`user/${modalType}`],
        title:'选择组织机构',
        wrapClassName: 'vertical-center-modal',
        onOk (data) {
          dispatch({
            type: 'printingPoolCreate/showModal',
            payload: data,
          })
            .then(() => {
              handleRefresh()
            })
        },
        onCancel () {
          dispatch({
            type: 'printingPoolCreate/hideModal',
          })
        },
        // renderTreeNodes = (data) => {
        //     return data.map((item) => {
        //       if (item.children) {
        //         return (
        //           <TreeNode title={item.name} key={item.id} dataRef={item}>
        //             {this.renderTreeNodes(item.children)}
        //           </TreeNode>
        //         );
        //       }
        //       return <TreeNode {...item} dataRef={item} />;
        //     });
        // }
      }
    const save= ()=>{
        validateFields((errors) => {
            if (errors) {
              return
            }
            const data = {
              ...getFieldsValue(),
              key: item.key,
            }
            console.log(data)
        })
    }
    const goBack=()=>{
        dispatch(routerRedux.push({
            pathname:'/printingPool'
        }))
    }
    const selectZuZhi=()=>{
        dispatch({
            type: 'printingPoolCreate/showModal',
          })
    }
    const selectAfter = (
        <ButtonGroup>
          <Button onClick={selectZuZhi}><Icon type="search" /></Button>
          <Button><Icon type="close-circle-o" /></Button>
        </ButtonGroup>
    );
    return(
        <div>
            <p style={{marginTop:'-12'}}><Button type="primary" size="small" onClick={save} icon="save">保存</Button> <Button style={{marginLeft:'10'}} type="primary" size="small" onClick={goBack} icon="left-circle">返回</Button></p>
            <div className="condition-filter print-pool">
                {/* <div style={{width:'100%',height:'24',background:'#ccc',marginTop:'3',paddingLeft:'10'}}>打印信息维护</div> */}
                <Form layout="inline">
                <Row gutter={24}>
                    <Col span={8}>
                    <FormItem label="打印池代码" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('name', {
                        initialValue: updateData.printingCode,
                        rules: [
                        {
                            required: true,
                            // type:'number'
                        },
                        ],
                    })(<Input />)}
                    </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="打印池名称" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('nickName', {
                            initialValue: updateData.printingName,
                            rules: [
                            {
                                required: true,
                            },
                            ],
                        })(<Input />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="启用标识" hasFeedback style={{display:'block'}} {...formItemLayout}>
                        {getFieldDecorator('biaoShi', {
                            initialValue: updateData.biaoShi,
                            rules: [
                            {
                                required: true,
                                type: 'boolean',
                            },
                            ],
                        })(<Radio.Group>
                            <Radio value>是</Radio>
                            <Radio value={false}>否</Radio>
                        </Radio.Group>)}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={24}>
                <Col span={8}>
                    <FormItem label="所属组织" hasFeedback {...formItemLayout}>
                    <div className="input-modal-data">
                    {getFieldDecorator('phone', {
                        initialValue: updateData.phone,
                        rules: [
                        {
                            required: true,
                        },
                        ],
                    })(<Input />)}
                    {selectAfter}</div>
                    </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="开始使用时间" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('createTime',{initialValue:moment(updateData.createTime),rules: [{ type: 'object', required: true, message: 'Please select time!' }]})(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="结束使用时间" hasFeedback  {...formItemLayout}>
                        {getFieldDecorator('endTime',{initialValue:moment(updateData.endTime),rules: [{ type: 'object', required: true, message: 'Please select time!' }]})(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                    <FormItem label="所属区域" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('address', {
                        initialValue: updateData.address && updateData.address.split(' '),
                        rules: [
                        {
                            required: true,
                        },
                        ],
                    })(<Cascader
                        style={{ width: '100%' }}
                        options={city}
                        placeholder="Pick an address"
                    />)}
                    </FormItem>
                    </Col>
                </Row>
            </Form>
            </div>
            {modalVisible && <Modal {...modalProps} />}
        </div>
    )
}
export default connect(({ printingPoolCreate, loading }) => ({ printingPoolCreate, loading })) (Form.create()(Create))
