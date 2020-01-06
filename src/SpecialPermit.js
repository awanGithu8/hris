import React, { useState, useEffect } from "react";
import Crud from "./components/Crud";
import { Input, Form, InputNumber, Tooltip, Button, Icon, Divider, Modal } from "antd";
import axios from "axios";
import { BACKEND_URL } from "./config/connection";

const {confirm} = Modal;

function SpecialPermit({ form }) {
  const { getFieldDecorator, validateFieldsAndScroll } = form;

  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.localeCompare(b.description)
    },
    {
      title: "Permit Total",
      dataIndex: "permit_total",
      key: "permit_total",
      sorter: (a, b) => a.permit_total - b.permit_total,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <span>
          <Tooltip title="Edit Permit" onClick={() => onClickEdit(record)}>
            <Button type="primary">
              <Icon type="edit" />
            </Button>
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title="Delete Permit" onClick={() => onClickDelete(record)}>
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
    dataSourceOri: [],
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
    },
    modalData: ""
  });

  function modalOk() {
    validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        let id = values.id;
        delete values.id;
        console.log(values);
        if (id == "") {
          axios.post(BACKEND_URL + "addSpecialPermit", values);
        }else{
          axios.post(BACKEND_URL + "updateSpecialPermit", {
            id: id,
            update: values
          });
        }
        setmodalFormParams({ ...modalFormParams, modalData: "", visible: false });
        refreshData();
      }
    });
  }

  function modalCancel() {
    setmodalFormParams({ ...modalFormParams, modalData: "", visible: false });
  }

  function onClickAdd() {
    setmodalFormParams({ ...modalFormParams, visible: true });
  }

  function onClickEdit(record) {
    setmodalFormParams({ ...modalFormParams, title: "Edit Special Permit", modalData: record, visible: true });
  }

  function onClickDelete(record) {
    confirm({
      title: `Are you sure delete ${record.description} ?`,
      content: "When this special permit deleted you can't get it back",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axios.delete(BACKEND_URL + "deleteSpecialPermit", {
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


  function refreshData() {
    settableParams({ ...tableParams, loading: true });
    setTimeout(function() {
      axios.get(BACKEND_URL + "listSpecialPermit").then(res => {
        settableParams({ ...tableParams, dataSource: res.data.data, dataSourceOri: res.data.data, loading: false });
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
      table={{tableParams, settableParams}}
      buttonAdd={buttonAddParams}
      modalForm={modalFormParams}
    >
      <Form.Item className={"display-none"}>
      {getFieldDecorator("id", {
          initialValue: modalFormParams.modalData["_id"]?modalFormParams.modalData["_id"]:"",
        })(<Input />)}        
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("description", {
          initialValue: modalFormParams.modalData.description?modalFormParams.modalData.description:"",
          rules: [
            {
              required: true,
              message: "Please input special permit description!"
            }
          ]
        })(<Input placeholder="Description" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("permit_total", {
          initialValue: modalFormParams.modalData.permit_total?modalFormParams.modalData.permit_total:"",
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
