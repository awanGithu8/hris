import React, { useState, useEffect } from 'react';

import { Table, Input, Form, Button } from 'antd';

import axios from 'axios';

import { BACKEND_URL } from "./config/connection";


function Report() {
  const [dataSource, setdataSource] = useState([]);
  const [firstLoad, setFirstLoad]   = useState(true)
  const [data, setData]             = useState([]);
  const [dataUser, setdataUser]     = useState([]);
  const [reportType, setReportType] = useState("table");

  const columns = [
    {
      title: 'Name',
      dataIndex: 'user_id',
      key: 'user_id',
      sorter: (a, b) => {
          let nameA = dataUser[a.user_id] ?  dataUser[a.user_id].name.length : "";
          let nameB = dataUser[b.user_id] ? dataUser[b.user_id].name.length : "";
          return nameA - nameB
        },
      render: text => {
        return dataUser[text]?dataUser[text].name:"";
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
    let dataFilter = data.filter(function (d) {
      let name = dataUser[d.user_id] ? dataUser[d.user_id].name : "";
      return (
        name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    })
    setdataSource(dataFilter);
  }

  return (
    <React.Fragment>
      <center><h3>Report</h3></center>
      <Input
        placeholder="Employee's Name"
        onPressEnter={searchData}
      />
      <div style={{textAlign: 'right'}}>
          <Button type="primary" icon="table" onClick={() => setReportType('table')} /> 
          <span> </span>
          <Button type="primary" icon="bar-chart" onClick={() => setReportType('chart')} />
      </div>
       {
            reportType === "table" && (
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}//{{ defaultPageSize: 8, showSizeChanger: false }}
                    rowKey="_id"
                    loading={firstLoad}
                    scroll={{ y: 400 }}
                />        
            )            
       }

       {
           reportType === "chart" && (
               <div>This is chart</div>
           )
       }

    </React.Fragment>
  );
}

const ReportForm = Form.create({ name: 'Report' })(Report);

export default ReportForm;
