import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { authActions } from "./store/auth-slice";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import PasswordPage from "./pages/Password";
import ComposePage from "./pages/Compose";
import Header from "./component/Layout/Header";



const App = () =>  {

  const { isAuthenticated, token, email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(email);
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
      <Route path="home/*" element={isAuthenticated ? <Header /> : <Navigate to="/" />} />
      
    </Routes>
  );
}

export default App;  
