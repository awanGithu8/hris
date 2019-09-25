import React, { useState, useEffect } from "react";

import {
  Form,
  Input,
  Tooltip,
  Icon,
  Select,
  Button,
  DatePicker,
  notification 
} from "antd";

import moment from "moment";
import axios from 'axios';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

function RegistrationForm({ form, props }) {
  const { getFieldDecorator, validateFieldsAndScroll, resetFields } = form;

  const [dataUser, setdataUser] = useState([]);

  const openNotificationWithIcon = type => {
    notification[type]({
      message: 'Add Permit Successfully added',
      description:
        'Your permit already added, now your permit waiting for approval',
    });
  };

  useEffect(() => {
    axios.get("http://localhost:3001/api/getData").then(res => {
      let users = [];
      for (const [index, value] of res.data.data.entries()) {
        const {username, name, job_title, division} = value;
        users.push(<Option key={index} value={username}>
          {username +' - '+ name + ' [ ' + job_title + ' @' + division + ' ]'}
        </Option>)
      }
      setdataUser(users);
    });
  }, []);

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  function workday_count(start,end) {
    var first = start.clone().endOf('week'); // end of first week
    var last = end.clone().startOf('week'); // start of last week
    var days = last.diff(first,'days') * 5 / 7; // this will always multiply of 7
    var wfirst = first.day() - start.day(); // check first week
    if(start.day() == 0) --wfirst; // -1 if start with sunday 
    var wlast = end.day() - last.day(); // check last week
    if(end.day() == 6) --wlast; // -1 if end with saturday
    return wfirst + days + wlast; // get the total
  }

  function onChangeDate(dates, dateStrings) {

    let permitTotal = workday_count(dates[0],dates[1]);
    console.log(permitTotal);


    
    console.log("From: ", dates[0], ", to: ", dates[1]);
    console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.from_date = values.date[0].format("DD-MM-YYYY");
        values.to_date = values.date[1].format("DD-MM-YYYY");
        
        delete values["date"];

        values.total_days = 7;
        values.work_date = "18/07/2019";


        console.log("Received values of form: ", values);
        try{
          axios.post('http://localhost:3001/api/addCuti', values);
          openNotificationWithIcon('success');
          resetFields();
        }catch(e){
          console.log("Something went wrong " + e);
        }
      }
    });
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 12,
        offset: 4
      },
      sm: {
        span: 12,
        offset: 4
      }
    }
  };

  return (
    <React.Fragment>
      <center>
        <h3>Permit Request</h3>
      </center>
      <Form {...formItemLayout} onSubmit={handleSubmit} hideRequiredMark>
        <Form.Item
          label={
            <span>
              Requester&nbsp;
              <Tooltip title="Requester Name">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "Please select your name!",
                whitespace: true
              }
            ]
          })(<Select>{dataUser}</Select>)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Type&nbsp;
              <Tooltip title="Type of Permit">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("type", {
            initialValue: "Annual Leave",
            rules: [
              {
                required: true,
                message: "Please select type!",
                whitespace: true
              }
            ]
          })(
            <Select onChange={handleChange}>
              <Option value="Annual Leave">Annual Leave</Option>
              <Option value="Sick Leave">Sick Leave</Option>
              <Option value="Special Leave">Special Leave</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Permit Date&nbsp;
              <Tooltip title="Permit Date Range">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("date", {            
            initialValue: [moment(), moment()]
          })(
            <RangePicker
              ranges={{
                Today: [moment(), moment()],
                "This Month": [
                  moment().startOf("month"),
                  moment().endOf("month")
                ]
              }}
              onChange={onChangeDate}
              allowClear={false}
            />              
          )}
        </Form.Item>
        <span style={{
          marginLeft: "15vw",
        }}>
          <b><i>Total: ... Days</i></b>
        </span>
        <br/><br/>
        <Form.Item
          label={
            <span>
              Reason&nbsp;
              <Tooltip title="Permit Reason">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("reason", {
            rules: [{ required: true, message: "Please input permit reason!" }]
          })(
            <TextArea
              placeholder="Reason"
              autosize={{ minRows: 2, maxRows: 6 }}
            />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Request
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
}

const RequestCuti = Form.create({ name: "register" })(RegistrationForm);
export default RequestCuti;
