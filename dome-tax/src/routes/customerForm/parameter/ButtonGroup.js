/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { FilterItem } from 'components'
import { Upload, Button, Row, Col, DatePicker, Input, Cascader, Switch } from 'antd'
import {message} from "antd/lib/index";




const ButtonGroup = ({
                       onGoCreate,onGoback,onExport,uploadProps,fileList,Updatefile,importFile
                     }) => {

 /*console.log(fileList)
  const formData = new FormData();
  formData.append('file',fileList[0])*/
 /* const props = {
    beforeUpload: (file) => {
      Updatefile(file)
      importFile(file)
      return false;
    },
    name: 'file',
    action: 'http://39.106.187.236:8099/utax/parameter/import',
    headers: {
      'content-type': 'multipart/form-data',
    },
    // accept:'MultipartFile',
    showUploadList:false,
    data:formData,
    onChange(info) {
      console.log(info.file.originFileObj)
      if (info.file.status !== 'uploading') {

      }
      if (info.file.status === 'done') {
        message.success(`${info.file.originFileObj.name} file 导入成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.originFileObj.name} file 导入失败.`);
      }
    },
  };*/
  return (
    <div className="op-btn-group">
      <Button className="margin-right" onClick={onGoCreate}>新增</Button>
      <Button className="margin-right" onClick={onExport}>导出</Button>
      <Upload ><Button className="margin-right">导入</Button></Upload>
      <Button className="margin-right" onClick={onGoback}>返回</Button>
    </div>
  )
}

ButtonGroup.propTypes = {

}

export default ButtonGroup
