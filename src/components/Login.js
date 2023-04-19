import React, { Component } from "react";
import { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import "../styles.css";
import CustomInput from "./CustomInput";
import Button from "./Button";
import Alert from '@mui/material/Alert';

import TextField from '@mui/material/TextField';

// const cors = require('cors');

const axios = require('axios');

//make user info available for blog page
// export const userInfoContext = createContext()

export default function App() {

  const url = 'http://localhost:8080';

  const [result, setResult] = useState('');
  const [cookies, setCookies, removeCookies] = useCookies(['username-cookie', 'passwordRaw-hash-cookie']);


  //setting cookies 

  // useEffect(() => {
  //   let username = cookies['username-cookie']
  //   let passwordHash = cookies['passwordRaw-hash-cookie']
  //   if (username && passwordHash) {
  //     login(username, passwordHash)
  //   }
  // }, [])

  async function createUserAccount(username, passwordRaw) {
    console.log('posting', username, passwordRaw)
    axios({
      method: 'post',
      url: `${url}/users`,
      data: {
        username: username,
        passwordRaw: passwordRaw
      }
    })
    .then(resp => {
      console.log(resp.data);
    });

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

  function loginUser(username, passwordRaw) {
    return new Promise((resolve, reject) => {
      fetch(`${url}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, body: JSON.stringify({ username: username, password: passwordRaw })
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(res.statusText)
          } else {
            return res
            console.log('login success', res)
          }
        })
        .then(res => res.json())
        .then(json => {
          resolve(json)
        })
        .catch(err => reject(err))
    })
  }


  // async function login(username, passwordHash) {
  //   //send to backend and get
  //   return loginUser(username, passwordHash)
  //     .then(res => {
  //       setUserInfo(res)
  //       setCookies('username-cookie', username)
  //       setCookies('passwordRaw-hash-cookie', passwordRaw)
  //       return true
  //     })
  //     .catch(err => {
  //       return false
  //     })
  // }

  function logout() {
    // setUserInfo()
    removeCookies('username-cookie')
    removeCookies('passwordRaw-hash-cookie')
  }


  //logging in with cookie data

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
  const [showLoginError, setShowLoginError] = useState(false)

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
    e.preventDefault();
    // console.log('submited', userInfo);
    loginUser(username, passwordRaw);
    // and dont forget to setShowLoginError if login fails
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
        {showLoginError ? <Alert severity="error">Invalid Username or Password, Try Again</Alert> : <></>}
      </form>
    </div>
  );
  // }
}
