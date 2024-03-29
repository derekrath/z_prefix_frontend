import './App.css';
// import { useEffect, useState } from 'react';
import Login from './components/Login';
import Blogs from './components/Blogs';
// import { useCookies } from 'react-cookie';
// import { BrowserRouter as Router, Navigate, Routes, Route } from "react-router-dom";
import { Navigate, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.js";
// const cors = require('cors');
// import { Login } from './components/Login.js';
import { createContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useCookies } from 'react-cookie';

// import dotenv from 'dotenv'; //not needed for React App
// dotenv.config(); //not needed for React App


export const LoginContext = createContext();
// export const LoginFunctionsContext = createContext();
export const BlogContext = createContext();

const axios = require('axios');

// console.log('REACT_APP_PORT | server located at port:', process.env.REACT_APP_PORT);
// console.log('REACT_APP_NODE_ENV | currently in:', process.env.REACT_APP_NODE_ENV);

function App() {

  // server url:
  const dev = process.env.NODE_ENV !== 'production'; // true or false
  // for Heroku:
  const url = dev ? `http://localhost:${process.env.REACT_APP_PORT}` : 'https://z-prefix-server.herokuapp.com';
  // for DigitalOcean:
  // const url = dev ? `http://localhost:${process.env.REACT_APP_PORT}` : 'https://z-prefix-ui.web.app';

  const [userData, setUserData] = useState('')
  const [usernameInput, setUsername] = useState('')
  const [passwordRaw, setPasswordRaw] = useState('');
  const [cookies, setCookies, removeCookies] = useCookies(['username-cookie', 'passwordRaw-hash-cookie']);
  const [showLoginError, setShowLoginError] = useState(false);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [showCreateUserSuccess, setShowCreateUserSuccess] = useState(false);
  const [messageText, setMessageText] = useState('')

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [userBlogs, setUserBlogs] = useState([]);
  const [allUserBlogs, setAllUserBlogs] = useState([]);
  
  const nextMonth = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1);
  }, []);
  
  //setting cookies 
  // function loginUser(username, passwordRaw) {
    //   return new Promise((resolve, reject) => {
      //     fetch(`${url}/login`, {
        //       method: 'POST',
        //       headers: {
          //         'Content-Type': 'application/json',
          //       }, body: JSON.stringify({ username, passwordRaw })
          //     })
  const loginUser = 
  useCallback((username, password) => 
  {
    axios({
      method: 'post',
      url: `${url}/login`,
      data: {
        username: username,
        password: password
      }
    })
    .then(res => {
      if(res){
        let passwordHash = res.data;
        setCookies('username-cookie', username, {expires: nextMonth})
        // !!!!!Change to the hash, hide the raw password!!!!
        setCookies('password-hash-cookie', passwordHash, {expires: nextMonth})
        setShowLoginError(false)
        setShowLoginSuccess(true)
        setShowCreateUserSuccess(false)
        // !!!!!Change to the hash, hide the raw password!!!!
        setUserData({user_username: username, passwordHash: passwordHash})
        setMessageText('LOGIN SUCCESSFUL')
      }
    })
    .catch(e => {
      setCookies('username-cookie','', {expires: nextMonth})
      setCookies('password-hash-cookie','', {expires: nextMonth})
      setShowLoginError(true)
      setShowLoginSuccess(false)
      setShowCreateUserSuccess(false)
      setMessageText('INVALID USERNAME OR PASSWORD')
    });
  }, [url, nextMonth, setCookies]);
  //   async function loginUser(username, password) {
    //     axios({
      //       method: 'post',
      //       url: `${url}/login`,
      //       data: {
        //         username: username,
        //         password: password
        //       }
        //     })
        //     .then(res => {
          //       if(res){
            //         let passwordHash = res.data;
            //         setCookies('username-cookie', username, {expires: nextMonth})
            //         // !!!!!Change to the hash, hide the raw password!!!!
            //         setCookies('password-hash-cookie', passwordHash, {expires: nextMonth})
            //         setShowLoginError(false)
            //         setShowLoginSuccess(true)
            //         setShowCreateUserSuccess(false)
            //         // !!!!!Change to the hash, hide the raw password!!!!
            //         setUserData({user_username: username, passwordHash: passwordHash})
            //         setMessageText('LOGIN SUCCESSFUL')
            //       }
            //     })
            //     .catch(e => {
              //         setCookies('username-cookie','', {expires: nextMonth})
              //         setCookies('password-hash-cookie','', {expires: nextMonth})
              //         setShowLoginError(true)
              //         setShowLoginSuccess(false)
              //         setShowCreateUserSuccess(false)
              //         setMessageText('INVALID USERNAME OR PASSWORD')
              //     })
              // };
              
  const loginContext = {url, cookies, usernameInput, passwordRaw, userData, showLoginError, showLoginSuccess, showCreateUserSuccess, messageText, setUserData, setUsername, setPasswordRaw, loginUser, setCookies, removeCookies, setShowLoginError, setShowLoginSuccess, setShowCreateUserSuccess, setMessageText};
  const blogContext = {content, setContent, title, setTitle, userBlogs,  setUserBlogs,  allUserBlogs, setAllUserBlogs}

  // login with cookies
  useEffect(() => {
    let username = cookies['username-cookie']
    let passwordHash = cookies['password-hash-cookie']
    if (username && passwordHash) {
      let password = passwordHash;
      loginUser(username, password)
    }
  }, [cookies, loginUser])
  
  return (
  <div className="App">
    <LoginContext.Provider value={loginContext}>
    {/* <LoginFunctionsContext.Provider value={appLoginFunctions}> */}
    <BlogContext.Provider value={blogContext}>
    <NavBar title="BlogZ" />
    {/* Results from database: */}
    {/* {JSON.stringify(result)} */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/blogs" element={<Blogs />} />
      </Routes>
    </BlogContext.Provider>
    {/* </LoginFunctionsContext.Provider> */}
    </LoginContext.Provider>
  </div>
  );
}

export default App;
