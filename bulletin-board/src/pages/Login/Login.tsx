import React from 'react';
import Home from '../Home/Home'
import Register from '../Register/Register';
import {
    Form,
    Button,
    Col
} from 'react-bootstrap';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
const Login = () => {
    return (
        <BrowserRouter>
            <div>
                <div className="intro">
                    <h1 id="intro-header">Bulletin Account Login</h1>
                    <p id="intro-message">If you dont have an account click the <strong><i>Register</i></strong> link below</p>
                    <Button variant="primary" type="submit">
                        <Link to='/register'>Register</Link>
                </Button>
                </div>

                <div className="intro">
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control className="formControl" type="text" placeholder="Enter Username" />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control className="formControl" type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                    </Button>
                    </Form>
                </div>
            </div>

            <Switch>
                <Route path="/register">
                    <Register/>
                </Route>
            </Switch>
        </BrowserRouter>






    );
}
export default Login;