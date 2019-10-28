import React, { useState, useEffect } from 'react';

import { Table, Input, Form, Tooltip, Button, Icon, Modal, notification } from 'antd';

import axios from 'axios';

import {BACKEND_URL} from "./config/connection";

const { confirm } = Modal;

function Approval() {
  let session_user = JSON.parse(window.localStorage.getItem('datauser'));

  let msg = [];
  msg['approve'] = ['Permit Successfully approved','Permit has been approved'];
  msg['reject'] = ['Permit Successfully rejected','Permit has been rejected'];

  const openNotificationWithIcon = (type, status) => {
    notification[type]({
      message: msg[status][0],
      description:
        msg[status][1]
    });
  };

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
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Tooltip title="Approve">
            <Button type="primary" onClick={() => onClickApprove(record)}>
              <Icon type="carry-out" />
            </Button>
          </Tooltip>
          {" "}
          {/* <Divider type="horizontal" /> */}
          <Tooltip title="Reject">
            <Button type="danger" onClick={() => onClickReject(record)}>
              <Icon type="close-square" />
            </Button>
          </Tooltip>
        </span>
      )
    },
  ];

  function onClickApprove(data){
    const {name, type, from_date, to_date, total_days} = data;
    console.log(data);
    console.log(name, total_days);
    confirm({
      title: `Are you sure approve this ${type}?`,
      content: `Name: ${name} [${from_date} s/d ${to_date}]`,
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        axios.post(BACKEND_URL+'approveCuti', {
          id: data["_id"],
          requester: name,
          total_days: total_days
        });
        openNotificationWithIcon('success', 'approve');
        refreshData();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  function onClickReject(data){
    const {name, type, from_date, to_date} = data;

    confirm({
      title: `Are you sure reject this ${type}?`,
      content: `Name: ${name} [${from_date} s/d ${to_date}]`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        axios.post(BACKEND_URL+'rejectCuti', {
          id: data["_id"]
        });
        openNotificationWithIcon('success', 'reject');
        refreshData();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  
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


  function refreshData(){
    setFirstLoad(true);
    setTimeout(
        function() {
          axios.post(BACKEND_URL+'listApproval', {
            division: session_user.division
          })
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
        <center><h3>Approval List</h3></center>
        <Input
          placeholder="Find Permit"
          onPressEnter={searchData}
        />    
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ defaultPageSize: 5, showSizeChanger: false }}
          rowKey="_id" 
          loading={firstLoad}
        />
      </React.Fragment>
    );
}

const ApprovalForm = Form.create({ name: 'Approval' })(Approval);

export default ApprovalForm;
