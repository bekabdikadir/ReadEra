import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

import Alert from "@mui/material/Alert";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import "../style/page_styles/RegisterPage.css";

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

const RegisterPage = () => {
  const navigate = useNavigate();

  const {
    handleSignUp,
    handleEmail,
    handlePassword,
    emailError,
    passwordError,
    user,
    handleUser,
  } = useAuth();

  const [userLocal, setUserLocal] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [error, setError] = useState("");

  const handleInp = (e) => {
    let obj = {
      ...userLocal,
      [e.target.name]: e.target.value,
    };
    setUserLocal(obj);
    handleEmail(userLocal.email.toString());
    handlePassword(userLocal.password);
  };

  const handleCorrectRegister = (password, passwordConfirm) => {
    console.log("handle correct");
    if (
      !userLocal.email.trim() ||
      !userLocal.password.trim() ||
      !userLocal.passwordConfirm.trim()
    ) {
      setError("Some inputs are empty");
      return;
    }
    if (password !== passwordConfirm) {
      setError("Passwords doesn`t match");
      return;
    }
    handleSignUp();
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     handleUser(false);
  //   }, 3000);
  // }, [user]);

  return (
    <div className="register-container">
      {emailError ? (
        <Alert className="register__alert" severity="error">
          {emailError}
        </Alert>
      ) : null}
      {passwordError ? (
        <Alert className="register__alert" severity="error">
          {passwordError}
        </Alert>
      ) : null}
      {error ? (
        <Alert className="register__alert" severity="error">
          {error}
        </Alert>
      ) : null}

      {user ? (
        <Alert
          className="register__alert"
          sx={{ textAlign: "center" }}
          severity="success"
        >
          SUCCESSFULLY REGISTERED AND AUTHORIZED
        </Alert>
      ) : null}

      <div className="register__inp_block">
        <TextField
          margin="normal"
          // id="standard-basic"
          label="Username"
          name="email"
          onChange={handleInp}
          className="register__inp"
          variant="standard"
          type="text"
        />
      </div>
      <div className="register__inp_block">
        <TextField
          margin="normal"
          // id="standard-basic"
          label="Password"
          name="password"
          onChange={handleInp}
          className="register__inp"
          variant="standard"
          type="password"
        />
      </div>
      <div className="register__inp_block">
        <TextField
          margin="normal"
          // id="standard-basic"
          label="Password Confirm"
          name="passwordConfirm"
          onChange={handleInp}
          className="register__inp"
          variant="standard"
          type="password"
        />
      </div>
      <div className="register__btn_block">
        <ThemeProvider theme={theme}>
          <Button
            className="register__button"
            variant="outlined"
            color="secondary"
            onClick={() => {
              handleCorrectRegister(
                userLocal.password,
                userLocal.passwordConfirm
              );
            }}
          >
            Register
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default RegisterPage;
