import React from "react";
import styled from "styled-components";

const GameCardContainer = styled.div`
  height: 75vh;
  width: 28vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 40px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  cursor: pointer;
`;

const GameTitle = styled.div`
  margin-top: 10vh;
  font-size: 1.3rem;
  font-weight: 600;
`;

const GameThumbnailContainer = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const GameThumbnailImage = styled.img`
  margin-top: 10vh;
  max-width: 80%;
`;

const GameCard = ({ title, imgSrc, onClick }) => {
  return (
    <GameCardContainer onClick={() => onClick(title)}>
      <GameTitle>{title}</GameTitle>
      <GameThumbnailContainer>
        <GameThumbnailImage src={imgSrc} alt="gameThumbnail" />
      </GameThumbnailContainer>
    </GameCardContainer>
  );
};

export default GameCard;
