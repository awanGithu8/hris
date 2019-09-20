import React, { useState, useEffect } from 'react';

import { Table, Input, Button, Row, Col } from 'antd';

function Cuti() {
  const [dataSource, setdataSource] = useState([]);

  const data = [];
  for (let i = 0; i < 25; i++) {
    data.push({
      key: i,
      name: 'John ' + i,
      type: 'Tahunan/Khusus/Sakit',
      from_date: '2019-09-20',
      to_date: '2019-09-20',
      total_days: i+1,
      work_date: '2019-09-21',
      reason: "Interview Kerja"
    });
  }

  useEffect(() => {
    setdataSource(data);
  }, [])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
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
      sorter: (a, b) => a.total_days - b.total_days,
    },
    {
      title: 'Working',
      dataIndex: 'work_date',
      key: 'work_date',
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
    },
  ];

  function searchData(e){
    let dataFilter = data.filter(function(d){
      return (
        d.name.includes(e.target.value)
        ||
        d.total_days.toString().includes(e.target.value)
      )
    })
    setdataSource(dataFilter);
  }

  return (
    <React.Fragment>
      <center><h3>Daftar Cuti</h3></center>
      <Row>
        <Col span={22}>
          <Input 
              placeholder="Cari Data Cuti" 
              onPressEnter={searchData}
            />
        </Col>
        <Col span={2}>
          <Button type="primary" icon="search">Search</Button>
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
