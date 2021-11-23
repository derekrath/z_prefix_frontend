import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SvgIcon from "@mui/material/SvgIcon";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Stack from "@mui/material/Stack";
import FeedIcon from '@mui/icons-material/Feed';
import HomeIcon from '@mui/icons-material/Home';

export default function NavBar({title}) {
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
              <Link to={`/logout`}>
                  Logout
              </Link>
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