import React, { useState, useEffect } from 'react';

import { Table, Input, Button, Row, Col, Divider, Icon, Tooltip, Modal, Form, Select } from 'antd';

const { Option } = Select;
const { confirm } = Modal;

function User({
  form
}) {
  const [dataSource, setdataSource] = useState([]);
  const [ModalUserVisible, setModalUserVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/getData')
    .then((data) => data.json())
    .then((res) => 
      setDataNeed(res.data)
    )
  }, [])

  function setDataNeed(data){
    setdataSource(data);
    setData(data);
  }


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
            <Button type="primary" onClick={() => onClickEdit(record)}>
              <Icon type="edit" />
            </Button>
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title="Delete User">
            <Button type="danger" onClick={() => onClickDelete(record)}>
              <Icon type="delete" />
            </Button>
          </Tooltip>
        </span>
      )
    },
  ];

  function searchData(e) {
    console.log(e.target.value);
    console.log(data);
    let dataFilter = data.filter(function (d) {
      return (
        d.username.toLowerCase().includes(e.target.value.toLowerCase())
        ||
        d.role.toLowerCase().includes(e.target.value.toLowerCase())
      )
    })
    setdataSource(dataFilter);
  }

  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if(!errors){
        console.log(values);
      }else{
        console.log(errors);
      }
    });

    // setModalUserVisible(false);
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

  function onClickDelete(record){
    confirm({
      title: 'Are you sure delete this user?',
      content: 'When user deleted you can\'t get it back',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  

  function handleSubmit() {

  }

  const { getFieldDecorator, validateFieldsAndScroll } = form;

  return (

    <React.Fragment>
      <Modal
        title={modalTitle}
        visible={ModalUserVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
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
        rowKey="_id" 
      />
    </React.Fragment>
  );
}

const UserForm = Form.create({ name: 'user' })(User);

export default UserForm;
