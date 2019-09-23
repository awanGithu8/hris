import React, { useState, useEffect } from 'react';

import { Table, Input, Button, Row, Col, Divider } from 'antd';

function Employee() {
  const [dataSource, setdataSource] = useState([]);

  const data = [];
  for (let i = 0; i < 25; i++) {
    data.push({
      key: i,
      name: 'John ' + i,
      division: 'R&D',
      job_title: 'Junior Web Programmer',
      remaining: "12 Days"
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
      title: 'Division',
      dataIndex: 'division',
      key: 'division',
    },
    {
      title: 'Job Title',
      dataIndex: 'job_title',
      key: 'job_title',
    },
    {
      title: 'Remaining Permit',
      dataIndex: 'remaining',
      key: 'remaining',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a>Edit</a>
          <Divider type="vertical" />
          <a>Delete</a>
        </span>
      )
    },
  ];

  function searchData(e){
    let dataFilter = data.filter(function(d){
      return (
        d.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    })
    setdataSource(dataFilter);
  }

  return (
    <React.Fragment>
      <center><h3>Employee List</h3></center>
      <Row>
        <Col span={22}>
          <Input 
              placeholder="Find Employee" 
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

export default Employee;
