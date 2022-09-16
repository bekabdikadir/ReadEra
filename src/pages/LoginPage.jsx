import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContextProvider";

import Alert from "@mui/material/Alert";

import "../style/page_styles/LoginPage.css";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#121212",
    },
    secondary: {
      main: "#121212",
    },
  },
});

const LoginPage = () => {
  const {
    handleEmail,
    handlePassword,
    email,
    password,
    emailError,
    passwordError,
    handleLogin,
    user,
  } = useAuth();

  useEffect(() => {
    handleEmail("");
    handlePassword("");
  }, []);

  return (
    <div className="login-container">
      {emailError ? (
        <Alert className="login__alert" severity="error">
          {emailError}
        </Alert>
      ) : null}
      {passwordError ? (
        <Alert className="login__alert" severity="error">
          {passwordError}
        </Alert>
      ) : null}
      <div className="login__inp_block">
        <TextField
          margin="normal"
          label="Username"
          name="email"
          value={email}
          onChange={(e) => handleEmail(e.target.value)}
          className="login__inp"
          variant="standard"
        />
      </div>
      <div className="login__inp_block">
        <TextField
          margin="normal"
          label="Password"
          name="email"
          value={password}
          onChange={(e) => handlePassword(e.target.value)}
          className="login__inp"
          variant="standard"
          type="password"
        />
      </div>
      <div className="login__btn_block">
        <ThemeProvider theme={theme}>
          <Button
            className="login__button"
            variant="outlined"
            color="secondary"
            onClick={() => {
              handleLogin();
            }}
          >
            Login
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default LoginPage;
