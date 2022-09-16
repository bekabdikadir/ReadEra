import React, { useEffect, useState } from "react";
import { usePosts } from "../../context/PostsContextProvider";
import { useAuth } from "../../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

import "../../style/posts/AddPost.css";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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

const AddPost = () => {
  const navigate = useNavigate();

  const { addPost } = usePosts();
  const { user } = useAuth();

  const date = new Date();

  const [post, setPost] = useState({
    user: user,
    date: date.toDateString(),
    title: "",
    type: "",
    desc: "",
    image: "",
    comments: [],
    likes: [],
    rating: [],
    selected: [],
  });

  const handleInp = (e) => {
    let obj = {
      ...post,
      [e.target.name]: e.target.value,
    };
    setPost(obj);
  };

  const [genre, setGenre] = useState("");

  useEffect(() => {
    let obj = {
      ...post,
      type: genre,
    };
    setPost(obj);
  }, [genre]);

  const handleChange = (event) => {
    setGenre(event.target.value);
  };

  const genres = [
    "Adventure",
    "Classic",
    "Drama",
    "Detective",
    "Fairytale",
    "Fantasy",
    "Horror",
    "Poetry",
    "Romance",
    "Science",
  ];

  return (
    <>
      <div className="add-post-container">
        <div className="add-post__inp-block">
          <TextField
            margin="normal"
            label="Title"
            name="title"
            onChange={handleInp}
            className="add-post__inp"
            variant="standard"
          />
        </div>
        <div className="add-post__inp-block">
          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
              name="genre"
              value={genre}
            >
              Genre
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={genre}
              label="Genre"
              onChange={handleChange}
            >
              {genres.map((item, index) => (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="add-post__inp-block">
          <TextField
            margin="normal"
            label="Description"
            name="desc"
            onChange={handleInp}
            className="add-post__inp"
            variant="standard"
          />
        </div>
        <div className="add-post__inp-block">
          <TextField
            margin="normal"
            label="Image Url"
            name="image"
            onChange={handleInp}
            className="add-post__inp"
            variant="standard"
          />
        </div>
        <div className="add-post__btn-block">
          <ThemeProvider theme={theme}>
            <Button
              className="add-post__btn"
              variant="outlined"
              color="secondary"
              onClick={() => {
                addPost(post);
                navigate("/posts");
              }}
            >
              Add Post
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
};

export default AddPost;
