import React, { useState, useEffect } from 'react';

import { Table, Input, Button, Row, Col, Divider } from 'antd';

function Division() {
  const [dataSource, setdataSource] = useState([]);

  const data = [];
  for (let i = 0; i < 25; i++) {
    data.push({
      key: i,
      description: 'R&D'
    });
  }

  useEffect(() => {
    setdataSource(data);
  }, [])

  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      sorter: (a, b) => a.description.length - b.description.length,
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
      <center><h3>Division List</h3></center>
      <Row>
        <Col span={22}>
          <Input 
              placeholder="Find Division" 
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

export default Division;
