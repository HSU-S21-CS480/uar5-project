import React from 'react';
import {
    Form,
    Button,
    Col
} from 'react-bootstrap';
import profile from '../../profile.png';
import email from '../../email.png';
import password from '../../password.png';
const Register = () => {
    return (
        <div>
            <div className="form-intro">
                <h1 id="form-header">Sign Up with Bulletin</h1>
            </div>

            <Form className="registerForm">
                <Form.Group controlId="formUsername">
                    <img src={profile} alt="profile" className="icon" />
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <img src={email} alt="email" className="icon" />
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <img src={password} alt="password" className="icon" />
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>

        </div>
    )
}

export default Register;