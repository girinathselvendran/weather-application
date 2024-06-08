import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const NavBar = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Weather App
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/history">
          History
        </Button>
        {isAuthenticated ? (
          <Button
            color="inherit"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Logout
          </Button>
        ) : (
          <Button color="inherit" onClick={loginWithRedirect}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
