import * as React from "react";
// import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import InputBase from "@mui/material/InputBase";
// import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
// import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import SvgIcon from "@mui/material/SvgIcon";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
// import FavoriteIcon from "@mui/icons-material/Favorite";
import Stack from "@mui/material/Stack";
import FeedIcon from '@mui/icons-material/Feed';
// import HomeIcon from '@mui/icons-material/Home';
import { useCookies } from 'react-cookie';
import { LoginFunctionsContext } from "../App.js";
import { createContext, useContext, useEffect, useState } from 'react';



export default function NavBar({title}) {
  
  const {setCookies, removeCookies, setShowLoginError, setShowLoginSuccess, setShowCreateUserSuccess, setMessageText} = useContext(LoginFunctionsContext);
  
  // const [cookies, setCookies, removeCookies] = useCookies(['username-cookie', 'passwordRaw-hash-cookie']);

  const handleLogout = (e) => {
    e.preventDefault();
    // console.log('submited', userInfo);
    logout();
    // appLoginFunctions.logout()
  };

   function logout() {
    // setUserInfo()
    console.log('logging out')
    removeCookies('username-cookie')
    removeCookies('passwordRaw-hash-cookie')
    setShowCreateUserSuccess(false)
    setShowLoginError(false)
    setShowLoginSuccess(false)
  }

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Stack direction="row" spacing={2}>
              {/* <Link to={`/app`}>
                <Button
                  variant="outlined"
                  color="inherit"
                  startIcon={<HomeIcon style={{ color: "white" }} />}
                >
                  Home
                </Button>
              </Link> */}
              <Link to={`/blogs`}>
                <Button
                  variant="outlined"
                  color="inherit"
                  startIcon={<FeedIcon style={{ color: "white" }} />}
                >
                  Blogs
                </Button>
              </Link>
              <Link to={`/login`}>
                  Login
              </Link>
              {/* <Link to={`/login`} onClick={(e) => submitLogout(e)}>
                  Logout
              </Link> */}
                <Button variant="text" onClick={(e) => handleLogout(e)} sx={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    padding: '8px',
                    margin: '5px'
                }}>
                  Logout
                </Button>
            </Stack>
            <Typography
              variant="h3"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }