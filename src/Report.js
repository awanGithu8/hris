import React, { useState, useEffect } from 'react';
import { Table, Input, Form, Button } from 'antd';
import axios from 'axios';
import { BACKEND_URL } from "./config/connection";
import { Doughnut, Bar } from 'react-chartjs-2';


function Report() {
  const [dataSource, setdataSource]         = useState([]);
  const [firstLoad, setFirstLoad]           = useState(true)
  const [data, setData]                     = useState([]);
  const [dataUser, setdataUser]             = useState([]);
  const [reportType, setReportType]         = useState("table");
  const [arrNames, setArrNames]             = useState([]);
  const [arrColors, setArrColors]           = useState([]);
  const [arrJumlahCuti, setArrJumlahCuti]  = useState([]);

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

  useEffect(() => {
      if (reportType !== "table") {    
          let tmparrNames   = [];
          let tmparrColors  = [];
          let tmpJumlahCuti = [];
          for (const user in dataUser) {
              if (dataUser.hasOwnProperty(user)) {
                tmparrNames.push(dataUser[user].name);
                tmparrColors.push(getRandomColor());

                let jumlahCuti = 0;
                data.forEach(cuti => {
                    if (cuti.user_id === user) {
                        jumlahCuti += cuti.total_days   
                    }
                });
                tmpJumlahCuti.push(jumlahCuti)
              }
          }
          setArrNames(tmparrNames);
          setArrColors(tmparrColors);
          setArrJumlahCuti(tmpJumlahCuti);
      }
  }, [reportType])

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

  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
          <span> </span>
          <Button type="primary" icon="pie-chart" onClick={() => setReportType('donat')} />
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
                   <Bar
                       data = {
                           {
                            labels: arrNames,
                            datasets: [
                                {
                                    label: "Jumlah Cuti",
                                    backgroundColor: arrColors,
                                    data: arrJumlahCuti
                                }
                                ]                           
                           }
                       }
                       options={
                        {
                            legend: { display: false },
                            title: {
                              display: true,
                              text: 'Report Cuti Berdasarkan Jumlah tahun 2020'
                            }
                          }
                       } 
                       width={100}
                       height={45}
                       // options={{ maintainAspectRatio: false }}
                   />
           )
       }
       {
           reportType === 'donat' && (
                <Doughnut
                    data = {
                        {
                            datasets: [{
                                data: arrJumlahCuti,
                                backgroundColor: arrColors
                            }],
                        
                            // These labels appear in the legend and in the tooltips when hovering different arcs
                            labels: arrNames
                        }
                    }
                    width={100}
                    height={50}
                    // options={{ maintainAspectRatio: false }}
                />
           )
       }

    </React.Fragment>
  );
}

const ReportForm = Form.create({ name: 'Report' })(Report);

export default ReportForm;
