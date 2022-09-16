import React from "react";
import "../style/page_styles/HomePage.css";
import { useNavigate } from "react-router-dom";

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

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-image-block">
        <img
          src="https://1.bp.blogspot.com/-2dZavuPRcVI/YDI0nQZ5nkI/AAAAAAABBE8/--GurvdFFD0qpHSmy6UeOUwP8lvrJmJdQCLcBGAsYHQ/s1500/%25D0%25BA%25D0%25BD%25D0%25B8%25D0%25B3%25D0%25B8_%2BDoV%2B%252816%2529.png"
          alt="No connect"
          className="home__img"
        />
      </div>
      <div className="home-content-block">
        <div className="title-block">
          <h1 className="home__title_h1">
            Welcome to ReadEra! <br /> Place where you can leave your mind
          </h1>
          <h2 className="home__title_h2">Have an account?</h2>
        </div>
        <div className="home-function-block">
          <div className="home-btn-block">
            <ThemeProvider theme={theme}>
              <Button
                className="home__btn"
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/login")}
              >
                Yes
              </Button>
            </ThemeProvider>
          </div>
          <div className="home-btn-block">
            <ThemeProvider theme={theme}>
              <Button
                className="home__btn"
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/registration")}
              >
                No
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
