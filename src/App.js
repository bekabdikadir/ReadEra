import React, { useEffect } from "react";
import MainRoutes from "./MainRoutes";
import Navbar from "./components/Navbar/Navbar";
import WelcomePage from "./pages/WelcomePage";
import { useAuth } from "./context/AuthContextProvider";

// Contexts imports

import PostsContextProvider from "./context/PostsContextProvider";

const App = () => {
  const { user } = useAuth();

  return (
    <>
      <PostsContextProvider>
        <Navbar />
        <MainRoutes />
      </PostsContextProvider>
    </>
  );
};

export default App;
