import React,{Component} from 'react'
import PropTypes from 'prop-types'
import Lodash from "lodash"

import { Modal, Icon, Input, message, Form, Row, Col, Radio } from 'antd'
const RadioGroup = Radio.Group;
const { TextArea } = Input

const FormItem = Form.Item
import { request } from 'utils'
import { taskuser, submit } from 'services/workFlow'

/**
 * @description 工作流选人并提交申请
 * @return 返回提交结果true或false,如果为true,一同返回后端响应数据
 * @author guoqianyuan
 */

/**
 * props示例
 */
// const modalProps = {
//   title:"",     //modal层title
//   "itemId": "3",
//   "jumpType": "query",
//   "bizId": "1",
//   "bizTitle": "10000税额",
//   "processInstId": "0",
//   "vars": {
//     "amount": "20000"
//   },
//   onOk(data){
//
//   },
//   onCancel() {
//     dispatch({
//       type: 'commodityCreate/hideModal',
//     })
//   },
// }

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

export default class ProcessApplyModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      taskUserList:[],//总流程相关人员列表
      childList:[],  //右侧人员列表
      leftValue:"",  //左边radio选中的值
      rightValue:"",  //右边radio选中的值
      comment:"",     // 意见
      bizId:""
    }
  }

  componentDidMount (){
    this.fetch()
  }

  // componentWillReceiveProps (nextProps) {
  //   console.log(nextProps)
  //   const staticNextProps = Lodash.cloneDeep(nextProps)
  //   // delete staticNextProps.columns
  //   // const { columns, ...otherProps } = this.props
  //   this.fetch()
  //   if (!Lodash.isEqual(staticNextProps, this.props)) {
  //     this.props = nextProps
  //
  //   }
  // }

  fetch = () => {
    this.setState({ loading: true })
    const {runtimeCmdVO,bizDataVO} = this.props
    const params = {
      "bizData": {
        runtimeCmdVO,
        bizDataVO,
      }
    } 
    taskuser(params).then((result) => {
      let data = result.data.pathCandidates||[]
      let newState={}

      if(data.length>0){
        newState.leftValue=data[0].stepId
      }
      let childList = data.length>0&&data[0].candidates||[]
      if(childList.length>0){
        newState.rightValue=childList[0].userId
      }
      console.log(newState)
      this.setState({
        loading: false,
        taskUserList: data,
        bizId:result.data.bizId,
        childList,
        ...newState,
      })
    })
  }



  render () {
    const  modalProps = this.props
    const {loading,leftValue,rightValue,comment,taskUserList,childList,bizId} = this.state

    const onChangeRadioLeft = (e) => {
      const radioLeftValue = e.target.value
      const rightList = Lodash.find(taskUserList,{stepId:radioLeftValue})
      let newState={}
      if(rightList&&rightList.candidates){
        newState.childList=rightList.candidates
        newState.rightValue=rightList.candidates.length>0?rightList.candidates[0].userId:""
      }
      this.setState({
          leftValue:radioLeftValue,
          ...newState
        })
    }

    const onChangeRadioRight = (e) => {
      this.setState({rightValue:e.target.value})
    }

    const modalOpts = {
      btnLeftText:"提交",
      btnRightText:"清空",
      visible: true,
      maskClosable: false,
      wrapClassName: 'vertical-center-modal',
      bodyStyle:{'minHeight':'350px'},
      width:640,
      ...modalProps,
      onOk: () => {
        // if(selectedKeys.length==0){
        //   message.success("请选择一个组织机构！")
        //   return
        // }
        const rightUserInfo = Lodash.find(childList,{userId:rightValue})
        const {runtimeCmdVO} = this.props

        const params={
          "bizData": {
            ...runtimeCmdVO,
            "bizId": bizId,
            "nextPathParticipants": [
              {
                "stepId": leftValue,
                "participants": [
                  rightUserInfo
                ]
              }
            ],
            comment
          },

        }
        submit(params).then(function (respData) {
          if(respData.success){
            message.success("提交成功")
            modalProps.onOk({success:true,data:respData.data})
          }else{
            message.error("提交失败")
            modalProps.onOk({success:false,data:respData.data})
          }
        })
      },
    }
    return (
      <Modal  {...modalOpts} >
        <div className="content-list">
          {loading&&<Icon type="loading" />}
          <Form>
            <Row gutter={50} >
              <Col span={10}>
                <RadioGroup onChange={onChangeRadioLeft} defaultValue={leftValue}>
                  {
                    taskUserList && taskUserList.map((value,index) => {
                      return <Radio key={value.stepId}  value={value.stepId} style={radioStyle}>{value.stepName}</Radio>
                    })
                  }
                </RadioGroup>
              </Col>
              <Col span={10}>
                  <RadioGroup onChange={onChangeRadioRight} defaultValue={rightValue}>
                    {
                      childList && childList.map(value => {
                        return <Radio key={value.userId} value={value.userId} style={radioStyle}>{value.realName}</Radio>
                      })
                    }
                  </RadioGroup>
              </Col>
              <Col span={23} defaultValue={comment}>
                <FormItem defaultValue={rightValue}>
                  {<TextArea rows={4} maxLength ={100} autosize placeholder="申请意见"/>}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    )
  }
}
