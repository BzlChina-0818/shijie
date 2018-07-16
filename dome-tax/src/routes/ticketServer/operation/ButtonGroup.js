import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Button,Icon} from 'antd'
import { Page } from 'components'
import queryString from 'query-string'

const ButtonGroup=({
    ...buttonProps,
    optionType,
    back,
    save
})=>{
    return(
        <div>
            {optionType==='detail'? (''):(<Button style={{marginRight:'5px'}} type="primary" onClick={save} icon="save">保存</Button>)}
            <Button type="primary" onClick={back} icon="left-circle">返回</Button>
        </div>
    )
}
export default ButtonGroup