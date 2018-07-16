import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Layout } from 'antd'
import classnames from 'classnames'
import styles from './Header.less'
import Menus from './Menu'

const { SubMenu } = Menu

const Header = ({
  user, logout, location,  navOpenKeys, changeOpenKeys, menu, goHome
}) => {
  let handleClickMenu = e => e.key === 'logout' && logout()
  const menusProps = {
    menu,
    location,
    navOpenKeys,
    changeOpenKeys,
  }

  let count = 0;
  menusProps.menu.forEach(value => {
    if(!value.mpid){
      count++;
    }
  })

  const widthStyle = {
    width:count*150+ 'px'
  }

  return (
    <Layout.Header className={styles.header}>
      <div className={styles.logo} onClick={goHome}>
        <div className="logo-img">logo</div>
        <div>
          <p>税务管理系统</p>
          <p>TAX MANAGEMENT SYSTEM</p>
        </div>
      </div>
      <div className={styles.menus}>
        <div className={styles.menuAll} style={widthStyle}>
          <Menus {...menusProps}/>
        </div>
      </div>
      <div className={styles.rightWarpper}>
        <div className={styles.button}>
          <Icon type="mail" />
        </div>
        <Menu mode="horizontal" onClick={handleClickMenu}>
          <SubMenu
            style={{
              float: 'right',
            }}
            title={<span>
              <Icon type="user" />
              {user.username}
            </span>}
          >
            <Menu.Item key="logout">
              注销
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </Layout.Header>
  )
}

Header.propTypes = {
  menu: PropTypes.array,
  user: PropTypes.object,
  logout: PropTypes.func,
  location: PropTypes.object,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Header
