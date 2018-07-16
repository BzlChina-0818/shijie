/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Button,Upload,message } from 'antd'


const ButtonGroup = ({
                       goCreate,onExport,onImport
}) => {
  const formData = new FormData();

  const props = {
    beforeUpload: (file) => {
      formData.append('file',file)

    },
    name: 'file',
   // action: 'http://39.106.187.236:8099/utax/data-source/import',   //服务器地址
    action: 'http://192.168.0.104:8099/utax/data-source/import',
    showUploadList:false,
    data:formData,
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
      <Button className="margin-right" onClick={goCreate}>新增</Button>
      <Button className="margin-right" onClick={onExport}>导出</Button>
      <Upload {...props}><Button className="margin-right">导入</Button></Upload>
    </div>
  )
}

ButtonGroup.propTypes = {
  onGoCreate:PropTypes.func,
}

export default ButtonGroup
