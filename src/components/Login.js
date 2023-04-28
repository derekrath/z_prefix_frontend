import React, { Component } from "react";
import { createContext, useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import "../styles.css";
// import CustomInput from "./CustomInput";
import Button from "./Button";
import Alert from '@mui/material/Alert';
import { LoginFunctionsContext, LoginDataContext } from "../App";
import TextField from '@mui/material/TextField';

// const cors = require('cors');

const axios = require('axios');

//make user info available for blog page
// export const userInfoContext = createContext()


export default function Login() {

  const url = 'http://localhost:8080'

  const [result, setResult] = useState('')
  // const [cookies, setCookies, removeCookies] = useCookies(['username-cookie', 'passwordRaw-hash-cookie']);
  
  const {cookies, showLoginError, showLoginSuccess, showCreateUserSuccess, messageText} = useContext(LoginDataContext)
  const {loginUser, logout, setCookies, setShowLoginError, setShowLoginSuccess, setShowCreateUserSuccess, setMessageText} = useContext(LoginFunctionsContext);


  // //setting cookies 
  // useEffect(() => {
  //   let username = cookies['username-cookie']
  //   let passwordHash = cookies['passwordRaw-hash-cookie']
  //   if (username && passwordHash) {
  //     loginUser(username, passwordHash)
  //   }
  // }, [])

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
      console.log('response on frontend:', res.data)
      setMessageText(res.data.message)
      setShowCreateUserSuccess(true)
      setShowLoginError(false)
      setShowLoginSuccess(false)
    })
    // return new Promise((resolve, reject) => {
    //   let newUser = {
    //     username: username,
    //     password: passwordRaw
    //   }

    //   fetch(`${url}/users`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     }, body: JSON.stringify(newUser)
    //   })
    //     .then(res => {
    //       if (!res.ok) {
    //         throw new Error(res)
    //       } else {
    //         return res
    //       }
    //     })
    //     .then(res => res.json())
    //     .then(json => {
    //       resolve(json)
    //     })
    //     .catch(err => reject('This username is already in use.'))
    // })
  }

  // This was working
  // function loginUser(username, passwordRaw) {
  //   return new Promise((resolve, reject) => {
  //     fetch(`${url}/login`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       }, body: JSON.stringify({ username, passwordRaw })
  //     })
  //       .then(res => {
  //         if(res.ok){
  //           let status = res.status;
  //           // console.log('status code: okay', status)
  //           // console.log('username:', username)
  //           setCookies('username-cookie', username)
  //           setCookies('passwordRaw-hash-cookie', passwordRaw)
  //           setShowLoginError(false)
  //           setShowLoginSuccess(true)
  //           setShowCreateUserSuccess(false)
  //         }
  //         else{
  //           let status = res.status;
  //           console.log('status code: not okay', status)
  //           setShowLoginError(true)
  //           setShowLoginSuccess(false)
  //           setShowCreateUserSuccess(false)
  //         }
  //         return res.json()
  //       })
  //       .then(res => {
  //         console.log('status message:', res)
  //         setMessageText(res)
  //       })
  //       .catch(err => reject(err))
  //   })
  // };

  useEffect(() => {
    const getUsers = async () => {
      axios.get(url)
        .then(userList => setResult(userList.data));
      // .then(UserList => setResult({ username: UserList.data[0].username, passwordRaw: UserList.data[0].passwordRaw }));
    }
    getUsers();

  }, []);


  // function createUser (userInfo) {
  //   axios({
  //     method: 'post',
  //     url: 'http://localhost:8080/login/createuser',
  //     data: {
  //       username: userInfo.username,
  //       passwordRaw: userInfo.passwordRaw
  //     }
  //   });
  // }

  // const api = 'http://localhost:8080/api'
  // const [cookies, setCookies] = useState([]);

  // useEffect(() => {
  //     const getCookiesAsync = async () => {
  //         const response = await fetch(`'http://localhost:8080/cookies`,
  //             { credentials: 'include' });
  //         const cookies = await response.json();
  //         setCookies(cookies);
  //     }
  //     getCookiesAsync();
  // }, [])

  // const updateUsernameCookie = async () => {
  //     await fetch(`${api}/cookies/username`, {credentials: 'include', method: 'put'})
  // };

  // const deleteUsernameCookie = async () => {
  //     await fetch(`${api}/cookies/username`, {credentials: 'include', method: 'delete'})
  // };

  // const [userInfo, setUserInfo] = useState({
  //   username: "",
  //   passwordRaw: ""
  // })


  // const [usernameField, setUsernameField] = useState('')
  // const [passwordField, setPasswordField] = useState('')
  // const [showLoginError, setShowLoginError] = useState(false);
  // const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  // const [showCreateUserSuccess, setShowCreateUserSuccess] = useState(false);
  // const [messageText, setMessageText] = useState('')

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   let passwordRaw = getPasswordHash(passwordField)
  //   if (appFunctions) {
  //       appFunctions
  //           .login(usernameField, passwordRaw)
  //           .then(success => setShowLoginError(!success))
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(username, passwordRaw)
    // login(e.target[0].value, e.target[1].value)
  }

  const [username, setUsername] = useState('');
  const [passwordRaw, setPasswordRaw] = useState('');
  // const [userInfo, setUserInfo] = useState([]);

  const submitLogin = (e) => {
    setShowLoginError(false)
    e.preventDefault();
    // console.log('submited', userInfo);
    loginUser(username, passwordRaw);
  };

  const submitAccount = (e) => {
    e.preventDefault();
    createUserAccount(username, passwordRaw);
    // console.log('created', userInfo);
  };

  return (
    <div className="App">
      Results from database:
      {JSON.stringify(result)}
      <br></br>
      <br></br>
      Login Status:
      {showLoginError}
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
        <Button type="submit" color="primary" onClick={(e) => submitLogin(e)}>Log in</Button>
        <Button type="submit" color="primary" onClick={(e) => submitAccount(e)}>Create Account</Button>
        {showLoginError ? <Alert severity="error">{messageText}</Alert> : <></>}
        {showLoginSuccess ? <Alert severity="success">{messageText}</Alert> : <></>}
        {showCreateUserSuccess ? <Alert severity="info">{messageText}</Alert> : <></>}
      </form>
    </div>
  );
  // }
}
