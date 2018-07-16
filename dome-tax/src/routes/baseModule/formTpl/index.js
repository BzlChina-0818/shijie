import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { Input, Select, Button, Icon } from 'antd'
import IndexModal from '../designFormulas/indexModal'
/**
 * @description 报表模版设置
 * @return 选中当前行数据对象
 * @author guoqianyuan
 */
class FormTpl extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      modalVisible: false,
      currentEleId: null,
      originFormEles: [],
      IndexModalProps : {
        onOk:(data) => {
          console.log(data)
          const {currentEleId} = this.state
          let currentEle =  document.getElementById(currentEleId)
          currentEle.value = data.indNo  //input设置指标
          if(!currentEle.hasAttribute('changed')){//给当前元素打changed标签
            currentEle.setAttribute('changed', true);
          }
          this.setState({
            modalVisible: false,
            currentEleId: null,
          })
        },
        onCancel:() => {
          this.onHideModal()
        },
      }
    }

    this.onHideModal = this.onHideModal.bind(this);

  }

  onHideModal(){
    this.setState({
      modalVisible:false,
    })
  }

  componentDidMount(){
      document.getElementById('formTpl').addEventListener('click', (e) => {
        // 兼容性处理
        const event = e || window.event;
        const target = event.target || event.srcElement;
        // 判断是否匹配目标元素
        if (target.hasAttribute('utax-input-index')) {
          this.setState({
            modalVisible: true,
            currentEleId: target.id
          })
        }
      });
  }

  // componentDidUpdate(prevProps, prevState){
  //   if(prevProps){      // 类似watch
  //     const { oldHtml } = prevProps
  //     const { html } = this.props
  //     if(oldHtml !== html){
  //       this.setState({
  //         originFormEles: true,
  //       })
  //     }
  //
  //   }
  // }

  render () {
    const {
      html,form
    } = this.props
    const {modalVisible,loading,currentEleId,IndexModalProps} = this.state


    return (
      <div>
        <div dangerouslySetInnerHTML = {{ __html:html }} id="formTpl"></div>
        {modalVisible && <IndexModal {...IndexModalProps}/>}
      </div>
    )
  }
}


FormTpl.propTypes = {
  size: PropTypes.string,
  select: PropTypes.bool,
  selectProps: PropTypes.object,
  onSearchModal: PropTypes.func,
  selectOptions: PropTypes.array,
  style: PropTypes.object,
  keyword: PropTypes.string,
}

export default FormTpl
