import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const PlayerCardContainer = styled.div`
  width: 30%;
  background-color: lightgray;
`;

const PlayerName = styled.div`
  width: 100%;
  text-align: center;
`;

const PlayerInfo = styled.div`
  width: 100%;
  text-align: center;
`;

const PlayerCard = ({ player }) => {
  const location = useLocation();
  const gameTitle = location.pathname.split("/")[2];

  return (
    <PlayerCardContainer>
      {!player ? (
        <PlayerName>플레이어 대기 중</PlayerName>
      ) : (
        <>
          <PlayerName>{player.name}</PlayerName>
          <PlayerInfo>{player.gameRecords[gameTitle]}승</PlayerInfo>
        </>
      )}
    </PlayerCardContainer>
  );
};

export default PlayerCard;
