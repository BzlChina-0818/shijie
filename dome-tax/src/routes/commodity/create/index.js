import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux,History } from 'dva/router'
import { connect } from 'dva'
import { Form, Input, Radio,DatePicker,Button,Row,Col } from 'antd'
const RadioGroup = Radio.Group;

import { Page, ModalInputSearch } from 'components'
import Modal from './Modal'

const FormItem = Form.Item
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
    commodityCreate,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
    },
})=>{
    // state or variable
    const { modalVisible,modal,formData,choiceModalInput, modalInputConfig } = commodityCreate

    // methods
    const save= ()=>{
      validateFields((errors) => {
        if (errors) {
          return
        }

        // todo 默认值
        let defaultValue={
          compId:2,
          secondaryCompId:20,
          taxItemName:"9890",
          ttcode:3,
        }
        const data = {
          ...getFieldsValue(),
          ...defaultValue
        }
        dispatch({
          type: 'commodityCreate/create',
          payload:data,
        })
      })
    }
    const goBack=()=>{
      history.go(-1)
    }
    // props
    const modalProps = {
        visible: modalVisible,
        maskClosable: false,
        //confirmLoading: loading.effects[`user/${modalType}`],
        title:'选择商品编码',
        wrapClassName: 'vertical-center-modal',
        width:840,
        onOk (data) {
          let formData = {}
          // 根据modal输入框类型，作不同的赋值
          let associateInputs = modalInputConfig[choiceModalInput].associateInput
          associateInputs.forEach((item) =>{
              formData[item.formName] = data[item.listName]
          })
          // 更新formData
          dispatch({
            type: 'commodityCreate/selectSuccess',
            payload: formData,
          })
          dispatch({
            type: 'commodityCreate/hideModal',
          })
        },
        onCancel () {
          dispatch({
            type: 'commodityCreate/hideModal',
          })
        },
        handleModalRefresh (data){ // 刷新页面
          const {page,pageSize} = data
          dispatch({
            type: 'commodityCreate/queryList4Modal',
            payload: {
              page,
              pageSize,
            },
          })
        },
        // onSelectChange(keys,rows){
        //   dispatch({
        //     type: 'commodityCreate/selectSuccess',
        //     payload: {
        //       choiceData:rows[0]
        //     },
        //   })
        // }
    }
    const modalInputSearchProps = ({name,placeholder,initialValue,dataSource,submitData}) =>{
      return {
        onSearchModal(){
          dispatch({
            type: 'commodityCreate/showModal',
            payload: {
              choiceModalInput:name
            }
          })
          dispatch({
            type: 'commodityCreate/queryList4Modal',
            payload: {
              page:1,
              pageSize:10,
            },
          })

        },
        onClear(){
          // 根据modal输入框类型，清空值
          let associateInputs = modalInputConfig[name].associateInput
          associateInputs.forEach((item) =>{
            formData[item.formName] = undefined
          })
          // 更新formData
          dispatch({
            type: 'commodityCreate/selectSuccess',
            payload: formData,
          })
        },
        options:{
          name,
          placeholder,
          initialValue,
          dataSource,
        }
      }
    }

    //render
    return(
        <div className="form-pane">
            <div className="form-btn-group">
              <Button onClick={save}>保存</Button>
              <Button onClick={goBack} >返回</Button>
            </div>
            <div className="form-content">
                <Form>
                <Row gutter={24}>
                    <Col span={8}>
                    <FormItem label="公司" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('compNname', {
                        initialValue: formData.compNname,
                        rules: [
                        {
                            required: true,
                        },
                        ],
                    })(<Input />)}
                    </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="商品名称" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('commodityName', {
                            initialValue: formData.commodityName,
                            rules: [
                            {
                                required: true,
                            },
                            ],
                        })(<Input />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="税目" hasFeedback  {...formItemLayout}>
                          {< ModalInputSearch
                            {...modalInputSearchProps({
                              name:'taxItemNo',
                              placeholder:'税目',
                              initialValue:formData.taxItemNo})} />}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={24}>
                <Col span={8}>
                    <FormItem label="规格型号" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('model', {
                        initialValue: formData.model,
                        rules: [
                        {
                            required: true,
                        },
                        ],
                    })(<Input />)}
                    </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="计量单位" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('uom',{
                          initialValue: formData.uom,
                            rules: [
                            {
                                required: true,
                            },
                            ],
                        })(
                          <Input/>
                        )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="单价（不含税价）" hasFeedback  {...formItemLayout}>
                        {getFieldDecorator('price',{
                          initialValue: formData.price,
                            rules: [
                            {
                                required: true,
                            },
                            ],
                        })(
                          <Input/>
                        )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                    <FormItem label="税率" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('rate', {
                        initialValue: formData.rate,
                        rules: [
                        {
                            required: true,
                        },
                        ],
                    })(<Input/>)}
                    </FormItem>
                    </Col>
                    <Col span={8}>
                      <FormItem label="开始使用时间" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('startUseOfTime', {
                          initialValue: formData.startUseOfTime,
                          rules: [
                            {
                              required: true,
                            },
                          ],
                        })(<DatePicker
                          showTime
                          format="YYYY-MM-DD HH:mm:ss"
                          placeholder="开始使用时间"
                        />)}
                      </FormItem>
                    </Col>
                    <Col span={8}>
                      <FormItem label="结束使用时间" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('endUseOfTime', {
                          initialValue: formData.endUseOfTime,
                          rules: [
                            {
                              required: true,
                            },
                          ],
                        })(<DatePicker
                          showTime
                          format="YYYY-MM-DD HH:mm:ss"
                          placeholder="结束使用时间"
                        />)}
                      </FormItem>
                    </Col>
                  <Col span={8}>
                    <FormItem label="国税商品名称" hasFeedback {...formItemLayout}>
                      {< ModalInputSearch
                        {...modalInputSearchProps({
                          name:'foreignName',
                          placeholder:'国税商品名称',
                          initialValue:formData.foreignName})} />}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem label="国税商品编码" hasFeedback {...formItemLayout}>
                      {getFieldDecorator('foreignCode', {
                        initialValue: formData.foreignCode,
                        rules: [
                          {
                            required: true,
                          },
                        ],
                      })(<Input/>)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem label="启用标识" hasFeedback {...formItemLayout}>
                      {getFieldDecorator('isOpen', {
                        initialValue: formData.isOpen,
                        rules: [
                          {
                            required: true,
                          },
                        ],
                      })( <RadioGroup >
                        <Radio value={1}>是</Radio>
                        <Radio value={0}>否</Radio>
                      </RadioGroup>)}
                    </FormItem>
                  </Col>
                </Row>
            </Form>
            </div>
            {modalVisible && <Modal {...modalProps} />}
        </div>
    )
}
Create.propTypes = {
  optionStatus: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({ commodityCreate, loading }) => ({ commodityCreate, loading })) (Form.create()(Create))

