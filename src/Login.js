import React, { useState } from 'react';
import { Form, Icon, Input, Button } from 'antd';

function Login({ form }) {
    const [isLogin, setisLogin] = useState(true);
    const { getFieldDecorator, validateFields } = form;

    function handleSubmit(e) {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    if(!isLogin){
        return (
            <Form onSubmit={handleSubmit} className="login-form" style={{width: "80vw", borderRadius: "5px"}}>
                <div style={{"margin": "10px"}}>
                    <h1>Login</h1>
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
            </Form>
        )
    }
    return(<div>
        <center>Santuy Human Resources Information System</center> 
        <br/><br/>
        Welcome %username%,

    </div>);
}

const LoginForm = Form.create({ name: 'normal_login' })(Login);

export default LoginForm;
