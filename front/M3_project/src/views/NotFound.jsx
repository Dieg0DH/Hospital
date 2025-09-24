import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";
import notFoundImage from "../assets/notFound-images/404.png";

const NotFound = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div
      className="not-found-container"
      style={{ backgroundImage: `url(${notFoundImage})` }}
    >
      <button className="home-button" onClick={goToHome}>
        Home
      </button>
    </div>
  );
};

export default NotFound;
