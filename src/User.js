import React, { useState, useEffect } from 'react';

import { Table, Input, Button, Row, Col, Divider } from 'antd';

function User() {
  const [dataSource, setdataSource] = useState([]);

  const data = [];
  for (let i = 0; i < 25; i++) {
    data.push({
      key: i,
      username: 'John ' + i,
      role: 'Administrator'
    });
  }

  useEffect(() => {
    setdataSource(data);
  }, [])

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => a.username.length - b.username.length,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
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
        d.name.includes(e.target.value)
      )
    })
    setdataSource(dataFilter);
  }

  return (
    <React.Fragment>
      <center><h3>User List</h3></center>
      <Row>
        <Col span={22}>
          <Input 
              placeholder="Find User" 
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

export default User;
