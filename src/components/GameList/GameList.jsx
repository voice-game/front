import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import GameCard from "../GameCard/GameCard";
import GameOption from "../GameOption/GameOption";
import energyBattleThumbnail from "../../images/thumbnails/energyBattle_thumbnail.png";
import comingSoonThumbnail from "../../images/thumbnails/comingSoon_thumbnail.png";
import energyBattleGif from "../../images/thumbnails/energyBattle_gif.gif";

import useErrorMessage from "../../hooks/useErrorMessage";

const MainPage = styled.section`
  width: 100vw;
  height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainTitle = styled.h1`
  width: 100vw;
  font-size: 3rem;
  text-align: center;
`;

const GameCardGrid = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2vw;
  row-gap: 2vw;
  padding: 30px;
`;

const GameList = () => {
  const history = useHistory();
  const [error, showErrorMessage] = useErrorMessage("");

  const selectGame = (game) => {
    switch (game) {
      case "Road Roller":
        history.push("/games/roadRoller");
        break;

      case "Monster Escape":
        history.push("/games/monsterEscape");
        break;

      case "Energy Battle":
        history.push("/games/energyBattle");
        break;

      default:
        showErrorMessage("Wrong game name");
    }
  };

  return (
    <MainPage>
      <GameOption />
      {error.length > 0 && <ErrorMessage />}
      <MainTitle> Game List </MainTitle>
      <GameCardGrid>
        <GameCard
          onClick={selectGame}
          title="Road Roller"
          thumbnail="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc3srjeOY0c1PBqO1DPmjHBuB1zjgDEtfe6Q&usqp=CAU"
          gif="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc3srjeOY0c1PBqO1DPmjHBuB1zjgDEtfe6Q&usqp=CAU"
        />
        <GameCard
          onClick={selectGame}
          title="Monster Escape"
          thumbnail="https://lh3.googleusercontent.com/qgotsceXqd0uMmfMjRNgm09jxGkIgAmCcwwe8uFCNb_-9xi3uei8iEcwcaFB8uBKnratsMU7wgSyGBkB8V5vJkSbrQ=w640-h400-e365-rj-sc0x00ffffff"
          gif="https://lh3.googleusercontent.com/qgotsceXqd0uMmfMjRNgm09jxGkIgAmCcwwe8uFCNb_-9xi3uei8iEcwcaFB8uBKnratsMU7wgSyGBkB8V5vJkSbrQ=w640-h400-e365-rj-sc0x00ffffff"
        />
        <GameCard
          onClick={selectGame}
          title="Energy Battle"
          thumbnail={energyBattleThumbnail}
          gif={energyBattleGif}
        />
        <GameCard
          onClick={selectGame}
          title="Coming Soon"
          thumbnail={comingSoonThumbnail}
          gif={comingSoonThumbnail}
        />
      </GameCardGrid>
    </MainPage>
  );
};

export default GameList;
