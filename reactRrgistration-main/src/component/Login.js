import React, { useEffect, useState } from "react";
import { useAuth } from "../context/UserAuthContext";
import "./Signup.css";
import { Link, useNavigate } from 'react-router-dom';
import { GoogleButton } from 'react-google-button';

const Login = () => {
  const { error, SignIn, currentuser } = useAuth();
  const [err, setError] = useState("");
  const [backError, setBackError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log("i'm in");
    if (error) {
      setInterval(() => {
        setBackError("");
      }, 5000);
      setBackError(error);
    }
  }, [error, currentuser]);

  const UserHandler = (e) => {
    const { name, value } = e.target;
    console.log(name + "::::::::::" + value);
    setUser((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    if (email == "" || password == "") {
      setInterval(() => {
        setError("");
      }, 5000);
      return setError("please fill All the field ");
    } else {
      SignIn(email, password);
      {
        currentuser &&
          setUser({
            email: "",
            password: "",
          });
      }
    }
  };

  return (
    <div className="box">
      {err
        ? err && <p className="error">{err}</p>
        : backError && <p className="error">{backError}</p>}

      <form onSubmit={SubmitHandler} className="form">
        <h2>Login</h2>

        <div className="inputfield">
          <input
            type="text"
            placeholder="email"
            value={user.email}
            name="email"
            onChange={UserHandler}
          />
        </div>

        <div className="inputfield">
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            name="password"
            onChange={UserHandler}
          />
        </div>

        <div className="inputfield">
          <input type="submit" />
        </div>
        <GoogleButton />
        <p className="forget">
          Don't have an account? <a href="signup">Sign up </a>
        </p>
          
      </form>
    </div>
  );
};

export default Login;

