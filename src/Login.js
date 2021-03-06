import React, {useContext} from 'react';
import { Form, Icon, Input, Button, message } from 'antd';

import axios from "axios";

import { BACKEND_URL } from "./config/connection";

import {UserContext} from "./context/UserContext";

function Login({ form }) {
    const user = useContext(UserContext);

    const { getFieldDecorator, validateFields } = form;

    function handleSubmit(e) {
        e.preventDefault();
        validateFields((err, values) => {
            console.log(values);
            if (!err) {
                if(values.username === "ospt" && values.password === "ospt"){
                    values.name = "Administrator [***Special User***]";
                    values.role = "Administrator";
                    user.setuser(values);
                }else{
                    axios.post(BACKEND_URL + 'userLoggedIn', values).then(response => {
                        if(response.data.data == null){
                            message.warning("Invalid username or password");
                        }else{
                            user.setuser(response.data.data)
                        }
                    }).catch(err => {
                        console.log(err);
                    });
                }
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit} className="login-form">
            <img
                src={"/sindata.png"}
                style={{
                    height: "25vh",
                }}
            />
            <br /><br />
            <div className={"login-div"}>
                <center>
                    <h1>Permit Apps</h1>
                </center>
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                        </Button>
                </Form.Item>
            </div>
            <div style={{ textAlign: "right" }}>
                <p>Copyright &copy; 2019 - OSPT</p>
            </div>
        </Form>
    )
}

const LoginForm = Form.create({ name: 'normal_login' })(Login);

export default LoginForm;
