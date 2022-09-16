import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import RegisterSuccessPage from "./pages/RegisterSuccessPage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import ProfilePage from "./pages/ProfilePage";
import PostsPage from "./pages/PostsPage";
import AdminPage from "./pages/AdminPage";
import EditPage from "./pages/EditPage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import DetailPostPage from "./pages/DetailPostPage";

const MainRoutes = () => {
  const PUBLIC_ROUTES = [
    {
      link: "/",
      element: <HomePage />,
      id: 1,
    },
    {
      link: "/posts",
      element: <PostsPage />,
      id: 2,
    },
    {
      link: "/registration",
      element: <RegisterPage />,
      id: 3,
    },
    {
      link: "/registration-success",
      element: <RegisterSuccessPage />,
      id: 4,
    },
    {
      link: "/login",
      element: <LoginPage />,
      id: 5,
    },
    {
      link: "*",
      element: <ErrorPage />,
      id: 6,
    },
    {
      link: "/profile",
      element: <ProfilePage />,
      id: 7,
    },
    {
      link: "/add-post",
      element: <AdminPage />,
      id: 8,
    },
    {
      link: "/edit/:id",
      element: <EditPage />,
      id: 9,
    },
    {
      link: "/profile-settings",
      element: <ProfileSettingsPage />,
      id: 10,
    },
    {
      link: "/password-reset",
      element: <PasswordResetPage />,
      id: 11,
    },
    {
      link: "/detail/:id",
      element: <DetailPostPage />,
      id: 12,
    },
  ];

  return (
    <Routes>
      {PUBLIC_ROUTES.map((item) => (
        <Route path={item.link} element={item.element} key={item.id} />
      ))}
    </Routes>
  );
};

export default MainRoutes;
