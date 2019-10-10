import React, { useState, useEffect, useContext } from 'react';
import { Menu, Icon, Row, Col, Button, message } from 'antd';
import logo from './logo.svg';

import { NavLink } from "react-router-dom";

import Login from './Login';

import axios from 'axios';

import { BACKEND_URL } from "./config/connection";

import { UserContext } from "./context/UserContext";

const { SubMenu } = Menu;


function Layout(props) {
  const user = useContext(UserContext);
  let session_user = JSON.parse(window.localStorage.getItem('datauser'));
  const { role, isLogin, username } = session_user ? session_user : { role: "", isLogin: false, username: "" };

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

  function removeHashFromUrl() {
    var loc = window.location.href,
      index = loc.indexOf('#');

    if (index > 0) {
      window.location = loc.substring(0, index);
    }
  }

  function onClickLogout() {
    axios.post(BACKEND_URL + 'userLoggedOut', { username: username }).then(response => {
      user.logoutuser();
      // removeHashFromUrl()
    }).catch(err => {
      console.log(err);
    });

  }

  // useEffect(() => {
  //   getAuth();
  // }, [])

  if (session_user == null) {
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
              // src={logo}
              src={"/sindata.png"}
              className="App-logo"
              alt="logo"
              style={{ height: "25vh", width: "16.5vw", border: "15px solid #001529" }}
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

            {
              role == "Administrator" &&
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
            }

            {
              ["Approver", "Administrator"].includes(role) &&


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
            }

            {
              role == "User" &&
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="table" />
                    <span>Modules</span>
                  </span>
                }
              >
                <Menu.Item key="pengajuan_cuti"><NavLink to="/add_cuti"><Icon type="form" /> Permit Request</NavLink></Menu.Item>
              </SubMenu>
            }



            {
              role == "Administrator" &&
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
            }

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
