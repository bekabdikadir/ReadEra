import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostsContextProvider";
import { useAuth } from "../context/AuthContextProvider";
import CommentCard from "../components/Posts/CommentCard";
import "../style/page_styles/DetailPostPage.css";
import TextField from "@mui/material/TextField";
import RatingPost from "../components/Posts/RatingPost";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";

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

const DetailPostPage = () => {
  const {
    getPostDetails,
    postDetails,
    addComment,
    comments,
    getComments,
    getRating,
  } = usePosts();
  const { user } = useAuth();

  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(postDetails);
  const [comment, setComment] = useState("");
  const [commentsArr, setCommentsArr] = useState(comments);

  useEffect(() => {
    getPostDetails(id);
    getComments(id);
    getRating(id);
  }, []);

  useEffect(() => {
    setPost(postDetails);
  }, [postDetails]);

  useEffect(() => {
    setCommentsArr(comments);
  }, [comments]);

  const handleComment = () => {
    if (!comment.trim()) {
      alert("You can not add an empty comment");
      return;
    }
    addComment(post.id, user.email, comment);
    setComment("");
  };

  return (
    <>
      {post ? (
        <div className="detail-container">
          <div className="preview-block">
            <div className="image-block">
              <img
                src={post.image}
                alt="No connect"
                className="image-block__img"
              />
            </div>
            <div className="function-block">
              <RatingPost post={post} />
            </div>
          </div>
          <div className="content-block">
            <div className="text-block">
              <h1 className="text-block__title">{post.title}</h1>
              <h3 className="text-block__type">Written by: {post.user}</h3>
              <h3 className="text-block__type"> Genre of book: {post.type}</h3>
              <p className="text-block__desc">{post.desc}</p>
            </div>
            <div className="comment-block">
              <div className="add-comment-block">
                <div className="inp-block">
                  <TextField
                    margin="normal"
                    id="standard-basic"
                    label="Comment Text"
                    name="title"
                    className="add-comment__inp"
                    variant="standard"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <div className="btn-block">
                  <ThemeProvider theme={theme}>
                    <Button
                      className="add_comment_button"
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleComment()}
                      sx={{
                        fontSize: "12px",
                      }}
                    >
                      Sent
                    </Button>
                  </ThemeProvider>
                </div>
              </div>
              <div className="comment-list-block">
                {commentsArr ? (
                  commentsArr.map((item, index) => (
                    <div className="comment-card" key={index}>
                      <CommentCard item={item} postId={post.id} />
                    </div>
                  ))
                ) : (
                  <h3>Loading</h3>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h3>Loading</h3>
      )}
    </>
  );
};

export default DetailPostPage;
