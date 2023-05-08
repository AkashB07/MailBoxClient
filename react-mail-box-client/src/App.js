import React from "react";
import { Route, Routes} from "react-router-dom";

import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import PasswordPage from "./pages/Password";

const App = () =>  {
  
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />}/>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/password" element={<PasswordPage/>}/>
    </Routes>
  );
}

export default App;  
