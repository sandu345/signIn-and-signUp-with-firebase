import React, { useEffect, useState } from "react";
import { useAuth } from "../context/UserAuthContext";
import "./Signup.css";


const Signup = () => {
  const { error, SignUp, currentuser } = useAuth();
  const [err, setError] = useState("");
  const [backError, setBackError] = useState("");
  const [user, setUser] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

const [accountType, setAccountType] = useState("");
const [verificationSent, setVerificationSent] = useState(false);

  useEffect(() => {
    console.log("i am in");
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

  const AccountTypeHandler = (selectedOption) => {
    setAccountType(selectedOption.value);
  }

  


  const SubmitHandler = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, FirstName, LastName } = user;
    if (
      password == "" ||
      confirmPassword == "" ||
      email == "" ||
      FirstName == "" ||
      LastName == ""
    ) {
      setInterval(() => {
        setError("");
      }, 5000);
      return setError("please fill All the field ");
    } else if (password !== confirmPassword) {
      setInterval(() => {
        setError("");
      }, 5000);
      return setError("Password does not match");
    } else if (!password.length >= 6 || !confirmPassword.length >= 6) {
      setInterval(() => {
        setError("");
      }, 5000);
      return setError("Password Must be Greater then 6 Length");
    } else {
      SignUp(email, password, FirstName, LastName);
      setVerificationSent(true);
      {
        currentuser &&
          setUser({
            FirstName: "",
            LastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
      }
    }
  };


  return (
    <div className="box">
      {err
        ? err && <p className="error">{err}</p>
        : backError && <p className="error">{backError}</p>}
        {verificationSent && (
          <p className="success"> Verification email has been sent. Please check your inbox.</p>
        )}

      <form onSubmit={SubmitHandler} className="form">
        <h2>Registration</h2>
        <div className="inputfield">
            <select 
        
            value={accountType}
            onChange={AccountTypeHandler}
            placeholder="Select Account Type">
                <option value={"customer"}>Customer</option>
                <option value={"developer"}>Developer</option>

            </select>
        </div>
        <div className="inputfield">
          <input
            type="text"
            placeholder="First Name"
            value={user.FirstName}
            name="FirstName"
            onChange={UserHandler}
          />
        </div>
        <div className="inputfield">
          <input
            type="text"
            placeholder="Last Name"
            value={user.LastName}
            name="LastName"
            onChange={UserHandler}
          />
        </div>
        <div className="inputfield">
          <input
            type="text"
            placeholder="Email"
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={user.confirmPassword}
            name="confirmPassword"
            onChange={UserHandler}
          />
        </div>
        <div className="inputfield">
          <input type="submit" />
        </div>
        <p className="forget">
          Already have an account? <a href="login">Sign In </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;