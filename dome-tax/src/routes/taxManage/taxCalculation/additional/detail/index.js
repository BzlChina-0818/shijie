import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {connect} from 'dva'
import Lodash from "lodash"
import {Icon, Button, message} from 'antd'
const ButtonGroup = Button.Group;

import {UFormItem, ModalInputSearch, DetailList} from "components"
import {PATH, formValidMsg} from "utils"
import StampCalculation from "routes/baseModule/invoiceTemplate/stampCalculation"


/*
 * @description 税金管理>税金计算>印花税>详情页
 * @author sunxianlu
 * @backEnd wangweiqiang
 */

const Detail = ({
                  additionalDetail,onBack,onSave
  }) => {

    const {detailData}=additionalDetail
    const stampProps={
      title:"印花税计算表",
      updateData:{}
    }
  //render
  return (
    <div className="detail-list">
      <div className="op-btn-group">
        <Button className="margin-right" onClick={onSave}>保存</Button>
        <Button className="margin-right" >审批历史</Button>
        <Button className="margin-right" onClick={onBack}>返回</Button>
        <Button className="margin-right" >调整税额</Button>
      </div>
      <div>
      <StampCalculation {...stampProps}/>
      </div>
    </div>
  )
}
Detail.propTypes = {
  optionStatus: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({ additionalDetail, loading }) => ({ additionalDetail, loading }))(Detail)
