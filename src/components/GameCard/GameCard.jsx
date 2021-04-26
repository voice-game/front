import React from "react";
import styled from "styled-components";

const GameCardContainer = styled.div`
  height: 36vh;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #34495e;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  cursor: pointer;
`;

const GameTitle = styled.div`
  font-size: 2rem;
  font-weight: 600;
`;

const GameThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-width: 26vw;
  max-height: 26vh;
`;

const GameThumbnailImage = styled.img`
  position: absolute;
  margin: 2vh 0;
  max-width: 35vw;
  max-height: 25vh;

  &:hover {
    opacity: 0;
  }
`;

const GameThumbnailGif = styled.img`
  margin: 2vh 0;
  max-width: 35vw;
  max-height: 25vh;
`;

const GameCard = ({ title, thumbnail, gif, onClick }) => {
  const handleClick = () => {
    if (title === "Coming Soon") {
      return;
    }

    onClick(title);
  };
  return (
    <GameCardContainer onClick={handleClick}>
      <GameTitle>{title}</GameTitle>
      <GameThumbnailContainer>
        <GameThumbnailImage src={thumbnail} alt="gameThumbnail" />
        <GameThumbnailGif src={gif} alt="gameGif" />
      </GameThumbnailContainer>
    </GameCardContainer>
  );
};

export default GameCard;
