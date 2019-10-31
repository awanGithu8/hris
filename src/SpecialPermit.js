import React, { useState } from "react";
import Crud from "./components/Crud";
import { Form } from "antd";

function SpecialPermit({ form }) {
  const { validateFieldsAndScroll } = form;

  let searchParams = {
    placeholder: "Find Special Login"
  };
  let buttonAddParams = {
    title: "Add Special Permit"
  };
  let tableParams = {
    btn_add_title: "Add Special Permit"
  };
  const [modalFormParams, setmodalFormParams] = useState({
    form,
    title: "Add Special Permit",
    visible: true,
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
        setmodalFormParams({...modalFormParams, visible: false});    
      }
    });
    
  }

  function modalCancel() {
    setmodalFormParams({...modalFormParams, visible: false});    
  }

  return (
    <Crud
      title={"Special Permit List"}
      search={searchParams}
      table={tableParams}
      buttonAdd={buttonAddParams}
      modalForm={modalFormParams}
    />
  );
}

const SpecialPermitForm = Form.create({ name: "SpecialPermit" })(SpecialPermit);
export default SpecialPermitForm;
