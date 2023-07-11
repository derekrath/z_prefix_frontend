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

export const LoginContext = createContext();
// export const LoginFunctionsContext = createContext();
export const BlogContext = createContext();

function App() {

  // This works:
  // const url = 'http://localhost:8080'

  // This also seems to work:
    // const url = "http://localhost:3001";
  // const url = "https://z-prefix-server.herokuapp.com"
  // 
  const dev = process.env.NODE_ENV !== 'production';
  const url = dev ? 'http://localhost:8080' : 'https://z-prefix-server.herokuapp.com';

  const date = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(date.getMonth() + 1);
  
  const [userData, setUserData] = useState('')
  const [username, setUsername] = useState('')
  const [cookies, setCookies, removeCookies] = useCookies(['username-cookie', 'passwordRaw-hash-cookie']);
  const [showLoginError, setShowLoginError] = useState(false);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [showCreateUserSuccess, setShowCreateUserSuccess] = useState(false);
  const [messageText, setMessageText] = useState('')

  const [content, addContent] = useState('');
  const [title, addTitle] = useState('');
  const [userBlogs, setUserBlogs] = useState([]);
  const [allUserBlogs, setAllUserBlogs] = useState([]);
  
  const loginContext = {url, cookies, username, userData, showLoginError, showLoginSuccess, showCreateUserSuccess, messageText, setUserData, setUsername, loginUser, setCookies, removeCookies, setShowLoginError, setShowLoginSuccess, setShowCreateUserSuccess, setMessageText};

  const blogContext = {content, addContent, title, addTitle, userBlogs,  setUserBlogs,  allUserBlogs, setAllUserBlogs}

    //setting cookies 
  useEffect(() => {
    let user_username = cookies['username-cookie']
    setUsername(user_username)
    let passwordHash = cookies['passwordRaw-hash-cookie']
    if (user_username && passwordHash) {
      loginUser(user_username, passwordHash)
    }
  }, [])

function loginUser(user_username, passwordRaw) {
  return new Promise((resolve, reject) => {
    fetch(`${url}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify({ user_username, passwordRaw })
    })
      .then(res => {
        if(res.ok){
          setCookies('username-cookie', user_username, {expires: nextMonth})
          // !!!!!Change to the hash, hide the raw password!!!!
          setCookies('passwordRaw-hash-cookie', passwordRaw, {expires: nextMonth})
          setShowLoginError(false)
          setShowLoginSuccess(true)
          setShowCreateUserSuccess(false)
          // !!!!!Change to the hash, hide the raw password!!!!
          setUserData({user_username: user_username, password: passwordRaw})
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
