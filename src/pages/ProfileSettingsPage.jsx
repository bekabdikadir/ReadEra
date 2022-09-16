import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContextProvider";

import Alert from "@mui/material/Alert";

import "../style/page_styles/ProfileSettingsPage.css";

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

const ProfileSettingsPage = () => {
  const {
    currentUser,
    displayName,
    photoURL,
    updateProfile,
    handleDisplayName,
    handlePhoto,
    emailError,
    handleCurrentUser,
  } = useAuth();

  useEffect(() => {
    handleDisplayName("");
    handlePhoto("");
    handleCurrentUser(false);
  }, []);

  useEffect(() => {}, [currentUser]);

  const handleUpdate = () => {
    if (!displayName.trim() || !photoURL.trim()) {
      alert("Some inputs are empty");
      return;
    } else {
      updateProfile();
    }
  };

  return (
    <div className="profile-reset-container">
      {emailError ? (
        <Alert className="profile-reset__alert" severity="error">
          {emailError}
        </Alert>
      ) : null}
      {currentUser ? (
        <Alert className="profile-reset__alert" severity="success">
          SUCCESSFULLY CHANGED
        </Alert>
      ) : null}
      <div className="profile-reset__inp_block">
        <TextField
          margin="normal"
          label="Set Name"
          name="displayName"
          value={displayName}
          onChange={(e) => handleDisplayName(e.target.value)}
          className="profile-reset__inp"
          variant="standard"
        />
      </div>
      <div className="profile-reset__inp_block">
        <TextField
          margin="normal"
          label="Set Photo URL"
          name="photo"
          value={photoURL}
          onChange={(e) => handlePhoto(e.target.value)}
          className="profile-reset__inp"
          variant="standard"
        />
      </div>
      <div className="profile-reset__btn_block">
        <ThemeProvider theme={theme}>
          <Button
            className="profile-reset__button"
            variant="outlined"
            color="secondary"
            onClick={() => handleUpdate()}
          >
            Save
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
