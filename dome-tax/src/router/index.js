import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from '../routes/app'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'

const { ConnectedRouter } = routerRedux
import routes from "./router"
const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('../routes/error'),
  })
  return (
    <ConnectedRouter history={history}>
      <LocaleProvider locale={zhCN}>
        <App>
          <Switch>
            <Route exact path="/" render={() => (<Redirect to="/customerForm/dataSource"/>)}/>
            {
              routes.map(({ path, ...dynamics }, key) => (
                <Route key={key}
                       exact
                       path={path}
                       component={dynamic({
                         app,
                         ...dynamics,
                       })}
                />
              ))
            }
            <Route component={error}/>
          </Switch>
        </App>
      </LocaleProvider>
    </ConnectedRouter>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
