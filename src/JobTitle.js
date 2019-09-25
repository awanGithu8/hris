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
  Spin
} from "antd";

import axios from "axios";

const { Option } = Select;
const { confirm } = Modal;

function JobTitle({ form }) {
  const [dataSource, setdataSource] = useState([]);
  const [ModalJobTitleVisible, setModalJobTitleVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState("");
  const [data, setData] = useState([]);
  const [dataDivision, setdataDivision] = useState([]);

  const [firstLoad, setFirstLoad] = useState(true);

  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.length - b.description.length
    },
    {
      title: "Division",
      dataIndex: "division",
      key: "division",
      sorter: (a, b) => a.division.length - b.division.length
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <span>
          <Tooltip title="Edit JobTitle">
            <Button type="primary" onClick={() => onClickEdit(record)}>
              <Icon type="edit" />
            </Button>
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title="Delete JobTitle">
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
    getDivision();
  }, []);

  function getDivision() {
    axios.get("http://localhost:3001/api/listDivision").then(res => {
    let divisions = [];
    console.log(res.data.data);
    for (const [index, value] of res.data.data.entries()) {
        divisions.push(<Option key={index} value={value.description}>{value.description}</Option>)
    }
    
      setdataDivision(divisions);
    });
  }

  function refreshData() {
    setFirstLoad(true);
    setTimeout(
      function() {
        axios.get("http://localhost:3001/api/listJobTitle").then(res => {
          setDataNeed(res.data.data);
        });
      }.bind(this),
      1000
    );
  }

  function setDataNeed(skiw) {
    setdataSource(skiw);
    setData(skiw);
    setFirstLoad(false);
  }

  function searchData(e) {
    console.log(e.target.value);
    console.log(data);
    let dataFilter = data.filter(function(d) {
      return (
        d.description.toLowerCase().includes(e.target.value.toLowerCase())
        ||
        d.division.toLowerCase().includes(e.target.value.toLowerCase())
      )
    });
    setdataSource(dataFilter);
  }

  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        if (modalData == "") {
          // Add New Data
          axios.post("http://localhost:3001/api/addJobTitle", values);
        } else {
          console.log({
            id: modalData["_id"],
            update: values
          });
          axios.post("http://localhost:3001/api/updateJobTitle", {
            id: modalData["_id"],
            update: values
          });
        }
        setModalData("");
        setModalJobTitleVisible(false);
        refreshData();
      } else {
        console.log(errors);
      }
    });
  }

  function handleCancel() {
    setModalJobTitleVisible(false);
  }

  function onClickAdd() {
    setModalTitle("Add Job Title");
    setModalData("");
    setModalJobTitleVisible(true);
  }

  function onClickEdit(record) {
    setModalTitle("Edit Job Title");

    setModalData(record);

    setModalJobTitleVisible(true);
  }

  function onClickDelete(record) {
    confirm({
      title: `Are you sure delete this Job Title ${record.description} ?`,
      content: "When Job Title deleted you can't get it back",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axios.delete("http://localhost:3001/api/deleteJobTitle", {
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

  const { getFieldDecorator, validateFieldsAndScroll } = form;

  if (!firstLoad) {
    return (
      <React.Fragment>
        <Modal
          title={modalTitle}
          visible={ModalJobTitleVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          destroyOnClose={true}
        >
          <Form className="login-form">
            <Form.Item>
              {getFieldDecorator("description", {
                initialValue: modalData ? modalData.description : "",
                rules: [
                  { required: true, message: "Please input your description!" }
                ]
              })(<Input placeholder="Description" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("division", {
                initialValue: modalData ? modalData.division : "",
                rules: [{ required: true, message: "Please select division!" }]
              })(<Select placeholder="Division">{dataDivision}</Select>)}
            </Form.Item>
          </Form>
        </Modal>
        <center>
          <h3>Job Title List</h3>
        </center>
        <Row>
          <Col span={22}>
            <Input placeholder="Find Job Title" onPressEnter={searchData} />
          </Col>
          <Col span={2}>
            <Button type="primary" icon="search">
              Search
            </Button>
          </Col>
        </Row>
        <Button
          type="primary"
          icon="plus-square"
          style={{ marginTop: "1%" }}
          onClick={onClickAdd}
        >
          Add Job Title
        </Button>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ defaultPageSize: 6, showSizeChanger: false }}
          rowKey="_id"
        />
      </React.Fragment>
    );
  } else {
    return (
      <div style={{ marginTop: "35vh" }}>
        <center>
          <Spin size="large" />
          <p>Load Job Title data</p>
        </center>
      </div>
    );
  }
}

const JobTitleForm = Form.create({ name: "JobTitle" })(JobTitle);

export default JobTitleForm;
