import React from "react";
import { Route, Routes} from "react-router-dom";

import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";

const App = () =>  {
  
  return (
    <Routes>
      <Route
        path="/signup"
        element={<SignupPage /> }
      />
      <Route
        path="/"
        element={<LoginPage/>}
      />
    </Routes>
  );
}

export default App;  
