import React, { useState } from "react";
import Crud from "./components/Crud";
import { Input, Form, InputNumber } from "antd";

function SpecialPermit({ form }) {
  const { getFieldDecorator, validateFieldsAndScroll } = form;

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
    btn_add_title: "Add Special Permit"
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
  }

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
          rules: [{ required: true, message: "Please input special title description!" }]
        })(<Input placeholder="Description" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("permit_total", {
          initialValue: "",
          rules: [{ required: true, message: "Please set permit total!" }]
        })(<InputNumber style={{ width: "100%" }} placeholder="Permit Total" />)}
      </Form.Item>
    </Crud>
  );
}

const SpecialPermitForm = Form.create({ name: "SpecialPermit" })(SpecialPermit);
export default SpecialPermitForm;
