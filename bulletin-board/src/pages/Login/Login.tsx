import React from 'react';
import {
    Form,
    Button,
} from 'react-bootstrap';

const Login = () => {
    return (
            <div>
                <div className="form-intro">
                    <h1 id="form-header">Welcome Back!</h1>
                </div>

                    <Form className="registerForm">
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter Username" />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                    </Button>
                    </Form>
            </div>
    );
}
export default Login;