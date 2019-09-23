import React, { useState, useEffect } from 'react';

import { Table, Input, Button, Row, Col, Divider, Icon, Tooltip, Modal, Form, Select } from 'antd';

const {Option} = Select;

function User({
  form
}) {
  const [dataSource, setdataSource] = useState([]);
  const [ModalUserVisible, setModalUserVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState("");

  const data = [];
  for (let i = 0; i < 25; i++) {
    data.push({
      key: i,
      username: 'John ' + i,
      role: 'Administrator'
    });
  }

  useEffect(() => {
    setdataSource(data);
  }, [])

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => a.username.length - b.username.length,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Tooltip title="Edit User">
            <Button onClick={() => onClickEdit(record)}>
              <Icon type="edit" />
            </Button>
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title="Delete User">
            <Button><Icon type="delete" /></Button>
          </Tooltip>
        </span>
      )
    },
  ];

  function searchData(e) {
    let dataFilter = data.filter(function (d) {
      return (
        d.username.toLowerCase().includes(e.target.value.toLowerCase())
      )
    })
    setdataSource(dataFilter);
  }

  function handleOk() {
    setModalUserVisible(false);
  }

  function handleCancel() {
    setModalUserVisible(false);
  }

  function onClickAdd() {
    setModalTitle("Add User");

    setModalUserVisible(true);
  }

  function onClickEdit(record) {
    setModalTitle("Edit User");

    setModalData(record);

    setModalUserVisible(true);
  }

  function handleSubmit() {

  }

  const { getFieldDecorator } = form;

  return (

    <React.Fragment>
      <Modal
        title={modalTitle}
        visible={ModalUserVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('role', {
              rules: [{ required: true, message: 'Please Select Role' }],
            })(
              <Select placeholder="Role">
                <Option value="Administrator">Administrator</Option>
                <Option value="Approver">Approver</Option>
                <Option value="User">User</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
        </Form>
      </Modal>
      <center><h3>User List</h3></center>
      <Row>
        <Col span={22}>
          <Input
            placeholder="Find User"
            onPressEnter={searchData}
          />
        </Col>
        <Col span={2}>
          <Button type="primary" icon="search">Search</Button>
        </Col>
      </Row>
      <Button
        type="primary"
        icon="user-add"
        style={{ marginTop: "1%" }}
        onClick={onClickAdd}
      >
        Add User
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ defaultPageSize: 6, showSizeChanger: false }}

      />
    </React.Fragment>
  );
}

const UserForm = Form.create({ name: 'user' })(User);

export default UserForm;
