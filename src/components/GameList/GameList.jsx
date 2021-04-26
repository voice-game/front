import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import GameCard from "../GameCard/GameCard";
import GameOption from "../GameOption/GameOption";

import useErrorMessage from "../../hooks/useErrorMessage";
import { GAME_TITLE } from "../../constants/constants";

import energyBattleThumbnail from "../../images/thumbnails/energyBattle_thumbnail.png";
import comingSoonThumbnail from "../../images/thumbnails/comingSoon_thumbnail.png";
import energyBattleGif from "../../images/thumbnails/energyBattle_gif.gif";
import useMicInput from "../../hooks/useMicInput";
import { useSelector } from "react-redux";

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
  width: 90%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2vw;
  row-gap: 2vw;
  padding: 30px;
`;

const GameList = () => {
  const history = useHistory();
  const [error, showErrorMessage] = useErrorMessage("");
  const { isMicOn } = useSelector((state) => state.authReducer);
  useMicInput(showErrorMessage);

  const selectGame = (game) => {
    if (!isMicOn) {
      return showErrorMessage("마이크를 허용하고 새로고침 해주세요");
    }

    switch (game) {
      case GAME_TITLE.ROAD_ROLLER:
        history.push("/games/roadRoller");
        break;

      case GAME_TITLE.MONSTER_ESCAPE:
        history.push("/games/monsterEscape");
        break;

      case GAME_TITLE.ENERGY_BATTLE:
        history.push("/games/energyBattle");
        break;

      default:
        showErrorMessage("Wrong game name");
    }
  };

  return (
    <MainPage>
      <GameOption />
      {error.length > 0 && <ErrorMessage error={error} />}
      <MainTitle> WELCOME TO VOICE GAME !! </MainTitle>
      <GameCardGrid>
        <GameCard
          onClick={selectGame}
          title={GAME_TITLE.ROAD_ROLLER}
          thumbnail="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc3srjeOY0c1PBqO1DPmjHBuB1zjgDEtfe6Q&usqp=CAU"
          gif="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc3srjeOY0c1PBqO1DPmjHBuB1zjgDEtfe6Q&usqp=CAU"
        />
        <GameCard
          onClick={selectGame}
          title={GAME_TITLE.MONSTER_ESCAPE}
          thumbnail="https://lh3.googleusercontent.com/qgotsceXqd0uMmfMjRNgm09jxGkIgAmCcwwe8uFCNb_-9xi3uei8iEcwcaFB8uBKnratsMU7wgSyGBkB8V5vJkSbrQ=w640-h400-e365-rj-sc0x00ffffff"
          gif="https://lh3.googleusercontent.com/qgotsceXqd0uMmfMjRNgm09jxGkIgAmCcwwe8uFCNb_-9xi3uei8iEcwcaFB8uBKnratsMU7wgSyGBkB8V5vJkSbrQ=w640-h400-e365-rj-sc0x00ffffff"
        />
        <GameCard
          onClick={selectGame}
          title={GAME_TITLE.ENERGY_BATTLE}
          thumbnail={energyBattleThumbnail}
          gif={energyBattleGif}
        />
        <GameCard
          title="Coming Soon"
          thumbnail={comingSoonThumbnail}
          gif={comingSoonThumbnail}
        />
      </GameCardGrid>
    </MainPage>
  );
};

export default GameList;
