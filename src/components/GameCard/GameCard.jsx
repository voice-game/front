import React from "react";
import styled from "styled-components";

const GameCardContainer = styled.div`
  height: 40vh;
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
  max-width: 30vw;
  max-height: 30vh;
`;

const GameThumbnailImage = styled.img`
  position: absolute;
  margin: 2vh 0;
  width: 30vw;
  height: 25vh;

  &:hover {
    opacity: 0;
  }

  @media only screen and (max-width: 1120px) {
    width: 50vw;
  }
`;

const GameThumbnailGif = styled.img`
  margin: 2vh 0;
  width: 30vw;
  height: 25vh;

  @media only screen and (max-width: 1120px) {
    width: 50vw;
  }
`;

const GameCard = ({ title, thumbnail, gif, onClick }) => {
  return (
    <GameCardContainer onClick={() => onClick(title)}>
      <GameTitle>{title}</GameTitle>
      <GameThumbnailContainer>
        <GameThumbnailImage src={thumbnail} alt="gameThumbnail" />
        {gif && <GameThumbnailGif src={gif} alt="gameGif" />}
      </GameThumbnailContainer>
    </GameCardContainer>
  );
};

export default GameCard;
