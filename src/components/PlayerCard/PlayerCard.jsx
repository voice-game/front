import React from "react";
import styled from "styled-components";

const PlayerCardContainer = styled.div`
  width: 30%;
  background-color: lightgray;
`;

const PlayerName = styled.div`
  width: 100%;
  text-align: center;
`;

const PlayerCard = ({ player }) => {
  return (
    <PlayerCardContainer>
      {!player ? (
        <PlayerName>플레이어 대기 중</PlayerName>
      ) : (
        <>
          <PlayerName>{player?.name}</PlayerName>
        </>
      )}
    </PlayerCardContainer>
  );
};

export default PlayerCard;
