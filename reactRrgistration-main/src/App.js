import React from "react";
import Home from "./component/Home";
import Login from "./component/Login";
import Signup from "./component/Signup";
import UserAuthContext from "./context/UserAuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <UserAuthContext>
      <Router>
        <Routes>
          <Route path="login" element={<Login />}></Route>
          <Route path="signup" element={<Signup />}></Route>
          <Route path="home" element={<Home />}></Route>
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </UserAuthContext>
  );
}

export default App;
