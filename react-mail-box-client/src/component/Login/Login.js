import React, { useRef, Fragment } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import axios from "axios";

import { authActions } from "../../store/auth-slice";

const url = 'http://localhost';

const Login = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const loginHandler = async (event) => {
        try {
            event.preventDefault();
            const enteredEmail = emailInputRef.current.value;
            const enteredPassword = passwordInputRef.current.value;

            const userDetails = {
                email: enteredEmail,
                password: enteredPassword
            }
            emailInputRef.current.value = '';
            passwordInputRef.current.value = '';

            const respone = await axios.post(`${url}:4000/user/login`, userDetails);

            if (respone.status === 200) {
                localStorage.setItem('token', respone.data.token);
                dispatch(authActions.login({ token: respone.data.token, email: enteredEmail }));
                alert(respone.data.message);
                navigate('/home');
            }
            else {
                throw new Error('Failed to Login');
            }
        }
        catch (error) {
            alert(error.response.data.message);
            console.log(error);
        }
    };


    return (
        <Fragment><br />
            <div className="row justify-content-center">
                <h1 className="text-center">Login</h1><br /><br /><br /><br />

                <div className="col-md-4">
                    <form id="loginform" onSubmit={loginHandler}>

                        <div className="form-group">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                required ref={emailInputRef}
                            />
                        </div><br />

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                required ref={passwordInputRef}
                            />
                        </div><br />

                        <div className="d-grid gap-2">
                            <p className="text-center"> <Link to="/password">Forgot Password?</Link></p>
                            <Button type="submit" variant="primary" size="lg">LogIn</Button>
                            <p className="text-center" > <Link to="/signup">New User? Signup</Link></p><br />
                        </div>

                    </form><br /><br /><br />
                </div>
            </div>
        </Fragment>
    );
};

export default Login;