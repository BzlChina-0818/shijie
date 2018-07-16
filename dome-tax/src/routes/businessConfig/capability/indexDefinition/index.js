import React from 'react'
import { connect } from 'dva'
import queryString from 'query-string'
import { routerRedux, History } from 'dva/router'
import { message } from 'antd'
import { SelectModal, Page } from 'components'
import { IndexModal } from '../../../baseModule/designFormulas'
import ButtonGroup from './ButtonGroup'
import Filter from './Filter'
import List from './List'

/**
 * @description 业务配置>基础信息配置>指标配置
 * @author wangliang
 */

const indexDefinition = ({
  indexDefinition,
  dispatch,
  loading,
  location,
}) => {
  let { modalInputConfig, pageType, formData, list, pagination } = indexDefinition;
  const locationState = queryString.parse(location.search)
  const { pathname } = location

  const info = (messages) => {
    message.info(messages);
  };

  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.replace({
      pathname,
      search: queryString.stringify({
        ...locationState,
        ...newQuery,
      }),
    }))
  }
  
  const pageTypeState = (pageType) => {
    dispatch({
      type:'indexDefinition/updateState',
      payload:{
        pageType,
      }
    })
  }

  const ButtonGroupProps = {
    onBack(){
      history.go(-1);
    },
    onIncreased(){
      pageTypeState('create');
    },
  }

  const FilterProps = {
    formData,
    onSearchModal(name){
      pageTypeState('indNo');
    },
    onClearModal(name){
      dispatch({
        type:'indexDefinition/clearFormData',
        payload:{
          name
        }
      })
    },
    onRunScriptChange(field){
      handleRefresh(field)
    },
  }

  const ListProps = {
    dataSource: list,
    loading: loading.effects['indexDefinition/query'],
    pagination,
    location,
    onEditItem(recode){
      dispatch(routerRedux.push({
        pathname: `/businessConfig/capability/indexDefinition/create`,
        search: queryString.stringify({
          RadioValue:recode.applyType
        })
      }))
    },
    onChange (page) {
      console.log(page)
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
  }

  const SelectModalProps = {
    create:{
      filters:modalInputConfig && modalInputConfig[pageType] &&  modalInputConfig[pageType].filterConfig,
      visible:pageType === 'create',
      maskClosable: false, 
      listFlag:true,
      width:840,
      cancelText:"选择",
      okText:"关闭",
      footer:null,
      filterLeft:{
        click(files){
          if(!files.RadioValue){
            info('请选指标类型');
            return;
          }
          pageTypeState('');
          dispatch(routerRedux.push({
            pathname: `/businessConfig/capability/indexDefinition/create`,
            search: queryString.stringify({
              RadioValue:files.RadioValue
            })
          }))
        },
        text:'选择'
      },
      filterRight:{
        click(){
          pageTypeState('');
        },
        text:'关闭'
      },
      onCancel(){
        pageTypeState('');
      },
    },
    indNo:{
      onOk(recode){
        dispatch({
          type:'indexDefinition/setFormData',
          payload:{
            indNo:recode.indNo
          }
        })
        pageTypeState('');
      },
      onCancel(){
        pageTypeState('');
      }
    },
  }
  
  return (
    <Page inner>
      <ButtonGroup {...ButtonGroupProps}></ButtonGroup>
      <Filter { ...FilterProps }></Filter>
      <List {...ListProps}></List>
      { pageType === 'create' && <SelectModal {...SelectModalProps[pageType]}></SelectModal> }
      { pageType === 'indNo' && <IndexModal {...SelectModalProps[pageType]}/> }
    </Page>
  )
}

export default connect(({indexDefinition, loading}) => ({indexDefinition, loading}))(indexDefinition);