import React, { useContext, createContext, useReducer, useEffect } from "react";
import { AUTH_ACTIONS } from "../helpers/consts";
import fire from "../Firebase";
import { useNavigate } from "react-router-dom";

export const authContext = createContext();

export const useAuth = () => useContext(authContext);

const INIT_STATE = {
  user: "",
  currentUser: false,
  email: "",
  password: "",
  emailError: "",
  passwordError: "",
  hasAccount: false,
  displayName: "",
  photoURL: "",
  oldPassword: "",
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.GET_USER:
      return { ...state, user: action.payload };
    case AUTH_ACTIONS.GET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    case AUTH_ACTIONS.GET_EMAIL:
      return { ...state, email: action.payload };
    case AUTH_ACTIONS.GET_EMAIL_ERROR:
      return { ...state, emailError: action.payload };
    case AUTH_ACTIONS.GET_PASSWORD:
      return { ...state, password: action.payload };
    case AUTH_ACTIONS.GET_PASSWORD_ERROR:
      return { ...state, passwordError: action.payload };
    case AUTH_ACTIONS.GET_HAS_ACCOUNT:
      return { ...state, hasAccount: action.payload };
    case AUTH_ACTIONS.GET_DISPLAY_NAME:
      return { ...state, displayName: action.payload };
    case AUTH_ACTIONS.GET_PHOTO_URL:
      return { ...state, photoURL: action.payload };
    case AUTH_ACTIONS.GET_OLD_PASSWORD:
      return { ...state, oldPassword: action.payload };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const navigate = useNavigate();

  const clearInputs = () => {
    dispatch({
      type: AUTH_ACTIONS.GET_EMAIL,
      payload: "",
    });
    dispatch({
      type: AUTH_ACTIONS.GET_PASSWORD,
      payload: "",
    });
  };

  const clearErrors = () => {
    dispatch({
      type: AUTH_ACTIONS.GET_EMAIL_ERROR,
      payload: "",
    });
    dispatch({
      type: AUTH_ACTIONS.GET_PASSWORD_ERROR,
      payload: "",
    });
  };

  const handleSignUp = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(state.email, state.password)
      // .then((userCredential) => {
      //   const user = userCredential.user;
      //   console.log("Registered user: ", user);
      // })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            dispatch({
              type: AUTH_ACTIONS.GET_EMAIL_ERROR,
              payload: error.message,
            });
            break;
          case "auth/invalid-email":
            dispatch({
              type: AUTH_ACTIONS.GET_EMAIL_ERROR,
              payload: error.message,
            });
            break;
          case "auth/weak-password":
            dispatch({
              type: AUTH_ACTIONS.GET_PASSWORD_ERROR,
              payload: error.message,
            });
            break;
          default:
            dispatch({
              type: AUTH_ACTIONS.GET_EMAIL_ERROR,
              payload: error.message,
            });
            dispatch({
              type: AUTH_ACTIONS.GET_PASSWORD_ERROR,
              payload: error.message,
            });
        }
      });
  };

  const handleLogin = () => {
    clearErrors();
    if (!!state.user === false) {
      fire
        .auth()
        .signInWithEmailAndPassword(state.email, state.password)
        .then(() => {
          navigate("/profile");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
            case "auth/user-not-found":
            case "auth/user-disabled":
              dispatch({
                type: AUTH_ACTIONS.GET_EMAIL_ERROR,
                payload: error.message,
              });
              break;
            case "auth/wrong-password":
              dispatch({
                type: AUTH_ACTIONS.GET_PASSWORD_ERROR,
                payload: error.message,
              });
              break;
            default:
              dispatch({
                type: AUTH_ACTIONS.GET_EMAIL_ERROR,
                payload: error.message,
              });
              dispatch({
                type: AUTH_ACTIONS.GET_PASSWORD_ERROR,
                payload: error.message,
              });
          }
        });
    } else {
      dispatch({
        type: AUTH_ACTIONS.GET_EMAIL_ERROR,
        payload: "User alredy in system",
      });
    }
  };

  const handleLogout = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        dispatch({
          type: AUTH_ACTIONS.GET_USER,
          payload: user,
        });
        console.log(user);
      } else {
        dispatch({
          type: AUTH_ACTIONS.GET_USER,
          payload: "",
        });
      }
    });
  };

  const updateProfile = () => {
    clearErrors();
    fire
      .auth()
      .currentUser.updateProfile({
        displayName: state.displayName,
        photoURL: state.photoURL,
      })
      .then(() => {
        dispatch({
          type: AUTH_ACTIONS.GET_DISPLAY_NAME,
          payload: state.user.displayName,
        });
        dispatch({
          type: AUTH_ACTIONS.GET_PHOTO_URL,
          payload: state.user.photoURL,
        });
        handleCurrentUser(true);
      })
      .catch((error) => {
        dispatch({
          type: AUTH_ACTIONS.GET_EMAIL_ERROR,
          payload: error.message,
        });
      });
  };

  const updatePassword = async () => {
    clearErrors();
    handleCurrentUser(false);
    const user = fire.auth().currentUser;
    console.log(
      "user",
      user,
      "pass",
      state.password,
      "oldpass",
      state.oldPassword
    );

    const credential = await fire
      .auth()
      .EmailAuthProvider.credential(user.email, state.oldPassword);
    const result = await fire
      .auth()
      .reauthenticateWithCredential(user, credential);

    fire
      .auth()
      .currentUser.updatePassword(user.email, state.password)
      .then(() => {
        handleCurrentUser(true);
      })
      .catch((error) => {
        dispatch({
          type: AUTH_ACTIONS.GET_PASSWORD_ERROR,
          payload: error.message,
        });
      });
  };

  useEffect(() => {
    authListener();
  }, []);

  const handleCurrentUser = (value) => {
    dispatch({
      type: AUTH_ACTIONS.GET_CURRENT_USER,
      payload: value,
    });
  };

  const handleEmail = (value) => {
    dispatch({
      type: AUTH_ACTIONS.GET_EMAIL,
      payload: value,
    });
  };

  const handlePassword = (value) => {
    dispatch({
      type: AUTH_ACTIONS.GET_PASSWORD,
      payload: value,
    });
  };

  const handleAccount = (value) => {
    dispatch({
      type: AUTH_ACTIONS.GET_HAS_ACCOUNT,
      payload: value,
    });
  };

  const handleUser = (value) => {
    dispatch({
      type: AUTH_ACTIONS.GET_USER,
      payload: value,
    });
  };

  const handleDisplayName = (value) => {
    dispatch({
      type: AUTH_ACTIONS.GET_DISPLAY_NAME,
      payload: value,
    });
  };

  const handlePhoto = (value) => {
    dispatch({
      type: AUTH_ACTIONS.GET_PHOTO_URL,
      payload: value,
    });
  };

  const handleOldPassword = (value) => {
    dispatch({
      type: AUTH_ACTIONS.GET_OLD_PASSWORD,
      payload: value,
    });
  };

  const values = {
    user: state.user,
    email: state.email,
    emailError: state.emailError,
    password: state.password,
    passwordError: state.passwordError,
    hasAccount: state.hasAccount,
    displayName: state.displayName,
    photoURL: state.photoURL,
    currentUser: state.currentUser,
    handleEmail,
    handlePassword,
    handleAccount,
    handleLogin,
    handleSignUp,
    handleLogout,
    handleUser,
    handleDisplayName,
    handlePhoto,
    handleCurrentUser,
    updateProfile,
    updatePassword,
    handleOldPassword,
    oldPassword: state.oldPassword,
  };

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
