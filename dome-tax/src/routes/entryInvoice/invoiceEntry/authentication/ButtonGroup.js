/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Button, Upload, message } from 'antd'

const ButtonGroup = ({
                      onBack,
                      onEduce,
                      onMatch,
                      onDelete,
                      onTask,
                      importConditon
                     }) => {
  const formdata = new FormData();//创建FormData对象
  const UploadProps = {
    beforeUpload(file) {
      formdata.append('file',file);
    },
    data://传给后台参数
    {...formdata, //导入所需的文件
      ...importConditon //导入所需参数
    },
    name: 'file',
    action: 'http://39.106.187.236:8099/utax/iinv/import/import',
    showUploadList:false,
    onChange(info) {
      console.log(info)
      if (info.file.status === 'done') {
        if(info.file.response.code===1000){//请求成功回调参数
          //onImport()
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
      <Button className="margin-right" onClick={onEduce}>导出</Button>
      <Button className="margin-right" onClick={onMatch}>匹配</Button>
      <Button className="margin-right" onClick={onDelete}>删除</Button>
      <Upload {...UploadProps}><Button className="margin-right">导入</Button></Upload>
      <Button className="margin-right" onClick={onTask}>任务</Button>
      <Button className="margin-right" onClick={onBack}>返回</Button>
    </div>
  )
}

ButtonGroup.propTypes = {

}

export default ButtonGroup
