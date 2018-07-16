/* global window */
import classnames from 'classnames'
import lodash from 'lodash'
import config from './config'
import request from './request'
import { color } from './theme'
import * as PATH from './path'
// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = function (format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
  }
  return format
}


/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  const item = array.filter(_ => _[keyAlias] === key)
  if (item.length) {
    return item[0]
  }
  return null
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  let data = lodash.cloneDeep(array)
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}
/**
 * 表单校验错误提示
 * @param filed
 * @param type required：必填 select:下拉框
 * @returns {string}
 */
const formValidMsg = ( filed , type = 'required') => {
  let msg = ""
  switch (type){
    case "required": msg = `${filed}不能为空`;break;
    case "select": msg = `请选择${filed}`;break;
    default:msg="未捕获的校验"
  }
  return msg
}
const downFile=(data, filename, mime, charset)=>{
  const link = document.createElement('a');

  const effectiveCharset = charset ? `;charset=${charset}` : '';
  const contentType = charset ? `${mime}${effectiveCharset}` : mime;
// On modern browsers (Chrome and Firefox), use download property and a temporary link
  if (link.download !== undefined) {
    link.download = filename;
    link.href = `data:${contentType},${encodeURIComponent(data)}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return;
  }

// On IE >= 10, use msSaveOrOpenBlob
  if (window.navigator && typeof window.navigator.msSaveOrOpenBlob === 'function') {
    const blob = new Blob([data], { type: contentType });
    window.navigator.msSaveOrOpenBlob(blob, filename);
    return;
  }

  try {
// On Safari and other browsers, try to open the JSON as attachment
    location.href = `data:application/attachment${effectiveCharset},${encodeURIComponent(data)}`;
  } catch (e) {
// If nothing else works, open the JSON as plain text in the browser
    location.href = `data:text/plain${effectiveCharset},${encodeURIComponent(data)}`;
  }
}

/**
 * unix时间戳转为普通时间戳
 * @param unixTimestamp
 * @returns {Date}
 */
const unix2Locale = (unixTimestamp=0)=>{
    return new Date(unixTimestamp * 1000).getTime()
}

module.exports = {
  config,
  request,
  color,
  classnames,
  queryURL,
  queryArray,
  arrayToTree,
  formValidMsg,
  PATH,
  downFile,
  unix2Locale,

}
