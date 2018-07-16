/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { FilterItem } from 'components'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch ,Upload,message } from 'antd'

const ButtonGroup = ({
   onGoCreate,onGoback,onExport,importConditon,onImport
}) => {
  const formdata = new FormData();//创建FormData对象 
  const props = {
    beforeUpload: (file) => {//上传前函数
      formdata.append('file',file) //上传前添加文件
    },
    name: 'file',
    action: 'http://39.106.187.236:8099/utax/output-def/import',//服务器地址
    // action: 'http://192.168.0.104:8099/utax/output-def/import',
    showUploadList:false,
    data://传给后台参数
      {...formdata, //导入所需的文件
        ...importConditon //导入所需参数
      },
    onChange(info) {
      if (info.file.status === 'done') {
        if(info.file.response.code===1000){//请求成功回调参数
          onImport()
          message.success(info.file.response.message);
        }else{
          message.error(info.file.response.message);
        }
      } else if (info.file.status === 'error') {
        message.error(`导入文件失败.`);
      }
    },
  };
  return (
    <div className="op-btn-group">
      <Button className="margin-right" onClick={onGoCreate}>新增</Button>
      <Button className="margin-right" onClick={onExport}>导出</Button>
      <Upload {...props}><Button className="margin-right">导入</Button></Upload>
      <Button className="margin-right" onClick={onGoback}>返回</Button>
    </div>
  )
}

ButtonGroup.propTypes = {

}

export default ButtonGroup
