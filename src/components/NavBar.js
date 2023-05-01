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
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from "react-router-dom";
// import FavoriteIcon from "@mui/icons-material/Favorite";
import Stack from "@mui/material/Stack";
import FeedIcon from '@mui/icons-material/Feed';
// import HomeIcon from '@mui/icons-material/Home';
// import { useCookies } from 'react-cookie';
import { LoginFunctionsContext } from "../App.js";
import { useContext } from 'react';

// const { palette } = createTheme();
// const { augmentColor } = palette;
// const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
// const theme = createTheme({
//   palette: {
//     custom: createColor('#F40B27'),
//   },
// });

export default function NavBar({title}) {
  
  const {setUserData, removeCookies, setShowLoginError, setShowLoginSuccess, setShowCreateUserSuccess} = useContext(LoginFunctionsContext);
  
  // const [cookies, setCookies, removeCookies] = useCookies(['username-cookie', 'passwordRaw-hash-cookie']);

  const handleLogout = (e) => {
    // e.preventDefault();
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
    setUserData();
  }

    return (
      // <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" 
        // sx={{margin: 2}}
        >
          <Toolbar 
          // sx={{margin: 2}}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            '& > *': {
              m: 1,
            },
          }}
          >
            {/* <Stack direction="row" spacing={4}> */}
            <Box
            // sx={{margin: 2}}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'left',
                '& > *': {
                  m: 1,
                },
              }}
            >
                <Link to={`/blogs`}>
                  <Button
                    variant="contained"
                    color="inherit"
                    style={{
                      // borderRadius: 35,
                      backgroundColor: "white",
                      // padding: "18px 36px",
                      fontSize: "18px"
                    }}
                    // sx={{ my: 2, color: 'white', display: 'block' }}
                    startIcon={<FeedIcon style={{ color: "gray" }} />}
                  >
                    Blogs
                  </Button>
                </Link>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Link to={`/login`}>
                  <Button>
                    Login
                  </Button>
                </Link>
                <Link to={'/login'}>
                  <Button onClick={(e) => handleLogout(e)}>
                    Logout
                  </Button>
                </Link>
              </ButtonGroup>
            </Box>
            {/* </Stack> */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'left',
                '& > *': {
                  m: 1,
                },
              }}
            >
              <Typography
                variant="h3"
                noWrap
                // component="div"
                // sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                {title}
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      // </Box>
    );
  }