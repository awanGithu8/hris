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

  const [permitTotal, setPermitTotal] = useState(1);
  let working_date = addWorkDays(moment().toDate(), permitTotal); // Tue Nov 29 2016 00:00:00 GMT+0000 (GMT Standard Time)
  let currentMonth = ("0" + working_date.getMonth()).slice(-2);
  let currentDate = ("0" + working_date.getDate()).slice(-2);
  let working_date_format = currentDate + "-" + currentMonth + "-" + working_date.getFullYear();

  const [workingDate, setWorkingDate] = useState(working_date_format);

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

  function workday_count(startDate, endDate) { 
    var day = moment(startDate);
    var businessDays = 0;

    while (day.isSameOrBefore(endDate,'day')) {
      if (day.day()!=0 && day.day()!=6) businessDays++;
      day.add(1,'d');
    }
    return businessDays;
  }
  
  function addWorkDays(startDate, days) {
    if(isNaN(days)) {
        console.log("Value provided for \"days\" was not a number");
        return
    }
    if(!(startDate instanceof Date)) {
        console.log("Value provided for \"startDate\" was not a Date object");
        return
    }
    // Get the day of the week as a number (0 = Sunday, 1 = Monday, .... 6 = Saturday)
    var dow = startDate.getDay();
    var daysToAdd = parseInt(days);
    // If the current day is Sunday add one day
    if (dow == 0)
        daysToAdd++;
    // If the start date plus the additional days falls on or after the closest Saturday calculate weekends
    if (dow + daysToAdd >= 6) {
        //Subtract days in current working week from work days
        var remainingWorkDays = daysToAdd - (5 - dow);
        //Add current working week's weekend
        daysToAdd += 2;
        if (remainingWorkDays > 5) {
            //Add two days for each working week by calculating how many weeks are included
            daysToAdd += 2 * Math.floor(remainingWorkDays / 5);
            //Exclude final weekend if remainingWorkDays resolves to an exact number of weeks
            if (remainingWorkDays % 5 == 0)
                daysToAdd -= 2;
        }
    }
    startDate.setDate(startDate.getDate() + daysToAdd);
    return startDate;
}


  function onChangeDate(dates, dateStrings) {
    let permit_total = workday_count(dates[0],dates[1]);
    let working_date = addWorkDays(dates[0].toDate(), permit_total); // Tue Nov 29 2016 00:00:00 GMT+0000 (GMT Standard Time)
    
    let date = ("0" + working_date.getDate()).slice(-2);
    let month = ("0" + working_date.getMonth()).slice(-2);

    let working_date_format = date + "-" + month + "-" + working_date.getFullYear();
    setWorkingDate(working_date_format);
    setPermitTotal(permit_total)
  }

  function handleSubmit(e) {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.from_date = values.date[0].format("DD-MM-YYYY");
        values.to_date = values.date[1].format("DD-MM-YYYY");
        
        delete values["date"];

        values.total_days = permitTotal;
        values.work_date = workingDate;


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
          <b><i>Total: {permitTotal} Days</i></b>
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
