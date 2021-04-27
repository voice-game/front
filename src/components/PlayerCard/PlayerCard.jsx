import React from "react";
import styled from "styled-components";

const PlayerData = styled.span`
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
  display: block;
  color: black;
`;

const PlayerCard = ({ player }) => {
  return (
    <PlayerData>
      {player ? player.name : "Waiting..."}
      <br />
      {player ? player.gameRecords.energyBattle : "😝"}승
    </PlayerData>
  );
};

export default PlayerCard;
