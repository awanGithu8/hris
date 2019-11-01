import React from "react";
import { Modal, Form } from "antd";

export default function ModalFormComponent(props) {
  return (
    <Modal
      title={props.title}
      visible={props.visible}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      destroyOnClose={true}
    >
      <Form className="login-form">
        {props.children}
      </Form>
    </Modal>
  );
}
