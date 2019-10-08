import React, { useState, useEffect, useContext } from 'react';
import { Menu, Icon, Row, Col, Button } from 'antd';
import logo from './logo.svg';

import { NavLink } from "react-router-dom";

import Login from './Login';

import axios from 'axios';

import { BACKEND_URL } from "./config/connection";

import {UserContext} from "./context/UserContext";

const { SubMenu } = Menu;


function Layout(props) {
  const user = useContext(UserContext);
  console.log(user);

  // const [collapsed, setcollapsed] = useState(false);
  // const [isLogin, setisLogin] = useState(false);

  // function toggleCollapsed() {
  //   setcollapsed(!collapsed)
  // };

  // function getAuth() {
  //   axios.post(BACKEND_URL + 'checkUserLogin', { username: "onesinus", password: "123" })
  //     .then((res) => {
  //       if (res.data.data[0]) {
  //         setisLogin(res.data.data[0].isLogin);
  //       }
  //     }
  //     );
  // }

  function onClickLogout() {
    axios.post(BACKEND_URL + 'userLoggedOut', { username: "Onesinus" });
    setTimeout(
      function () {
        window.location.reload();
      }
        .bind(this),
      1000
    );
  }

  // useEffect(() => {
  //   getAuth();
  // }, [])

  if (!user.datauser.isLogin) {
    return (
      <Login

      />
    )
  } else {
    return (
      <Row>
        <Col span={4}>
          <NavLink to="/">
            <img
              src={logo}
              className="App-logo"
              alt="logo"
              style={{ height: "25vh" }}
            />
          </NavLink>
          <Menu
            style={{ height: "75vh", width: "16.5vw" }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1', 'sub2', 'sub3']}
            mode="inline"
            theme="dark"
            // inlineCollapsed={collapsed}
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
              <Menu.Item key="user"><NavLink to="/user"><Icon type="usergroup-add" /> User</NavLink></Menu.Item>
              <Menu.Item key="division"><NavLink to="/division"><Icon type="apartment" /> Division</NavLink></Menu.Item>
              <Menu.Item key="job_title"><NavLink to="/job_title"><Icon type="file-done" /> Job Title</NavLink></Menu.Item>
              {/* <Menu.Item key="employee"><NavLink to="/employee">Employee</NavLink></Menu.Item> */}
            </SubMenu>

            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="table" />
                  <span>Modules</span>
                </span>
              }
            >
              <Menu.Item key="daftar_cuti"><NavLink to="/cuti"><Icon type="menu" /> Permit List</NavLink></Menu.Item>
              <Menu.Item key="pengajuan_cuti"><NavLink to="/add_cuti"><Icon type="form" /> Permit Request</NavLink></Menu.Item>
              <Menu.Item key="approval"><NavLink to="/approval"><Icon type="check" /> Permit Approval</NavLink></Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="area-chart" />
                  <span>Reports</span>
                </span>
              }
            >
              <Menu.Item key="report_permit"><NavLink to="/"><Icon type="pie-chart" /> Permit Report</NavLink></Menu.Item>
            </SubMenu>
            <Menu.Item key="logout"><a onClick={onClickLogout} ><Icon type="logout" /> Logout</a></Menu.Item>
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
}

export default Layout;
