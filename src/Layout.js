import React, { useState } from 'react';
import { Menu, Icon, Row, Col } from 'antd';
import logo from './logo.svg';

import { NavLink } from "react-router-dom";


const { SubMenu } = Menu;

function Layout(props) {
  const [collapsed, setcollapsed] = useState(false);

  function toggleCollapsed(){
    setcollapsed(!collapsed)
  };
  
  return (
      <Row>
        <Col span={4}>
          <NavLink to="/">
            <img 
              src={logo} 
              className="App-logo" 
              alt="logo" 
              style={{height: "25vh"}}
            />
          </NavLink>
          <Menu
            style={{height: "75vh"}}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1', 'sub2', 'sub3']}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
          >

          {/* <Button type="primary" onClick={toggleCollapsed} style={{ float: "right", marginBottom: "1vh" }}>
            <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
          </Button> */}

          <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="hdd" />
                  <span>Master</span>
                </span>
              }
            >
              <Menu.Item key="user"><NavLink to="/user">User</NavLink></Menu.Item>
              <Menu.Item key="employee"><NavLink to="/employee">Employee</NavLink></Menu.Item>
              <Menu.Item key="division"><NavLink to="/division">Division</NavLink></Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="file-done" />
                  <span>Modules</span>
                </span>
              }
            >
              <Menu.Item key="daftar_cuti"><NavLink to="/cuti">Daftar Cuti</NavLink></Menu.Item>
              <Menu.Item key="pengajuan_cuti"><NavLink to="/add_cuti">Pengajuan Cuti</NavLink></Menu.Item>
              <Menu.Item key="approval"><NavLink to="/approval">Approval</NavLink></Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="setting" />
                  <span>Configurations</span>
                </span>
              }
            >
              <Menu.Item key="logout"><NavLink to="/">Logout</NavLink></Menu.Item>
            </SubMenu>
          </Menu>          
        </Col>
        <Col span={20}>
          <div className="content">          
            {props.children}
          </div>
        </Col>
      </Row>
  );
}

export default Layout;
