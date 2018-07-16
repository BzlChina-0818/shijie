/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { FilterItem } from 'components'
import {  Button, Input, Icon, Form } from 'antd'
const ButtonGroup = Button.Group;
import styles from "./ModalInputSearch.less"
const ModalInputSearch = ({
                  onSearchModal,
                  onClear,
                  options,
                  edit,
                  onEdit,
                }) => {
  /**
   * 【!!!注意】新增活修改页使用有bug,getFieldDecorator需要从父级组件传过来，否则无法触发校验。仅使用于查询条件
   * name: input name
   * placeholder: placeholder
   * initialValue: 初始值
   * dataSource: modal数据源
   */
  const { name, placeholder, initialValue, displayName, initialDisplayValue, getFieldDecorator } = options
  return (
      <div className={styles.inputModalData}>
        {getFieldDecorator(name, { initialValue: initialValue })(
          <Input  style={{display:'none'}}/>
        )}
        {displayName?getFieldDecorator(displayName, { initialValue: initialDisplayValue })(
          <Input  placeholder={placeholder} disabled />
        ):<Input  placeholder={placeholder} disabled value={initialDisplayValue?initialDisplayValue:initialValue}/>}
        {
          <ButtonGroup>
            <Button onClick={onSearchModal}><Icon type="search" /></Button>
            {edit && <Button onClick={onEdit} ><Icon type="edit" /></Button>}
            <Button onClick={onClear}><Icon type="close-circle-o" /></Button>
          </ButtonGroup>
        }
      </div>
  )
}

ModalInputSearch.propTypes = {
  options: PropTypes.object,
  onShowModal: PropTypes.func,
  onClear: PropTypes.func,
}

export default ModalInputSearch
