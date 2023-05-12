import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Button } from "react-bootstrap";

import { authActions } from "../../store/auth-slice";


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const home = () => {
    navigate("/home");
  }

  const compose = () => {
    navigate('/compose')
  }

  const inbox = () => {
    navigate('/inbox')
  }

  const sent = () => {
    navigate('/sent')
  }


  const logoutHandler = () => {
    dispatch(authActions.logout());
    // localStorage.removeItem("token");
    navigate('/');
  }

  return (
    <Fragment>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Button variant="dark" onClick={home} size="lg"><h2>Mail Box</h2></Button>
          <Fragment>
            <Nav className="me-auto">
              <Button variant="dark" onClick={compose}>Compose</Button>
              <Button variant="dark" onClick={inbox}>Inbox</Button>
              <Button variant="dark" onClick={sent}>Sent</Button>
            </Nav>
            <Button variant="danger" onClick={logoutHandler} >Logout</Button>
          </Fragment>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default Header;