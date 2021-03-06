/* global window */
/* global document */
import React from 'react'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import pathToRegexp from 'path-to-regexp'
import { connect } from 'dva'
import { Loader, MyLayout } from 'components'
import { BackTop, Layout } from 'antd'
import { classnames, config } from 'utils'
import { Helmet } from 'react-helmet'
import { withRouter } from 'dva/router'
import Error from './error'
import '../themes/index.less' 
import './app.less'
const { Content, Footer, Sider } = Layout
const { Header, Bread, styles } = MyLayout
const { prefix, openPages } = config

let lastHref

const App = ({
  children, dispatch, app, loading, location,
}) => {
  const {
    user, siderFold, isNavbar, menuPopoverVisible, navOpenKeys, menu, permissions,
  } = app
  let { pathname } = location
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`
  const { iconFontJS, iconFontCSS, logo } = config
  const current = menu.filter(item => pathToRegexp(item.route || '').exec(pathname))
  const hasPermission = current.length ? permissions.visit.includes(current[0].id) : false
  const { href } = window.location

  if (lastHref !== href) {
    NProgress.start()
    if (!loading.global) {
      NProgress.done()
      lastHref = href
    }
  }

  const headerProps = {
    menu,
    user,
    location,
    siderFold,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,

    logout () {
      dispatch({ type: 'app/logout' })
    },
    goHome (){
      window.location.href="/"
    },
    changeOpenKeys (openKeys) {
      window.localStorage.setItem(`${prefix}navOpenKeys`, JSON.stringify(openKeys))
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  }

  const breadProps = {
    menu,
    location,
  }

  if (openPages && openPages.includes(pathname)) {
    if(pathname==='/login'){
      return (<div>
        <Loader fullScreen spinning={loading.effects['app/query']} />
        {children}
      </div>)
    }
  }
  return (
    <div>
      <Loader fullScreen spinning={loading.effects['app/query']} />
      <Helmet>
        <title>ANTD ADMIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={logo} type="image/x-icon" />
        {iconFontJS && <script src={iconFontJS} />}
        {iconFontCSS && <link rel="stylesheet" href={iconFontCSS} />}
      </Helmet>
      <Layout style={{ height: '100vh', overflow: 'scroll' }} id="mainContainer">
        <BackTop target={() => document.getElementById('mainContainer')} />
        <Header {...headerProps} />
        <Content>
          <Bread {...breadProps} />
          {/*{hasPermission ? children : <Error />}*/}
          {children}
        </Content>
        <Footer >
          {config.footerText}
        </Footer>
      </Layout>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}

export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App))
