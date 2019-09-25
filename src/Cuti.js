import React, { useState, useEffect } from 'react';

import { Table, Input, Form } from 'antd';

import axios from 'axios';

function Cuti() {
  const [dataSource, setdataSource] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true)
  const [data, setData] = useState([]);

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
    refreshData();
  }, [])

  function refreshData(){
    setFirstLoad(true);
    setTimeout(
        function() {
          axios.get('http://localhost:3001/api/listCuti')
            .then((res) => {
              setDataNeed(res.data.data)
            }
          )
        }
        .bind(this),
        1000
    );
  }
  
  function setDataNeed(skiw){
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

   return(
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
