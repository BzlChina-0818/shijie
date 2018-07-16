import React from 'react'
import PropTypes from 'prop-types'
import {Row,Col, Modal,Button ,Tree} from 'antd'
import city from '../../../utils/city'
console.log(city)
const TreeNode = Tree.TreeNode;
const zuZhiModal=({
    onOk,
    ...modalProps
})=>{
    const handleOk = () => {
        validateFields((errors) => {
          if (errors) {
            return
          }
          const data = {
            ...getFieldsValue(),
            key: item.key,
          }
          onOk(data)
        })
      }
    const modalOpts = {
        ...modalProps,
        onOk: handleOk,
      }
    const renderTreeNodes = (data) => {
        return data.map((item) => {
          if (item.children) {
            return (
              <TreeNode title={item.name} key={item.id} dataRef={item}>
                {renderTreeNodes(item.children)}
              </TreeNode>
            );
          }
          return <TreeNode {...item} dataRef={item} />;
        });
    }
    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
      }
    return(
        <Modal 
        {...modalOpts}
        title='选择组织机构'>
            <Tree showLine onSelect={onSelect}>
                {renderTreeNodes(city)}
            </Tree>
            
        </Modal>
    )
}
export default zuZhiModal