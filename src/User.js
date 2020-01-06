import React, { useState, useEffect } from "react";

import {
  Table,
  Input,
  Button,
  Row,
  Col,
  Divider,
  Icon,
  Tooltip,
  Modal,
  Form,
  Select,
  InputNumber
} from "antd";

import axios from "axios";

import { BACKEND_URL } from "./config/connection";

const { Option } = Select;
const { confirm } = Modal;

function User({ form }) {
  const [dataSource, setdataSource] = useState([]);

  const [ModalUserVisible, setModalUserVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState("");

  const [data, setData] = useState([]);
  const [dataJobTitle, setdataJobTitle] = useState([]);
  const [dataJobTitleDivision, setDataJobTitleDivision] = useState([]);
  const [dataJobTitleDescription, setDataJobTitleDescription] = useState([]);

  const [division, setDivision] = useState([]);

  const [firstLoad, setFirstLoad] = useState(true);

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username.length - b.username.length
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length
    },
    {
      title: "Division",
      dataIndex: "division_id",
      key: "division_id",
      render: text => {
        return division[text];
      }
    },
    {
      title: "Job Title",
      dataIndex: "job_title_id",
      key: "job_title_id",
      render: text => {
        return dataJobTitleDescription[text];
      }
    },
    {
      title: "Remaining Permit",
      dataIndex: "remaining",
      key: "remaining"
    },

    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: (a, b) => a.role.length - b.role.length
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <span>
          <Tooltip title="Edit User">
            <Button type="primary" onClick={() => onClickEdit(record)}>
              <Icon type="edit" />
            </Button>
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title="Change Password">
            <Button type="primary" onClick={() => onClickEdit(record, "change_password")}>
              <Icon type="unlock" />
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
    }
  ];

  useEffect(() => {
    refreshData();
    getJobTitle();
    getDivision();
  }, []);

  function refreshData() {
    setFirstLoad(true);
    setTimeout(function () {
      axios.get(BACKEND_URL + "getData").then(res => {
        console.log(res);
        setDataNeed(res.data.data);
      });
    }, 1000);
  }

  function setDataNeed(skiw) {
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
        d.username.toLowerCase().includes(e.target.value.toLowerCase()) ||
        d.role.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setdataSource(dataFilter);
  }

  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        values.division_id = dataJobTitleDivision[values.job_title_id];
        if (modalData === "") {
          // Add New Data
          console.log(values);
          axios.post(BACKEND_URL + "putData", values);
        } else {
          axios.post(BACKEND_URL + "updateData", {
            id: modalData["_id"],
            update: values
          });
        }
        setModalData("");
        setModalUserVisible(false);
        refreshData();
      } else {
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

  function onClickEdit(record, edit_type = "edit_user") {
    let modal_title = edit_type === "change_password" ? "Change Password" : "Edit User";
    setModalTitle(modal_title);

    record.edit_type = edit_type;
    setModalData(record);

    setModalUserVisible(true);
  }

  function onClickDelete(record) {
    confirm({
      title: "Are you sure delete this user?",
      content: "When user deleted you can't get it back",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axios.delete(BACKEND_URL + "deleteData", {
          data: {
            id: record["_id"]
          }
        });
        refreshData();
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }

  function getDivision() {
    axios.get(BACKEND_URL + "listDivision").then(res => {
      let division = [];

      for (const [index, value] of res.data.data.entries()) {
        division[value["_id"]] = value.description;
      }

      setDivision(division);
    });
  }

  function getJobTitle() {
    axios.get(BACKEND_URL + "listJobTitle").then(res => {
      let job_title = [];
      let job_title_division = [];
      let job_title_description = [];

      for (const [index, value] of res.data.data.entries()) {
        job_title.push(
          <Option key={index} value={value["_id"]}>
            {value.description}
          </Option>
        );
        job_title_division[value["_id"]] = value.division_id;
        job_title_description[value["_id"]] = value.description;
      }

      setdataJobTitle(job_title);
      setDataJobTitleDivision(job_title_division);
      setDataJobTitleDescription(job_title_description);
    });
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
        <Form> {/* className="login-form" */}
          {
            modalData.edit_type !== "change_password" &&
            <Form.Item>
              {getFieldDecorator("username", {
                initialValue: modalData ? modalData.username : "",
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
          }

          {!modalData.username || modalData.edit_type === "change_password" && (
            <Form.Item>
              {getFieldDecorator("password", {
                // rules: [
                //   { required: true, message: "Please input your Password!" }
                // ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
          )}


          {
            modalData.edit_type !== "change_password" &&
            <React.Fragment>

              <Form.Item>
                {getFieldDecorator("name", {
                  initialValue: modalData ? modalData.name : "",
                  rules: [{ required: true, message: "Please input your name!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Name"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("job_title_id", {
                  initialValue: modalData ? modalData.job_title_id : undefined,
                  rules: [{ required: true, message: "Please Select Job Title" }]
                })(<Select placeholder="Job Title">{dataJobTitle}</Select>)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("role", {
                  initialValue: modalData ? modalData.role : undefined,
                  rules: [{ required: true, message: "Please Select Role" }]
                })(
                  <Select placeholder="Role">
                    <Option value="Administrator">Administrator</Option>
                    <Option value="Approver">Approver</Option>
                    <Option value="User">User</Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("remaining", {
                  initialValue: modalData ? modalData.remaining : "",
                  rules: [
                    { required: true, message: "Please input Permit Remaining!" }
                  ]
                })(
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Permit Remaining"
                  />
                )}
              </Form.Item>
            </React.Fragment>
          }
        </Form>
      </Modal>
      <center>
        <h3>User List</h3>
      </center>
      <Row>
        <Col span={24}>
          <Input placeholder="Find User" onPressEnter={searchData} />
        </Col>
        {/* <Col span={2}>
          <Button type="primary" icon="search">
            Search
          </Button>
        </Col> */}
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
        loading={firstLoad}
      />
    </React.Fragment>
  );
}

const UserForm = Form.create({ name: "user" })(User);

export default UserForm;
