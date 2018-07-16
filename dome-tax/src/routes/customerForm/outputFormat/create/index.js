import React from 'react'
import PropTypes from 'prop-types'
import {routerRedux, History} from 'dva/router'
import {connect} from 'dva'
import queryString from 'query-string'
import {
  Form,
  Input,
  InputNumber,
  Radio,
  DatePicker,
  TimePicker,
  Icon,
  Cascader,
  Button,
  Row,
  Col,
  Select,
  message,
  Collapse,
} from 'antd'
import FormContent from './FormContent'
import DetailContent from './DetailContent'

const RadioGroup = Radio.Group;
const Option = Select.Option;
const {TextArea} = Input;
const FormItem = Form.Item
const ButtonGroup = Button.Group;
const Panel = Collapse.Panel;

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}
const formItemLayout1 = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 21,
  },
}

/**
 * @description 动态表单>输出格式
 * @author sunxianlu + guoqianyuan
 */
const Create = ({
                  dispatch,
                  location,
                  outputFormatCreate,
                  form: {
                    getFieldDecorator,
                    validateFields,
                    getFieldsValue,
                  },
                }) => {
  const {formData, pageType} = outputFormatCreate
  const locationState = queryString.parse(location.search)
  const {datasourceId,datasourceCode}=locationState

  const dataSource={datasourceId,datasourceCode}
  const outputFormatId = locationState.id
  console.log(dataSource)
  // const {query} = location
  const databaseName = "输出定义"
  const formProps = {
    formData, pageType,search:locationState,
    onCreate(data) {
      dispatch({
        type: `outputFormatCreate/${pageType}`,
        payload: {...data, ...dataSource, id:outputFormatId},
      }).then((data) => {
          if (data.success) {
            const successMessage = pageType === 'update' ? `保存${databaseName}成功` : `新增${databaseName}成功`
            message.success(successMessage);
            history.go(-1)
          } else {
            message.error(data.message);
          }
        }
      )
    },
    goBack() {
      history.go(-1)
    },
  }

  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  //render
  return (
    <div className="form-pane detail-list">
      {pageType === 'detail' ? (<DetailContent {...formProps} />) : (<FormContent {...formProps}/>)}
    </div>
  )
}
Create.propTypes = {
  optionStatus: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({outputFormatCreate, loading}) => ({outputFormatCreate, loading}))(Form.create()(Create))

