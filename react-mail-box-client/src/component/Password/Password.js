import { useRef, Fragment } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const url = 'http://localhost';

const Password = () => {
    const emailInputRef = useRef();

    const passwordHandler = async (event) => {
        try {
            event.preventDefault();
            const enteredEmail = emailInputRef.current.value;

            const loginDetails = {
                email: enteredEmail
            }
            emailInputRef.current.value = '';

            const respone = await axios.post(`${url}:4000/password/forgotpassword`, loginDetails)
            console.log(respone)
            if (respone.status === 200) {
                alert("Mail Successfuly sent");
            } 
            else {
                throw new Error('Something went wrong!!!')
            }
        }

        catch (error) {
            console.log(error);
        }
    }

    return (
        <Fragment><br />
            <div className="row justify-content-center">
                <h1 className="text-center">Reset Password</h1><br /><br /><br /><br />

                <div className="col-md-4">
                    <form id="loginform" onSubmit={passwordHandler}>

                        <div className="form-group">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                required ref={emailInputRef}
                            />
                        </div><br />

                        <div className="d-grid gap-2">
                            <Button type="submit" variant="primary" size="lg">Reset</Button>
                        </div>

                    </form><br /><br /><br />
                </div>
            </div>
        </Fragment>

    );
};

export default Password;