import React from "react";

const Text = ({ content, type }) => {
  if (type === "paragraph") {
    return <p>{content}</p>;
  }

  if (type === "title") {
    return <h2>{content}</h2>;
  }

  if (type === "paragraphs") {
    return content.map((paragraph, index) => <p key={index}>{paragraph}</p>);
  }

  return null;
};

export default Text;
