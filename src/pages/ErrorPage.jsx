import React from "react";
import "../style/page_styles/ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className="error-page-container">
      <img
        src="https://pbs.twimg.com/media/Dgx5KR5WsAEK5vW.jpg"
        alt="Page not Found"
        className="error-page__img"
      />
    </div>
  );
};

export default ErrorPage;
