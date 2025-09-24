import React from "react";
import Text from "./Text";
import "./About.css";
import doctorImage from "../assets/home-images/doctor.jpeg";

const About = ({ content }) => {
  return (
    <div className="about-container">
      <div className="about-text">
        <Text content={content.title} type="title" />
        <div className="about-content">
          <Text content={content.paragraphs} type="paragraphs" />
        </div>
      </div>
      <div className="about-image">
        <img src={doctorImage} alt="Smiling doctor" />
      </div>
    </div>
  );
};

export default About;
