import React from 'react';

import { Table, Input, Button, Row, Col } from 'antd';

function Cuti() {
  const dataSource = [];

  for (let i = 0; i < 25; i++) {
    dataSource.push({
      key: i,
      name: 'John ' + i,
      age: 42,
      address: '10 Downing Street',
    });
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <React.Fragment>
      <center><h3>Daftar Cuti</h3></center>
      <Row>
        <Col span={22}>
          <Input placeholder="Cari Cuti" />
        </Col>
        <Col span={2}>
          <Button type="primary" icon="search">
            Search
          </Button>
        </Col>
      </Row>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ defaultPageSize: 8, showSizeChanger: false }}

      />
    </React.Fragment>
  );
}

export default Cuti;
