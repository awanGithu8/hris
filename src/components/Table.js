import React from "react";
import {Button, Table} from "antd";

export default function TableComponent(props) {
  return (
    <React.Fragment>
      <Button
        type="primary"
        icon="plus-square"
        style={{ marginTop: "1%" }}
        onClick={props.onClickAdd}
      >
        {props.btn_add_title}
      </Button>
      <Table
        dataSource={props.dataSource}
        columns={props.columns}
        pagination={{ defaultPageSize: 6, showSizeChanger: false }}
        rowKey="_id"
        loading={props.firstLoad}
      />
    </React.Fragment>
  );
}
