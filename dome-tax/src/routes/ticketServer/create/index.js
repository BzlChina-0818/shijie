import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Form, Input, InputNumber,Select, Radio,DatePicker,TimePicker,Icon, Cascader,Button,Row,Col } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
// import styles from './index.less'
import city from '../../../utils/city'
//import Modal from './Modal'

const FormItem = Form.Item
const ButtonGroup = Button.Group;
const Option = Select.Option;
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
    ticketServerCreate,
    item = {},
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
      },
      modalVisible
})=>{
    const {
        terminalList,
    } = ticketServerCreate
    const updateData=queryString.parse(location.search)||{};
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
    const addList=()=>{
        let number={}
        terminalList.push(number)
        dispatch({
            type:'ticketServerCreate/updateState',
            payload:{
                terminalList:terminalList
            }
        })
    }
    const lis=terminalList.map((item,index)=>{
        return(
            <Row key={index} style={{background:'#fff',marginLeft:'0px',marginRight:'0px',padding:'5px 0'}} gutter={24}><Col span={3}><span>{item.id1}</span><a id={index} onClick={(e) => select(e)}>选择</a></Col><Col span={3}>{item.id2}</Col><Col span={3}>{item.id3}</Col><Col span={3}>{item.id4}</Col><Col span={3}>{item.id5}</Col><Col span={3}>{item.id6}</Col><Col span={3}>{item.id7}</Col><Col span={3}><a id={index} onClick={(e) => deleteIndex(e)}>删除</a></Col></Row>
        )  
    })
    const deleteIndex=(e)=>{
        const index=e.target.id
        terminalList.splice(index,1)
        dispatch({
            type:'ticketServerCreate/updateState',
            payload:{
                terminalList:terminalList
            }
        })
    }
    const select=(e)=>{
        const data={'id1':'11','id2':'11','id3':'11','id4':'11','id5':'11','id6':'11','id7':'11'}
        const listIndex1=e.target.id
        terminalList[listIndex1]=data;
        dispatch({
            type:'ticketServerCreate/updateState',
            payload:{
                terminalList:terminalList,
            }
        })
    }
    // const lists=(
    //     <ul>
    //         {terminalList.map((item)=>{
    //             <li key={item}><Row gutter={24}><Col span={3}>打印终端编号</Col><Col span={3}>打印终端名称</Col><Col span={3}>可否手工编号</Col><Col span={3}>专票管理员</Col><Col span={3}>所属打印池</Col><Col span={3}>usbKey编号</Col><Col span={3}>usbKey名称</Col><Col span={3}><a href="javascript;">删除</a></Col></Row></li>
    //         })}
    //     </ul>
    // )
    const goBack=()=>{
        dispatch(routerRedux.push({
            pathname:'/ticketServer'
        }))
    }
    const queryName=()=>{
        console.log(111)
    }
    
    const clearName=()=>{
        console.log(111)
    }
    const selectZuZhi=()=>{
        dispatch({
            type: 'printingPoolCreate/showModal',
          })
    }
    const handleChange=(value)=>{
        updateData.version=value
    }
    const config = {
        rules: [{ type: 'object', required: true, message: 'Please select time!' }],
      };
    //   const selectAfter = (
    //     <ButtonGroup>
    //       <Button onClick={selectZuZhi}><Icon type="search" /></Button>
    //       <Button><Icon type="close-circle-o" /></Button>
    //     </ButtonGroup>
    //   );
    return(
        <div>
            <p style={{marginTop:'-12'}}><Button type="primary" size="small" onClick={save} icon="save">保存</Button> <Button style={{marginLeft:'10'}} type="primary" size="small" onClick={goBack} icon="left-circle">返回</Button></p>
            <div className="condition-filter ticket-server">
                {/* <div style={{width:'100%',height:'24',background:'#ccc',marginTop:'3',paddingLeft:'10'}}>打印信息维护</div> */}
                    <Row gutter={24}>
                        <Col style={{ position: 'relative' }} span={8}>
                            <FormItem {...formItemLayout}
                                label="纳税主体名称" hasFeedback
                            >
                                {getFieldDecorator('printingName', { initialValue: updateData.printingName,
                                    rules: [
                                          {
                                              required: true,
                                          },
                                      ]})(<Input disabled style={{ width: 195 }} />)}
                            </FormItem>
                            <div style={{ position: 'absolute', right: '11px', top: '3px' }}><Button onClick={queryName} style={{ marginRight: '2px' }} type="primary" icon="search"></Button><Button type="primary" onClick={clearName} icon="close"></Button></div>
                        </Col>
                        <Col span={8}>
                            <FormItem label="纳税人识别号" hasFeedback {...formItemLayout}>
                                {getFieldDecorator('nickName', {
                                    initialValue: updateData.printingName,
                                      rules: [
                                          {
                                              required: true,
                                          },
                                      ],
                                })(<Input  />)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                        <FormItem label="金税盘编号" hasFeedback {...formItemLayout}>
                                {getFieldDecorator('nickName', {
                                    initialValue: updateData.select,
                                      rules: [
                                          {
                                              required: true,
                                          },
                                      ],
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="开票服务器代码" hasFeedback {...formItemLayout}>
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
                            <FormItem label="开票服务器名称" hasFeedback {...formItemLayout}>
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
                            <FormItem label="金税盘名称" hasFeedback {...formItemLayout}>
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
                            <FormItem label="发票限额版本" hasFeedback {...formItemLayout}>
                                {getFieldDecorator('version', {
                                    initialValue: updateData.version,
                                      rules: [
                                          {
                                              required: true,
                                          },
                                      ],
                                })(<Select initialValue="" onChange={handleChange}>
                                    <Option value="">请选择</Option>
                                    <Option value="1">万元版</Option>
                                    <Option value="2">十万元版</Option>
                                    <Option value="3">百万元版</Option>
                                    <Option value="4">千万元版</Option>
                                    <Option value="5">亿元版</Option>
                                </Select>)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="分发服务器IP" hasFeedback {...formItemLayout}>
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
                            <FormItem label="是否主开票服务器" hasFeedback style={{ display: 'block' }} {...formItemLayout}>
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
                        <Col span={8}>
                            <FormItem label="详细地址" hasFeedback {...formItemLayout}>
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
                            <FormItem label="主开票服务器" hasFeedback {...formItemLayout}>
                                {getFieldDecorator('version', {
                                    initialValue: updateData.version,
                                      rules: [
                                          {
                                              required: true,
                                          },
                                      ],
                                })(<Select initialValue="" onChange={handleChange}>
                                    <Option value="">请选择</Option>
                                    <Option value="1">万元版</Option>
                                    <Option value="2">十万元版</Option>
                                    <Option value="3">百万元版</Option>
                                    <Option value="4">千万元版</Option>
                                    <Option value="5">亿元版</Option>
                                </Select>)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="接受服务器" hasFeedback {...formItemLayout}>
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
                        <Col style={{ position: 'relative' }} span={8}>
                            <FormItem label="税务专员" hasFeedback {...formItemLayout}>
                                {getFieldDecorator('nickName', {
                                    initialValue: updateData.printingName,
                                      rules: [
                                          {
                                              required: true,
                                          },
                                      ],
                                })(<Input disabled style={{ width: 195 }} />)}
                            </FormItem>
                            <div style={{ position: 'absolute', right: '11px', top: '3px' }}><Button onClick={queryName} style={{ marginRight: '2px' }} type="primary" icon="search"></Button><Button type="primary" onClick={clearName} icon="close"></Button></div>
                        </Col>
                        <Col span={8}>
                            <FormItem label="启用标识" hasFeedback style={{ display: 'block' }} {...formItemLayout}>
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
                        <Col span={8}>
                        <FormItem label="开始使用时间" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('createTime',config,{
                            rules: [
                                {
                                    required: true,
                                    type: 'boolean',
                                },
                            ],
                        })(                            
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="结束使用时间" hasFeedback  {...formItemLayout}>
                        {getFieldDecorator('endTime',config,{
                            rules: [
                                {
                                    required: true,
                                    type: 'boolean',
                                },
                            ],
                        })(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        )}
                        </FormItem>
                    </Col>
                    </Row>
                    <div>打印信息终端</div>
                    <div style={{margin:'5px 0'}}><Button type="primary" onClick={addList} size="small" icon="plus">新增</Button></div>
                    <Row gutter={24} style={{background:'#ccc',marginLeft:'0px',marginRight:'0px',padding:'5px 0'}}>
                        <Col span={3}>打印终端编号</Col><Col span={3}>打印终端名称</Col><Col span={3}>可否手工编号</Col><Col span={3}>专票管理员</Col><Col span={3}>所属打印池</Col><Col span={3}>usbKey编号</Col><Col span={3}>usbKey名称</Col><Col span={3}>操作</Col>
                    </Row>
                    <div>
                        {lis}
                    </div>
                    {/* <Row gutter={24} style={{background:'#fff',marginLeft:'0px',marginRight:'0px',padding:'5px 0'}}> */}
                        {/* <Col span={3}>打印终端编号</Col><Col span={3}>打印终端名称</Col><Col span={3}>可否手工编号</Col><Col span={3}>专票管理员</Col><Col span={3}>所属打印池</Col><Col span={3}>usbKey编号</Col><Col span={3}>usbKey名称</Col><Col span={3}><a href="javascript;">删除</a></Col> */}
                        {/* <ul>{terminalList}</ul> */}
                    {/* </Row> */}
            </div>
            {modalVisible && <Modal {...modalProps} />}
        </div>
    )
}
Create.propTypes = {
    user: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
  }
  
  export default connect(({ ticketServerCreate, loading }) => ({ ticketServerCreate, loading }))(Form.create()(Create))