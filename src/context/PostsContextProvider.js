import React, { useContext, createContext, useReducer } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ACTIONS, POSTS_API, SAVE_API } from "../helpers/consts";

export const postsContext = createContext();

export const usePosts = () => useContext(postsContext);

const INIT_STATE = {
  posts: [],
  postDetails: null,
  comments: [],
  rating: 0,
  selected: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_POSTS:
      return { ...state, posts: action.payload };
    case ACTIONS.GET_POST_DETAILS:
      return { ...state, postDetails: action.payload };
    case ACTIONS.GET_COMMENTS:
      return { ...state, comments: action.payload };
    case ACTIONS.GET_RATING:
      return { ...state, rating: action.payload };
    case ACTIONS.GET_SELECTED:
      return { ...state, selected: action.payload };
    default:
      return state;
  }
};

const PostsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const navigate = useNavigate();

  const location = useLocation();

  // Add post

  const addPost = async (newPost) => {
    await axios.post(POSTS_API, newPost);
    getPosts();
  };

  //   Get ALL POSTS

  const getPosts = async () => {
    const { data } = await axios(`${POSTS_API}/${window.location.search}`);
    dispatch({
      type: ACTIONS.GET_POSTS,
      payload: data,
    });
  };

  //   Edit / Details Product

  const getPostDetails = async (id) => {
    const { data } = await axios(`${POSTS_API}/${id}`);
    dispatch({
      type: ACTIONS.GET_POST_DETAILS,
      payload: data,
    });
  };

  const saveEditedPost = async (editedPost) => {
    await axios.patch(`${POSTS_API}/${editedPost.id}`, editedPost);
    getPosts();
  };

  //   Delete

  const deletePost = async (id) => {
    await axios.delete(`${POSTS_API}/${id}`);
    getPosts();
  };

  // Filtration

  const fetchByParams = (query, value) => {
    const search = new URLSearchParams(location.search);
    if (value === "All") {
      search.delete(query);
    } else {
      search.set(query, value);
    }
    const url = `${location.pathname}?${search.toString()}`;
    navigate(url);
  };

  // Likes

  const togleLike = async (id, user) => {
    const { data } = await axios(`${POSTS_API}/${id}`);
    if (data.likes.some((item) => item.user === user)) {
      const newData = data.likes.filter((item) => {
        return item.user !== user;
      });
      data.likes = newData;
      await axios.patch(`${POSTS_API}/${id}`, data);
      console.log("remove", data.likes);
    } else {
      const likeObj = {
        user: user,
        postId: data.id,
        id: Date.now(),
      };
      data.likes.push(likeObj);
      await axios.patch(`${POSTS_API}/${id}`, data);
      console.log("add", data.likes);
    }
    getPosts();
  };

  // Comments

  // add comment

  const addComment = async (id, user, text) => {
    if (!user) {
      alert("Only authorized users can add comment");
      return;
    }
    const { data } = await axios(`${POSTS_API}/${id}`);
    const commentObj = {
      user: user,
      postId: data.id,
      id: Date.now(),
      comment: text,
    };
    data.comments.push(commentObj);
    await axios.patch(`${POSTS_API}/${id}`, data);
    getComments(id);
  };

  const getComments = async (id) => {
    const { data } = await axios(`${POSTS_API}/${id}`);
    dispatch({
      type: ACTIONS.GET_COMMENTS,
      payload: data.comments,
    });
  };

  // Delete comment

  const deleteComment = async (postId, user, commentId) => {
    const { data } = await axios(`${POSTS_API}/${postId}`);
    const comment = data.comments.find((item) => item.id === commentId);
    if (user !== comment.user) {
      alert("You can not delete another users comment");
      return;
    }
    const newData = data.comments.filter((item) => {
      return item.id !== commentId;
    });
    data.comments = newData;
    await axios.patch(`${POSTS_API}/${postId}`, data);
    console.log("remove", data.comments);
    getComments(postId);
  };

  // Rating

  const postRating = async (postId, user, value) => {
    if (!user) {
      alert("Only authorized users can rate posts");
      return;
    }
    const { data } = await axios(`${POSTS_API}/${postId}`);
    data.rating.push(value);
    await axios.patch(`${POSTS_API}/${postId}`, data);
    console.log("rating", data.rating);
    getRating(postId);
  };

  const getRating = async (postId) => {
    const { data } = await axios(`${POSTS_API}/${postId}`);
    if (data.rating.length !== 0) {
      const rate = data.rating.reduce((preVal, curVal, index, arr) => {
        const value = preVal + curVal;
        return value / arr.length;
      });
      dispatch({
        type: ACTIONS.GET_RATING,
        payload: rate,
      });
    } else {
      dispatch({
        type: ACTIONS.GET_RATING,
        payload: 0,
      });
    }
  };

  // SELECTED

  const getSelected = async (user) => {
    const { data } = await axios(`${POSTS_API}`);
    const newData = data.filter((item) => {
      if (item.selected.some((item) => item === user)) {
        return item;
      }
    });
    dispatch({
      type: ACTIONS.GET_SELECTED,
      payload: newData,
    });
  };

  const togleSelected = async (id, user) => {
    if (!user) {
      alert("Only authorized users can add comment");
      return;
    }
    const { data } = await axios(`${POSTS_API}/${id}`);
    if (!data.selected.some((item) => item === user)) {
      data.selected.push(user);
      await axios.patch(`${POSTS_API}/${id}`, data);
      console.log("add", data.selected);
    } else {
      const newData = data.selected.filter((item) => {
        return item !== user;
      });
      data.selected = newData;
      await axios.patch(`${POSTS_API}/${id}`, data);
      console.log("remove", data.selected);
    }
    getPosts();
    getSelected(user);
  };

  const values = {
    posts: state.posts,
    postDetails: state.postDetails,
    getPosts,
    addPost,
    getPostDetails,
    saveEditedPost,
    deletePost,
    fetchByParams,
    togleLike,
    comments: state.comments,
    addComment,
    getComments,
    deleteComment,
    getRating,
    rating: state.rating,
    postRating,
    getSelected,
    togleSelected,
    selected: state.selected,
  };

  return (
    <postsContext.Provider value={values}>{children}</postsContext.Provider>
  );
};

export default PostsContextProvider;
