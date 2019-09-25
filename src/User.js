import React, { useState, useEffect } from 'react';

import { Table, Input, Button, Row, Col, Divider, Icon, Tooltip, Modal, Form, Select, Spin } from 'antd';

import axios from 'axios';

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
  const [dataJobTitle,setdataJobTitle] = useState([]);
  const [dataJobTitleDivision,setDataJobTitleDivision] = useState([]);

  const [firstLoad, setFirstLoad] = useState(true)

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => a.username.length - b.username.length,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Division',
      dataIndex: 'division',
      key: 'division',
    },
    {
      title: 'Job Title',
      dataIndex: 'job_title',
      key: 'job_title',
    },
    {
      title: 'Remaining Permit',
      dataIndex: 'remaining',
      key: 'remaining',
    },

    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      sorter: (a, b) => a.role.length - b.role.length,
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

  
  useEffect(() => {
    refreshData();
    getJobTitle();
  }, [])

  function refreshData(){
    setFirstLoad(true);
    setTimeout(
        function() {
          axios.get('http://localhost:3001/api/getData')
            .then((res) => {
              console.log(res);
              setDataNeed(res.data.data)
            }
          )
        }
        .bind(this),
        1000
    );
  }
  
  function setDataNeed(skiw){
    console.log(skiw);
    setdataSource(skiw);
    setData(skiw);
    setFirstLoad(false);
  }

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
        if(modalData == ""){ // Add New Data
          values.division = dataJobTitleDivision[values.job_title];
          console.log(values);
          axios.post('http://localhost:3001/api/putData', values);
        }else{
          axios.post('http://localhost:3001/api/updateData', {
            id: modalData["_id"],
            update: values,
          });
        }
        setModalData("");
        setModalUserVisible(false);
        refreshData();
      }else{
        console.log(errors);
      }
    });
  }

  function handleCancel() {
    setModalUserVisible(false);
  }

  function onClickAdd() {
    setModalTitle("Add User");
    setModalData("");
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
        axios.delete('http://localhost:3001/api/deleteData', {
          data: {
            id: record["_id"]
          },
        });
        refreshData();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  function getJobTitle() {
    axios.get("http://localhost:3001/api/listJobTitle").then(res => {
      let job_title = [];
      let job_title_division = [];
      for (const [index, value] of res.data.data.entries()) {
        job_title.push(<Option key={index} value={value.description}>{value.description}</Option>)
        job_title_division[value.description] = value.division;
      }
  
      setdataJobTitle(job_title);
      setDataJobTitleDivision(job_title_division);
    });
  }
  
  const { getFieldDecorator, validateFieldsAndScroll } = form;

  if(!firstLoad){
    return(
    <React.Fragment>
      <Modal
        title={modalTitle}
        visible={ModalUserVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              initialValue: modalData?modalData.username:"",
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
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
          <Form.Item>
            {getFieldDecorator('name', {
              initialValue: modalData?modalData.name:"",
              rules: [{ required: true, message: 'Please input your name!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Name"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('job_title', {
               initialValue: modalData?modalData.job_title:"",
              rules: [{ required: true, message: 'Please Select Job Title' }],
            })(
              <Select placeholder="Job Title">
                {dataJobTitle}
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('role', {
               initialValue: modalData?modalData.role:"Administrator",
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
            {getFieldDecorator('remaining', {
              initialValue: modalData?modalData.remaining:"",
              rules: [{ required: true, message: 'Please input Permit Remaining!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Permit Remaining"
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
  }else{
    return (
      <div style={{marginTop: "35vh"}}>
        <center>
          <Spin size="large" />
          <p>Load user data</p>
        </center>
      </div>
    );
  }

}

const UserForm = Form.create({ name: 'user' })(User);

export default UserForm;
