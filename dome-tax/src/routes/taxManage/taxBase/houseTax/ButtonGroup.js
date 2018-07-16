/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Button, Upload, message } from 'antd'


const ButtonGroup = ({
    onExport,
    onIncreased,
    goBack,
    onCopy,
    onBatchesDelete,
    importConditon
  }) => {

  const formdata = new FormData();//创建FormData对象
  const UploadProps = {
    beforeUpload(file) {
      formdata.append('file',file);
    },
    data://传给后台参数
    {...formdata, //导入所需的文件
      //...importConditon //导入所需参数
    },
    name: 'file',
    action: 'http://39.106.187.236:8099/utax/taxfee/house/import',
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
      <Button onClick={onIncreased}>新增</Button>
      <Upload {...UploadProps}><Button>导入</Button></Upload>
      <Button onClick={onExport}>导出</Button>
      <Button onClick={onCopy}>复制</Button>
      <Button onClick={onBatchesDelete}>批量删除</Button>
      <Button onClick={goBack} >返回</Button>
    </div>
  )
}

ButtonGroup.propTypes = {
  onGoCreate:PropTypes.func,
  goBack:PropTypes.func,
}

export default ButtonGroup
