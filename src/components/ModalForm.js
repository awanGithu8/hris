import React from "react";
import { Modal, Input, Form } from "antd";

export default function ModalFormComponent(props) {
  const { getFieldDecorator } = props.form;

  return (
    <Modal
      title={props.title}
      visible={props.visible}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      destroyOnClose={true}
    >
      <Form className="login-form">
        <Form.Item>
          {getFieldDecorator("description", {
            initialValue: props.modalData ? props.modalData.description : "",
            rules: [
              { required: true, message: "Please input your description!" }
            ]
          })(<Input placeholder="Description" />)}
        </Form.Item>
      </Form>
    </Modal>
  );
}
