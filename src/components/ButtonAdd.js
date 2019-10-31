import React from "react";
import { Button } from "antd";

export default function ButtonAddComponent(props) {
  return (
    <Button
      type="primary"
      icon="plus-square"
      style={{ marginTop: "1%" }}
      onClick={props.onClickAdd}
    >
      {props.title}
    </Button>
  );
}
