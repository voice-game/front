import React from "react";
import styled from "styled-components";

const GameCardContainer = styled.div`
  height: 36vh;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #34495e;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  cursor: pointer;
`;

const GameTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
`;

const GameThumbnailContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const GameThumbnailImage = styled.img`
  position: absolute;
  margin: 2vh 0;
  max-width: 26vw;
  max-height: 26vh;

  &:hover {
    opacity: 0;
  }
`;

const GameThumbnailGif = styled.img`
  margin: 2vh 0;
  max-width: 26vw;
  max-height: 26vh;
`;

const GameCard = ({ title, thumbnail, gif, onClick }) => {
  return (
    <GameCardContainer onClick={() => onClick(title)}>
      <GameTitle>{title}</GameTitle>
      <GameThumbnailContainer>
        <GameThumbnailImage src={thumbnail} alt="gameThumbnail" />
        <GameThumbnailGif src={gif} alt="gameGif" />
      </GameThumbnailContainer>
    </GameCardContainer>
  );
};

export default GameCard;
