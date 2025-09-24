import React from "react";
import "./Service.css";

const Service = ({ icon, title, buttonText }) => {
  return (
    <div className="service-card">
      <div className="service-icon">
        <img src={`/src/assets/service-images/${icon}.jpg`} alt={title} />
      </div>
      <h3>{title}</h3>
      <button className="book-now-button">{buttonText}</button>
    </div>
  );
};

export default Service;
