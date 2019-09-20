import React, {useState} from "react";

import {
  Form,
  Input,
  Tooltip,
  Icon,
  Select,
  Row,
  Col,
  Button,
  DatePicker
} from 'antd';

import moment from 'moment';


const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;


function RegistrationForm ({
	form,
	props
}){
    const { getFieldDecorator, validateFieldsAndScroll } = form;

	function handleChange(value) {
	  console.log(`selected ${value}`);
	}

	function onChange(dates, dateStrings) {
	  console.log('From: ', dates[0], ', to: ', dates[1]);
	  console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
	}

  function handleSubmit(e){
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 12,
          offset: 4,
        },
        sm: {
          span: 12,
          offset: 4,
        },
      },
    };

    return (
	<React.Fragment>
	  <center><h3>Permit Request</h3></center>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item
          label={
            <span>
              Name&nbsp;
              <Tooltip title="Requester Name">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
          })(<Input />)}
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
          {getFieldDecorator('type', {
            rules: [{ required: true, message: 'Please select type!', whitespace: true }],
          })(
          	<Select defaultValue="anual_leave" onChange={handleChange}>
		      <Option value="anual_leave">Anual Leave</Option>
		      <Option value="sick_leave">Sick Leave</Option>
		      <Option value="special_leave">Special Leave</Option>
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
          {getFieldDecorator('date', {
            rules: [{ required: true, message: 'Please set permit date!'}],
          })(
          	<React.Fragment>
				<RangePicker
			      ranges={{
			        Today: [moment(), moment()],
			        'This Month': [moment().startOf('month'), moment().endOf('month')],
			      }}
			      onChange={onChange}
			    />
			    <span> <i>Total: ... Days</i></span>
			</React.Fragment>
          )}
        </Form.Item>
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
          {getFieldDecorator('reason', {
            rules: [{ required: true, message: 'Please input permit reason!'}],
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


const RequestCuti = Form.create({ name: 'register' })(RegistrationForm);
export default RequestCuti;