import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePosts } from "../../context/PostsContextProvider";

import "../../style/posts/EditPost.css";

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

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { postDetails, getPostDetails, saveEditedPost } = usePosts();

  useEffect(() => {
    getPostDetails(id);
  }, []);

  useEffect(() => {
    setPost(postDetails);
  }, [postDetails]);

  const [post, setPost] = useState(postDetails);

  const handleInp = (e) => {
    let obj = {
      ...post,
      // type: genre,
      [e.target.name]: e.target.value,
    };
    setPost(obj);
  };

  const [genre, setGenre] = useState("");

  const handleChange = (event) => {
    setGenre(event.target.value);
    let obj = {
      ...post,
      type: event.target.value,
    };
    setPost(obj);
  };

  const handleSave = () => {
    let obj = {
      ...post,
      type: genre,
    };
    setPost(obj);
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
      {post ? (
        <div className="edit-post-container">
          <div className="edit-post__inp-block">
            <TextField
              margin="normal"
              required
              id="standard-basic"
              label="Title"
              name="title"
              onChange={handleInp}
              className="edit-post__inp"
              variant="standard"
              value={post.title}
            />
          </div>
          <div className="edit-post__inp-block">
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
          <div className="edit-post__inp-block">
            <TextField
              margin="normal"
              required
              id="standard-basic"
              label="Description"
              name="desc"
              onChange={handleInp}
              className="edit-post__inp"
              variant="standard"
              value={post.desc}
            />
          </div>
          <div className="edit-post__inp-block">
            <TextField
              margin="normal"
              required
              id="standard-basic"
              label="Image Url"
              name="image"
              onChange={handleInp}
              className="edit-post__inp"
              variant="standard"
              value={post.image}
            />
          </div>
          <div className="edit-post__btn-block">
            <ThemeProvider theme={theme}>
              <Button
                className="edit-post__btn"
                variant="outlined"
                color="secondary"
                onClick={() => {
                  handleSave();
                  saveEditedPost(post);
                  navigate("/posts");
                }}
              >
                Save Changes
              </Button>
            </ThemeProvider>
          </div>
        </div>
      ) : (
        <h2>Loading</h2>
      )}
    </>
  );
};

export default EditPost;
