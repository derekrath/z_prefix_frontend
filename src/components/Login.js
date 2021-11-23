import React, { Component } from "react";
import { createContext, useEffect, useState } from 'react';
// import { useCookies } from 'react-cookie';
import "../styles.css";
import CustomInput from "./CustomInput";
import Button from "./Button";

//make user info available for blog page
// export const userInfoContext = createContext()

export default function App() {
  



  const [userInfo, setUserInfo] = useState({
    username: "",
    password: ""
  })

  const handleChange = (e) => {
    // this.setUserInfo({ [e.currentTarget.id]: e.currentTarget.value });
    // console.log(this.userInfo)
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    // console.log(`Form submitted, ${this.userInfo}`);
  };

  // render() {
    return (
      <div className="App">
        <form className="form" onSubmit = {handleSubmit}>
          <CustomInput
            labelText="Username"
            id="username"
            formControlProps={{
              fullWidth: true
            }}
            handleChange={handleChange()}
            type="text"
          />
          <CustomInput
            labelText="Password"
            id="password"
            formControlProps={{
              fullWidth: true
            }}
            handleChange={handleChange()}
            type="password"
          />
          
          {/* <input onChange = {(e) => setName(e.target.value)} value = {name}></input> */}
          <Button type="submit" color="primary" className="form__custom-button">
            Log in
          </Button>
        </form>
      </div>
    );
  // }
}
