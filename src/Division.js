import React, { useState, useEffect } from 'react';

import { Table, Input, Button, Row, Col, Divider, Icon, Tooltip, Modal, Form, Select, Spin } from 'antd';

import axios from 'axios';

const { Option } = Select;
const { confirm } = Modal;

function Division({
  form
}) {
  const [dataSource, setdataSource] = useState([]);
  const [ModalUserVisible, setModalUserVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState("");
  const [data, setData] = useState([]);

  const [firstLoad, setFirstLoad] = useState(true)

  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Tooltip title="Edit Division">
            <Button type="primary" onClick={() => onClickEdit(record)}>
              <Icon type="edit" />
            </Button>
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title="Delete Division">
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
  }, [])

  function refreshData(){
    setFirstLoad(true);
    setTimeout(
        function() {
          axios.get('http://localhost:3001/api/getDivision')
            .then((res) => {
              setDataNeed(res.data.data)
            }
          )
        }
        .bind(this),
        1000
    );
  }
  
  function setDataNeed(skiw){
    setdataSource(skiw);
    setData(skiw);
    setFirstLoad(false);
  }

  function searchData(e) {
    console.log(e.target.value);
    console.log(data);
    let dataFilter = data.filter(function (d) {
      return (
        d.division.toLowerCase().includes(e.target.value.toLowerCase())
      )
    })
    setdataSource(dataFilter);
  }

  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if(!errors){
        if(modalData == ""){ // Add New Data
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
    setModalTitle("Add Division");
    setModalData("");
    setModalUserVisible(true);
  }

  function onClickEdit(record) {
    setModalTitle("Edit Division");

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
            {getFieldDecorator('role', {
               initialValue: modalData?modalData.role:"Administrator",
              rules: [{ required: true, message: 'Please Select Role' }],
            })(
              <Select placeholder="Role">
                <Option value="Administrator">Administrator</Option>
                <Option value="Approver">Approver</Option>
                <Option value="Division">Division</Option>
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
      <center><h3>Division List</h3></center>
      <Row>
        <Col span={22}>
          <Input
            placeholder="Find Division"
            onPressEnter={searchData}
          />
        </Col>
        <Col span={2}>
          <Button type="primary" icon="search">Search</Button>
        </Col>
      </Row>
      <Button
        type="primary"
        icon="plus-square"
        style={{ marginTop: "1%" }}
        onClick={onClickAdd}
      >
        Add Division
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
          <p>Load division data</p>
        </center>
      </div>
    );
  }

}

const DivisionForm = Form.create({ name: 'division' })(Division);

export default DivisionForm;
