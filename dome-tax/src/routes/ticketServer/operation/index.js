import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm,Icon,Alert} from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import ButtonGroup from './ButtonGroup'
import FormContent from './FormContent'
import DetailContent from './DetailContent'
import styles from './index.less'

const operation=({
    location, dispatch, ticketServerOperation, loading,
})=>{
    const {optionType,terminal}=ticketServerOperation
    const formProps={
        item:optionType==='create'? {}:terminal,
        optionType,
        save(data){
            console.log(data)
            dispatch({
                type:`ticketServerOperation/${optionType}`,
                payload:data
            })
        },
        back(){
            dispatch(routerRedux.push({
                pathname:'/ticketServer',
                // search: queryString.stringify({
                //   ...query,
                //   ...newQuery,
                // }),
            }))
        }
    }
    const buttonProps={
        save(data){
            console.log(data)
            dispatch({
                type:`ticketServerOperation/${optionType}`,
                payload:data
            })
        },
        back(){
            dispatch(routerRedux.push({
                pathname:'/ticketServer',
                // search: queryString.stringify({
                //   ...query,
                //   ...newQuery,
                // }),
            }))
        }
    }
    return(
        <div>
            {/* <ButtonGroup {...buttonProps}/> */}
            {optionType==='detail'?(<DetailContent {...formProps} />):(<FormContent {...formProps}/>)}
            <List />
        </div>
    )
}
export default connect(({ ticketServerOperation, loading }) => ({ ticketServerOperation, loading }))(operation)
