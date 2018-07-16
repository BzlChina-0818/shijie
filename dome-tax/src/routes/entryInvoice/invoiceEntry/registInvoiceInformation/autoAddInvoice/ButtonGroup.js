/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Button,Upload } from 'antd'

const ButtonGroup = ({
   onSave,onBack,onReload,onImport,invoiceType
}) => {
  const formdata = new FormData();//创建FormData对象 
  const props = {
    beforeUpload: (file) => {//上传前函数
      formdata.append('file',file) //上传前添加文件
    },
    name: 'file',
   //action: 'http://39.106.187.236:8099/utax/output-def/import',//服务器地址
    // action: 'http://192.168.0.104:8099/utax/output-def/import',
    showUploadList:false,
    data://传给后台参数
      {...formdata, //导入所需的文件
        // ...importConditon //导入所需参数
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
      <Button className="margin-right" onClick={onSave}>保存</Button>
      <Button className="margin-right" onClick={onBack}>返回</Button>
      <Button className="margin-right" onClick={onReload}>刷新</Button>
      {invoiceType&&invoiceType==='01'&&<Upload {...props}><Button>导入</Button></Upload>}
    </div>
  )
}
ButtonGroup.propTypes = {
  onGoCreate:PropTypes.func,
}

export default ButtonGroup
