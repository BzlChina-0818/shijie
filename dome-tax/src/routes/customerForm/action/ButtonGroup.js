/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import {FilterItem} from 'components'
import { Button, Upload,message} from 'antd'


const ButtonGroup = ({
                       onGoCreate,onGoback,onExport,importConditon,onImport
                     }) => {
  const formData = new FormData();

  const props = {
    beforeUpload: (file) => {   //上传前函数
      formData.append('file',file)   //上传前添加文件
    },
    name: 'file',
    action: 'http://39.106.187.236:8099/utax/function/import',
    // headers: {
    //   'content-type': 'multipart/form-data',
    // },
    // accept:'MultipartFile',
    showUploadList: false,
    data: {
      ...formData,//导入所需的文件
      ...importConditon   //导入所需要的参数
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

ButtonGroup.propTypes = {}

export default ButtonGroup
