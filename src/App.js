import './App.css';
// import { useEffect, useState } from 'react';
import Login from './components/Login';
import Blogs from './components/Blogs';
// import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Navigate, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.js";
// const cors = require('cors');
// import { Login } from './components/Login.js';
import { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export const LoginDataContext = createContext();
export const LoginFunctionsContext = createContext();

function App() {

  const url = 'http://localhost:8080'

  const date = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(date.getMonth() + 1);
  
  const [cookies, setCookies, removeCookies] = useCookies(['username-cookie', 'passwordRaw-hash-cookie']);
  const [showLoginError, setShowLoginError] = useState(false);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [showCreateUserSuccess, setShowCreateUserSuccess] = useState(false);
  const [messageText, setMessageText] = useState('')
  const [userData, setUserData] = useState('')

  const loginData = {url, cookies, userData, showLoginError, showLoginSuccess, showCreateUserSuccess, messageText}
  const appLoginFunctions = {setUserData, loginUser, setCookies, removeCookies, setShowLoginError, setShowLoginSuccess, setShowCreateUserSuccess, setMessageText};

    //setting cookies 
  useEffect(() => {
    let username = cookies['username-cookie']
    let passwordHash = cookies['passwordRaw-hash-cookie']
    if (username && passwordHash) {
      loginUser(username, passwordHash)
    }
  }, [])

function loginUser(username, passwordRaw) {
  return new Promise((resolve, reject) => {
    fetch(`${url}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify({ username, passwordRaw })
    })
      .then(res => {
        if(res.ok){
          setCookies('username-cookie', username, {expires: nextMonth})
          // !!!!!Change to the hash, hide the raw password!!!!
          setCookies('passwordRaw-hash-cookie', passwordRaw, {expires: nextMonth})
          setShowLoginError(false)
          setShowLoginSuccess(true)
          setShowCreateUserSuccess(false)
          // !!!!!Change to the hash, hide the raw password!!!!
          setUserData({username: username, password: passwordRaw})
        }
        else{
          let status = res.status;
          console.log('status code: not okay', status)
          setShowLoginError(true)
          setShowLoginSuccess(false)
          setShowCreateUserSuccess(false)
        }
        return res.json()
      })
      .then(res => {
        setMessageText(res)
      })
      .catch(err => reject(err))
  })
};

  return (
    <div className="App">
      <LoginDataContext.Provider value={loginData}>
        <LoginFunctionsContext.Provider value={appLoginFunctions}>
        <NavBar title="BlogZ" />
      {/* Results from database: */}
      {/* {JSON.stringify(result)} */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/blogs" element={<Blogs />} />
          </Routes>
        </LoginFunctionsContext.Provider>
      </LoginDataContext.Provider>
    </div>
  );

}

export default App;
