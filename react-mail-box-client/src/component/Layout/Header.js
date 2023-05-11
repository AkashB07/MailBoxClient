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

  const logoutHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    navigate('/');
  }

  return (
    <Fragment>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home"><h1>Mail Box</h1></Navbar.Brand>
          <Fragment>
            <Nav className="me-auto">
              <Nav.Link href="/compose">Compose</Nav.Link>
              <Nav.Link href="/inbox">Inbox</Nav.Link>
              <Nav.Link href="/sent">Sent</Nav.Link>
            </Nav>
            <Button variant="danger" onClick={logoutHandler} >Logout</Button>
          </Fragment>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default Header;