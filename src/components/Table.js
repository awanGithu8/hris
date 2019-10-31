import React from "react";
import { Table } from "antd";

export default function TableComponent(props) {
  return (
    <Table
      dataSource={props.dataSource}
      columns={props.columns}
      pagination={{ defaultPageSize: 6, showSizeChanger: false }}
      rowKey="_id"
      loading={props.firstLoad}
    />
  );
}
