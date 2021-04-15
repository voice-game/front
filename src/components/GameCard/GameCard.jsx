import React from "react";

const GameCard = ({ title, imgSrc, onClick }) => {
  const handleClick = () => {
    onClick(title);
  };

  return (
    <div name={title} onClick={handleClick}>
      <h1>{title}</h1>
      <img src={imgSrc} alt="gameThumbnail" />
    </div>
  );
};

export default GameCard;
