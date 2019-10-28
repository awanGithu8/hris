import React, { useState, useEffect } from 'react';

import { Table, Input, Form } from 'antd';

import axios from 'axios';

import { BACKEND_URL } from "./config/connection";


function Cuti() {
  const [dataSource, setdataSource] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true)
  const [data, setData] = useState([]);
  const [dataUser, setdataUser] = useState([]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'user_id',
      key: 'user_id',
      sorter: (a, b) => a.user_id.length - b.user_id.length,
      render: text => {
        return dataUser[text].name;
      }      
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
      title: 'Total',
      dataIndex: 'total_days',
      key: 'total_days',
      align: 'right',
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
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];


  useEffect(() => {
    getUsers();
    refreshData();
  }, [])

  function getUsers() {
    axios.get(BACKEND_URL + "getData").then(res => {
      let users = [];
      for (const [index, value] of res.data.data.entries()) {
        value.password = "***SANTUY WAS HERE***";
        users[value["_id"]] = value;
      }
      setdataUser(users);
    });

  }

  function refreshData() {
    setFirstLoad(true);
    setTimeout(
      function () {
        axios.get(BACKEND_URL + 'listCuti')
          .then((res) => {
            setDataNeed(res.data.data)
          }
          )
      }
        .bind(this),
      1000
    );
  }

  function setDataNeed(skiw) {
    setdataSource(skiw);
    setData(skiw);
    setFirstLoad(false);
  }

  function searchData(e) {
    console.log(e.target.value);
    console.log(data);
    let dataFilter = data.filter(function (d) {
      return (
        d.description.toLowerCase().includes(e.target.value.toLowerCase())
      )
    })
    setdataSource(dataFilter);
  }

  return (
    <React.Fragment>
      <center><h3>Permit List</h3></center>
      <Input
        placeholder="Find Permit"
        onPressEnter={searchData}
      />
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ defaultPageSize: 8, showSizeChanger: false }}
        rowKey="_id"
        loading={firstLoad}
      />
    </React.Fragment>
  );
}

const CutiForm = Form.create({ name: 'Cuti' })(Cuti);

export default CutiForm;
