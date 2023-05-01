// import React, { Component } from "react";
import React from "react";
import { useContext, useEffect, useState } from 'react';
// import { useCookies } from 'react-cookie';
import "../styles.css";
// import CustomInput from "./CustomInput";
import Button from "./LoginButton";
// import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import { LoginFunctionsContext, LoginDataContext } from "../App";
import TextField from '@mui/material/TextField';

// const cors = require('cors');

const axios = require('axios');

//make user info available for blog page
// export const userInfoContext = createContext()

export default function Login() {

  const url = 'http://localhost:8080'

  // const [cookies, setCookies, removeCookies] = useCookies(['username-cookie', 'passwordRaw-hash-cookie']);
  const [users, setUsers] = useState('')

  const {userData, showLoginError, showLoginSuccess, showCreateUserSuccess, messageText} = useContext(LoginDataContext)
  const {loginUser, setShowLoginError, setShowLoginSuccess, setShowCreateUserSuccess, setMessageText} = useContext(LoginFunctionsContext);

  async function createUserAccount(username, passwordRaw) {
    console.log('posting', username, passwordRaw);
    axios({
      method: 'post',
      url: `${url}/users`,
      data: {
        username: username,
        passwordRaw: passwordRaw
      }
    })
    .then(res => {
      // console.log('response on frontend:', res.data)
      setMessageText(res.data.message)
      setShowCreateUserSuccess(true)
      setShowLoginError(false)
      setShowLoginSuccess(false)
    })
  }

  useEffect(() => {
    const getUsers = async () => {
      axios.get(url)
        .then(userList => setUsers(userList.data));
      // .then(UserList => setResult({ username: UserList.data[0].username, passwordRaw: UserList.data[0].passwordRaw }));
    }
    getUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // login(e.target[0].value, e.target[1].value)
  }

  const [username, setUsername] = useState('');
  const [passwordRaw, setPasswordRaw] = useState('');

  const submitLogin = (e) => {
    setShowLoginError(false)
    e.preventDefault();
    // console.log('submited', userInfo);
    loginUser(username, passwordRaw);
  };

  const submitAccount = (e) => {
    e.preventDefault();
    createUserAccount(username, passwordRaw);
  };

  return (
    <div className="LoginApp">
      Results from database:
      {JSON.stringify(users)}
      <br></br>
      <br></br>
      Login Status:
      {userData? <> Logged In </>:<> Logged Out </>}
      <br></br>
      <br></br>
      Result from username field:
      {username}
      <br></br>
      <br></br>
      Result from password field:
      {passwordRaw}
      <form className="form" onSubmit={handleSubmit}>
        <TextField
          required
          // id="filled-required"
          label="Username"
          placeholder="Username"
          variant="filled"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          required
          // id="filled-password-input"
          label="Password"
          type="password"
          placeholder="Password"
          variant="filled"
          value={passwordRaw}
          onChange={e => setPasswordRaw(e.target.value)}
        />
        <Button type="submit"
        style={{ 
        //   minHeight: "auto",
        //   minWidth: "auto",
        //   color: "#FFFFFF",
        //   boxShadow:"0 2px 2px 0 rgba(153, 153, 153, 0.14), 0 3px 1px -2px rgba(153, 153, 153, 0.2), 0 1px 5px 0 rgba(153, 153, 153, 0.12)",
        //   position: "relative",
        //   padding: "12px 30px",
        //   margin: ".3125rem 1px",
        //   fontSize: "14px",
        //   textTransform: "uppercase",
        //   letterSpacing: "0",
        //   lineHeight: "1.42857143",
        //   textAlign: "center",
        //   verticalAlign: "middle",
          backgroundColor: "#3b5998",
        }} 
        // color="facebook"
        onClick={(e) => submitLogin(e)}
        >
          Log in
        </Button>
        <Button type="submit" 
          // style={{ 
          //   minHeight: "auto",
          //   minWidth: "auto",
          //   color: "#FFFFFF",
          //   boxShadow:"0 2px 2px 0 rgba(153, 153, 153, 0.14), 0 3px 1px -2px rgba(153, 153, 153, 0.2), 0 1px 5px 0 rgba(153, 153, 153, 0.12)",
          //   position: "relative",
          //   padding: "12px 30px",
          //   margin: ".3125rem 1px",
          //   fontSize: "14px",
          //   textTransform: "uppercase",
          //   letterSpacing: "0",
          //   lineHeight: "1.42857143",
          //   textAlign: "center",
          //   verticalAlign: "middle",
          //   backgroundColor: "#3b5998",
          // }} 
        onClick={(e) => submitAccount(e)}
        >
          Create Account
        </Button>
        {showLoginError ? <Alert severity="error">{messageText}</Alert> : <></>}
        {showLoginSuccess ? <Alert severity="success">{messageText}</Alert> : <></>}
        {showCreateUserSuccess ? <Alert severity="info">{messageText}</Alert> : <></>}
      </form>
    </div>
  );
  // }
}
