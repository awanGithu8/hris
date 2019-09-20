import React from 'react';

import { Table, Input, Button, Row, Col } from 'antd';

function Cuti() {
  const dataSource = [];

  for (let i = 0; i < 25; i++) {
    dataSource.push({
      key: i,
      name: 'John ' + i,
      from_date: '2019-09-20',
      to_date: '2019-09-20',
      total_days: 1,
      work_date: '2019-09-21',
      reason: "Interview Kerja"
    });
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'From Date',
      dataIndex: 'from_date',
      key: 'from_date',
    },
    {
      title: 'To Date',
      dataIndex: 'to_date',
      key: 'to_date',
    },
    {
      title: 'Total Days',
      dataIndex: 'total_days',
      key: 'total_days',
    },
    {
      title: 'Working Date again',
      dataIndex: 'work_date',
      key: 'work_date',
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
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
