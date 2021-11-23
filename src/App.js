import './App.css';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import Blogs from './components/Blogs';
import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Navigate, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.js";


function App() {

  //test test test //////////////////////

  let [result, setResult] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/')
    .then(res => {
      console.log(res)
      return res.json()
    })
    .then(json => setResult(json))
  }, []);



  // async function login(username, passwordHash) {
    // return loginUser(username, password_hash)
    //   .then(response => {
    //     setUserData(response)
    //     setCookie('logged-in-username', username)
    //     setCookie('logged-in-password-hash', password_hash)
    //     return true
    //   })
    //   .catch(err => {
    //     return false
    //   })
  // }

  // function logout() {
    // setUserData()
    // removeCookie('logged-in-username')
    // removeCookie('logged-in-password-hash')
  // }

  return (
    <div className="App">
      <NavBar title="BlogZ" />
      Results from database:
      {JSON.stringify(result)}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/blogs" element={<Blogs />} />
      </Routes>
    </div>
  );

  // ///////////////////////////////

}

export default App;
