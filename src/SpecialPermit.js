import React, { useState, useEffect } from "react";
import Crud from "./components/Crud";
import { Input, Form, InputNumber, Tooltip, Button, Icon, Divider } from "antd";
import axios from "axios";
import { BACKEND_URL } from "./config/connection";

function SpecialPermit({ form }) {
  const { getFieldDecorator, validateFieldsAndScroll } = form;

  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.length - b.description.length
    },
    {
      title: "Permit Total",
      dataIndex: "permit_total",
      key: "permit_total"
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <span>
          <Tooltip title="Edit Permit">
            <Button type="primary">
              <Icon type="edit" />
            </Button>
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title="Delete Permit">
            <Button type="danger">
              <Icon type="delete" />
            </Button>
          </Tooltip>
        </span>
      )
    }
  ];

  let searchParams = {
    placeholder: "Find Special Permit"
  };
  const [buttonAddParams, setbuttonAddParams] = useState({
    title: "Add Special Permit",
    onClickAdd: () => {
      onClickAdd();
    }
  });

  const [tableParams, settableParams] = useState({
    btn_add_title: "Add Special Permit",
    columns: columns,
    dataSource: [],
    loading: true
  });

  const [modalFormParams, setmodalFormParams] = useState({
    form,
    title: "Add Special Permit",
    visible: false,
    handleOk: () => {
      modalOk();
    },
    handleCancel: () => {
      modalCancel();
    }
  });

  function modalOk() {
    validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        console.log(values);
        setmodalFormParams({ ...modalFormParams, visible: false });
      }
    });
  }

  function modalCancel() {
    setmodalFormParams({ ...modalFormParams, visible: false });
  }

  function onClickAdd() {
    setmodalFormParams({ ...modalFormParams, visible: true });
    refreshData();
  }

  function refreshData() {
    setTimeout(function() {
      axios.get(BACKEND_URL + "listSpecialPermit").then(res => {
        settableParams({ ...tableParams, dataSource: res.data.data, loading: false });
      });
    }, 1000);
  }

  useEffect(() => {
    refreshData();
  }, [])

  return (
    <Crud
      title={"Special Permit List"}
      search={searchParams}
      table={tableParams}
      buttonAdd={buttonAddParams}
      modalForm={modalFormParams}
    >
      <Form.Item>
        {getFieldDecorator("description", {
          initialValue: "",
          rules: [
            {
              required: true,
              message: "Please input special title description!"
            }
          ]
        })(<Input placeholder="Description" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("permit_total", {
          initialValue: "",
          rules: [{ required: true, message: "Please set permit total!" }]
        })(
          <InputNumber style={{ width: "100%" }} placeholder="Permit Total" />
        )}
      </Form.Item>
    </Crud>
  );
}

const SpecialPermitForm = Form.create({ name: "SpecialPermit" })(SpecialPermit);
export default SpecialPermitForm;
