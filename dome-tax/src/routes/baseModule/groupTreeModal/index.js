import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { Modal,Icon, Tree, Input, message } from 'antd'
const TreeNode = Tree.TreeNode;
const Search = Input.Search;

import { request } from 'utils'
import {queryGroupList} from 'services/baseAPI'
/**
 * @description 组织结构树状图
 * @return 选中当前组织对象
 * @author guoqianyuan
 */

export default class GroupTreeModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      treeList:[],
      expandedKeys: [],//['0-0-0', '0-0-1'],默认打开的路径
      autoExpandParent: true,
      selectedKeys: [],//['0-0-0', '0-0-1'],默认选择
      selectedData: {},
    }
  }

  componentDidMount (){
    this.fetch()
  }

  fetch = () => {
    this.setState({ loading: true })
    queryGroupList().then((result) => {
      this.setState({
        loading: false,
        treeList: result.data,
      })
    })
  }

  onExpand = (expandedKeys) => {
    console.log('onExpand', arguments);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  }

  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState(
      { selectedKeys ,
        selectedData: info.selectedNodes[0].props.dataRef
      });
  }

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.nodeData.name} key={item.nodeData.code} dataRef={item.nodeData}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.nodeData.name} key={item.nodeData.code} dataRef={item.nodeData} />;
    });
  }


  render () {
    const  modalProps = this.props
    const {loading,treeList,selectedKeys,selectedData} = this.state
    const modalOpts = {
      visible: true,
      maskClosable: false,
      title:'选择组织机构',
      wrapClassName: 'vertical-center-modal',
      bodyStyle:{'minHeight':'350px'},
      width:640,
      ...modalProps,
      onOk: () => {
        if(selectedKeys.length==0){
          message.success("请选择一个组织机构！")
          return
        }
        modalProps.onOk(selectedData) //todo 默认单选
      },
    }
    return (
      <Modal  {...modalOpts} >
        <div className="content-list">
          {loading&&<Icon type="loading" />}
          {treeList.length>0&&<Tree
            onExpand={this.onExpand}
            expandedKeys={this.state.expandedKeys}
            autoExpandParent={this.state.autoExpandParent}
            onSelect={this.onSelect}
            selectedKeys={selectedKeys}
          >
            {this.renderTreeNodes(treeList)}
          </Tree>}
          {treeList.length==0&&<p>暂无数据</p>}
        </div>
      </Modal>
    )
  }
}
