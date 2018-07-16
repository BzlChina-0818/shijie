import React, { Component } from 'react'
import { Input, Button, message } from 'antd'
import { StrongItemsModal, LiteralModal, IndexModal } from '../../../../baseModule/designFormulas'
const { TextArea } = Input

class Design extends Component {
  constructor() {
    super()
    this.state = {
      pageType:'',
      TextAreaValue:'',
      modalInputConfig:{
       
      } 
    }
  }
  common = (symbol) => {
    this.setState({
      TextAreaValue: this.state.TextAreaValue + symbol
    })
  }
  commonType = (pageType) => {
    this.setState({
      pageType
    })
  }
  onPlus = () => {
    this.common('+')
  }
  onMinus = () => {
    this.common('-')
  }
  onStar = () => {
    this.common('*')
  }
  onFlags = () => {
    this.common('/')
  }
  onLeftBracket = () => {
    this.common('(')
  }
  onRightBracket = () => {
    this.common(')')
  }
  onLiteral = () => {
    this.commonType('literal')
  }
  onTaxItem = () => {
    this.commonType('taxItem')
  }
  onIndex = () => {
    this.commonType('index')
  }
  /* 计算校验 */
  onDetection = () => {
    let { TextAreaValue } = this.state;
    if(TextAreaValue.indexOf("++")>-1 || TextAreaValue.indexOf("--")>-1 || TextAreaValue.indexOf("**")>-1 || TextAreaValue.indexOf("//")>-1
      || TextAreaValue.indexOf("+-")>-1 || TextAreaValue.indexOf("+*")>-1 || TextAreaValue.indexOf("+/")>-1 || TextAreaValue.indexOf("-+")>-1
      || TextAreaValue.indexOf("-*")>-1 || TextAreaValue.indexOf("-/")>-1 || TextAreaValue.indexOf("*+")>-1 || TextAreaValue.indexOf("*-")>-1
      || TextAreaValue.indexOf("*/")>-1 || TextAreaValue.indexOf("/+")>-1 || TextAreaValue.indexOf("/-")>-1 || TextAreaValue.indexOf("/*")>-1
      || TextAreaValue.indexOf("()")>-1 || TextAreaValue.indexOf(")(")>-1){
      message.info("运算符号有错误");
      return false;
    }
    if(TextAreaValue.indexOf("$$")>-1 || TextAreaValue.indexOf("##")>-1 || TextAreaValue.indexOf("@@")>-1 
        || TextAreaValue.indexOf("$#")>-1 || TextAreaValue.indexOf("$@")>-1
        || TextAreaValue.indexOf("#$")>-1 || TextAreaValue.indexOf("#@")>-1 
        || TextAreaValue.indexOf("@$")>-1 || TextAreaValue.indexOf("@#")>-1  ){
        message.info("运算内容有错误");
        return false;
    }
    var lef=0;
    if(TextAreaValue.indexOf("(")>-1){
      lef=TextAreaValue.match(eval(/\(/g)).length;
    }
    var rig=0;
    if(TextAreaValue.indexOf(")")>-1){
      rig=TextAreaValue.match(eval(/\)/g)).length;
    }
    if(lef>rig){
      message.info("缺失)号");
      return false;
    }else if(lef<rig){
      message.info("缺失(号");
      return false;
    }
    if(TextAreaValue.indexOf("*")<0 && TextAreaValue.indexOf("/")<0 && TextAreaValue.indexOf("+")<0 && TextAreaValue.indexOf("-")<0){
      message.info("运算内容有错误");
      return false;
    }
    
    if(TextAreaValue.indexOf("*")==0 || TextAreaValue.indexOf("/")==0 || TextAreaValue.indexOf("+")==0 || TextAreaValue.indexOf("-")==0 ||TextAreaValue.indexOf(")")==0){
      message.info("首位不能是运算符号或')'");
      return false;
    }
    if(TextAreaValue.lastIndexOf("*")==TextAreaValue.length-1 || TextAreaValue.lastIndexOf("/")==TextAreaValue.length-1 || TextAreaValue.lastIndexOf("+")==TextAreaValue.length-1 || TextAreaValue.lastIndexOf("-")==TextAreaValue.length-1 || TextAreaValue.lastIndexOf("(")==TextAreaValue.length-1 || TextAreaValue.substring(TextAreaValue.length-1,TextAreaValue.length).match("[0-9]")!=null){
      message.info("最后一位不能是运算符号、数字或'('");
      return false;
    }
    if(TextAreaValue.indexOf(")")-TextAreaValue.indexOf("(")<0){
      message.info("运算符号有错误，请检查'( )'");
      return false;
    }
    if(TextAreaValue.lastIndexOf(")")-TextAreaValue.lastIndexOf("(")<0){
      message.info("运算符号有错误，请检查'( )'");
      return false;
    }
    var splitConstant= TextAreaValue.split("#");
    var strNum = splitConstant.length%2;
    if(strNum==0){
      message.info("运算内容错误：缺少一个'#'");
      return false;
    }
    
    var splitTaxitem= TextAreaValue.split("@");
    var strItem = splitTaxitem.length%2;
    if(strItem==0){
      message.info("运算内容错误：缺少一个'@'");
      return false;
    }
    if(TextAreaValue.indexOf("(")>-1 && TextAreaValue.indexOf(")")>-1){
      //var subStr = TextAreaValue.substring(TextAreaValue.indexOf("(")+1,TextAreaValue.length);
      for(var subStrStart = TextAreaValue;subStrStart.indexOf("(")>-1;){
        subStrStart =subStrStart.substring(subStrStart.indexOf("(")+1,subStrStart.length);
        var startChar=subStrStart.substring(0,1);
        if(startChar.indexOf("*")==0 || startChar.indexOf("/")==0 || startChar.indexOf("+")==0 || startChar.indexOf("-")==0 || startChar.match("[0-9]")){
          message.info("'('后的首位不能是运算符号或数字");
          return false;
        }
      }
      for(var subStrEnd = TextAreaValue;subStrEnd.lastIndexOf(")")>-1;){
        subStrEnd =subStrEnd.substring(0,subStrEnd.lastIndexOf(")"));
        var endChar=subStrEnd.substring(subStrEnd.length-1,subStrEnd.length);
        if(endChar.lastIndexOf("*")==0 || endChar.lastIndexOf("/")==0 || endChar.lastIndexOf("+")==0 || endChar.lastIndexOf("-")==0 || endChar.match("[0-9]")){
          message.info("')'的前一位不能是运算符号或数字");
          return false;
        }
      }
    }
    
    message.info("没有错误");
    return true;
  }
  onBack = () => {
    if(this.state.TextAreaValue.substring(this.state.TextAreaValue.length - 1) === '$'){
      message.info("计算公式的最后一位是以下内容不允许回退：\n $ \n但可以清除");
      return;
    }
    this.setState({
      TextAreaValue: this.state.TextAreaValue.substring(0, this.state.TextAreaValue.length - 1)
    })
  }
  onClear = () => {
    this.setState({
      TextAreaValue: ''
    })
  }
  setTextValue = (e) => {
    this.setState({
      TextAreaValue: e.target.value
    })
  }
  render(){
    let { pageType, TextAreaValue } = this.state;

    const calculator = {
      literal:{
        /* 常值确定按钮 */
        onOk: (recode) => {
          this.common('#' + recode.constNo + '#')
          this.commonType('')
        },
        /* 常值取消按钮 */
        onCancel:(recode) => {
          this.commonType('')
        }
      },
      taxItem:{
        /* 税目确定按钮 */
        onOk : (recode) => {
          this.common('@' + recode.itemNo + '@')
          this.commonType('')
        },
        /* 税目取消按钮 */
        onCancel:(recode) => {
          this.commonType('')
        }
      },
      index:{
         /* 指标确定按钮 */
        onOk : (recode) => {
          this.common('$' + recode.indNo + '$')
          this.commonType('')
        },
        /* 指标取消按钮 */
        onCancel:(recode) => {
          this.commonType('')
        }
      }
    }

    return (
      <div className="design-text-area">
        <TextArea value={TextAreaValue} onChange={this.setTextValue}></TextArea>
        <div className="op-btn-group op-btn-auto">
          <Button onClick={this.onPlus}>+</Button>
          <Button onClick={this.onMinus}>-</Button>
          <Button onClick={this.onStar}>*</Button>
          <Button onClick={this.onFlags}>/</Button>
          <Button onClick={this.onLeftBracket}>(</Button>
          <Button onClick={this.onRightBracket}>)</Button>
          <Button onClick={this.onLiteral}>常值</Button>
          <Button onClick={this.onTaxItem}>税目</Button>
          <Button onClick={this.onIndex}>指标</Button>
          <Button onClick={this.onDetection}>检测</Button>
          <Button onClick={this.onBack}>回退</Button>
          <Button onClick={this.onClear}>清除</Button>
        </div>
        {pageType === 'taxItem' && <StrongItemsModal {...calculator[pageType]}></StrongItemsModal>}
        {pageType === 'literal' && <LiteralModal {...calculator[pageType]}/>}
        {pageType === 'index' && <IndexModal {...calculator[pageType]}/>}
      </div>
    )
  }
}

 

export default Design;