import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

import Alert from "@mui/material/Alert";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import "../style/page_styles/PasswordResetPage.css";

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

const PasswordResetPage = () => {
  const {
    handlePassword,
    password,
    passwordError,
    updatePassword,
    handleCurrentUser,
    currentUser,
    handleOldPassword,
    oldPassword,
  } = useAuth();

  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    handlePassword("");
    handleCurrentUser(false);
    handleOldPassword("");
  }, []);

  const handlePasswordReset = () => {
    if (password !== passwordConfirm) {
      setError("Passwords doesn`t match");
      return;
    } else if (!password.trim() || !passwordConfirm.trim()) {
      setError("Some inputs are empty");
      return;
    }
    updatePassword();
  };

  return (
    <div className="password-reset-container">
      {currentUser ? (
        <Alert className="password-reset__alert" severity="success">
          SUCCESSFULLY CHANGED
        </Alert>
      ) : null}
      {passwordError ? (
        <Alert className="password-reset__alert" severity="error">
          {passwordError}
        </Alert>
      ) : null}
      {error ? (
        <Alert className="password-reset__alert" severity="error">
          {error}
        </Alert>
      ) : null}
      <div className="password-reset__inp_block">
        <TextField
          margin="normal"
          label="Old Password"
          name="password"
          value={oldPassword}
          onChange={(e) => handleOldPassword(e.target.value)}
          className="password-reset__inp"
          variant="standard"
          type="password"
        />
      </div>
      <div className="password-reset__inp_block">
        <TextField
          margin="normal"
          label="New Password"
          name="password"
          value={password}
          onChange={(e) => handlePassword(e.target.value)}
          className="password-reset__inp"
          variant="standard"
          type="password"
        />
      </div>
      <div className="password-reset__inp_block">
        <TextField
          margin="normal"
          label="New Password Confirm"
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className="password-reset__inp"
          variant="standard"
          type="password"
        />
      </div>
      <div className="password-reset__btn_block">
        <ThemeProvider theme={theme}>
          <Button
            className="password-reset__button"
            variant="outlined"
            color="secondary"
            onClick={() => {
              handlePasswordReset();
            }}
          >
            Login
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default PasswordResetPage;
