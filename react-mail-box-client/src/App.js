import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { authActions } from "./store/auth-slice";
import HomePage from "./pages/Home";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import PasswordPage from "./pages/Password";
import Header from "./component/Layout/Header";
import ComposePage from "./pages/Compose";
import InboxPage from "./pages/Inbox";
import SentPage from "./pages/Sent";

const App = () =>  {

  const { isAuthenticated, token, email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedEmail = localStorage.getItem("email");
    if (savedToken && savedEmail) {
      dispatch(authActions.login({ token: savedToken, email: savedEmail }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    }
  }, [token, email, isAuthenticated]);

  
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />}/>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/password" element={<PasswordPage/>}/>
      <Route path="/compose" element={<ComposePage/>}/>
      <Route path="/inbox" element={<InboxPage/>}/>
      <Route path="/sent" element={<SentPage/>}/>
      <Route path="/home" element={isAuthenticated ? <HomePage/> : <Navigate to="/" />} />
      
    </Routes>
  );
}

export default App;  
