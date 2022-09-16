import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContextProvider";
import TextField from "@mui/material/TextField";
import "../../style/profile/profileList.css";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../../context/PostsContextProvider";

import SpeedDial from "./SpeedDial";
import SpeedDialAdaptive from "./SpeedDialAdaptive";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";

import PostsCard from "../Posts/PostsCard";

import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";

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

const ProfileList = () => {
  const { user } = useAuth();
  const { getSelected, selected } = usePosts();

  const navigate = useNavigate();

  const [posts, setPosts] = useState(selected);

  useEffect(() => {
    getSelected(user.email);
  }, []);

  useEffect(() => {
    setPosts(selected);
  }, [selected]);

  return (
    <div className="profile-list-container">
      <div className="profile-preview-block">
        <div className="profile-list__img-block">
          <img
            src={
              user.photoURL
                ? user.photoURL
                : "https://www.спартакфорум.рф/ext/dark1/memberavatarstatus/image/avatar.png"
            }
            alt="No connect"
            className="profile-list__img"
          />
        </div>
        <div className="function-block">
          <div className="profile__btn-block">
            <ThemeProvider theme={theme}>
              <Button
                className="add_comment_button"
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/add-post")}
              >
                Add Post
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </div>
      <div className="user-data-block">
        <div className="text-block">
          <ul className="user-data__list">
            <li className="list__item">
              <TextField
                id="standard-read-only-input"
                label="Name"
                defaultValue={
                  user.displayName ? user.displayName : "User Name doesn`t set"
                }
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
                className="list__item_inp"
              />
            </li>
            <li className="list__item">
              <TextField
                id="standard-read-only-input"
                label="Email"
                defaultValue={user ? user.email : "Loading"}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
                className="list__item_inp"
              />
            </li>
            <li className="list__item">
              <TextField
                id="standard-read-only-input"
                label="UID"
                defaultValue={user ? user.uid : "Loading"}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
                className="list__item_inp"
              />
            </li>
          </ul>
          <div className="speed-dial-block">
            <SpeedDial />
          </div>
          <div className="speed-dial-adaptive-block">
            <SpeedDialAdaptive />
          </div>
        </div>
      </div>
      <div className="selected-block">
        <div className="selected-title-block">
          <h2 className="selected-block__title">Selected Posts</h2>
        </div>
        <div className="carousel-block">
          <AliceCarousel>
            {posts ? (
              posts.map((item, index) => (
                <div className="post-card" key={index}>
                  <PostsCard item={item} />
                </div>
              ))
            ) : (
              <h3>Loading</h3>
            )}
          </AliceCarousel>
        </div>
      </div>
    </div>
  );
};

export default ProfileList;
