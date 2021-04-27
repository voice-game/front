import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import GameCard from "../GameCard/GameCard";
import GameOption from "../GameOption/GameOption";

import useErrorMessage from "../../hooks/useErrorMessage";
import { GAME_TITLE } from "../../constants/constants";

import energyBattleThumbnail from "../../images/thumbnails/energyBattle_thumbnail.png";
import energyBattleGif from "../../images/thumbnails/energyBattle_gif.gif";
import monsterEscapeThumbnail from "../../images/thumbnails/monsterEscape_thumbnail.png";
import monsterEscapeGif from "../../images/thumbnails/monsterEscape_gif.gif";
import roadRollerThumbnail from "../../images/thumbnails/roadRoller_thumbnail.png";
import roadRollerGif from "../../images/thumbnails/roadRoller_gif.gif";
import comingSoonThumbnail from "../../images/thumbnails/comingSoon_thumbnail.png";
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

const Name = styled.span`
  color: #f1c40f;
`;

const GameCardGrid = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2vw;
  row-gap: 2vw;
  padding: 30px;
  @media only screen and (max-width: 1120px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const GameList = () => {
  const history = useHistory();
  const [error, showErrorMessage] = useErrorMessage("");
  const { isMicOn, isUnAuthMode, playerData } = useSelector(
    (state) => state.authReducer
  );
  useMicInput(showErrorMessage);

  const selectGame = useCallback(
    (game) => {
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
          showErrorMessage("준비 중입니다 🤠");
      }
    },
    [history, isMicOn, showErrorMessage]
  );

  return (
    <MainPage>
      <GameOption />
      {error.length > 0 && <ErrorMessage error={error} />}
      <MainTitle> WELCOME TO VOICE GAME !! </MainTitle>
      {isUnAuthMode ? (
        <h1>
          비회원으로 접속하셨네요! &nbsp; &nbsp; 현재 이름은{" "}
          <Name>{playerData.name}</Name>
          입니다 😃
        </h1>
      ) : (
        <h1>
          <Name>{playerData.name}</Name>님 환영합니다 😃
        </h1>
      )}
      <GameCardGrid>
        <GameCard
          onClick={selectGame}
          title={GAME_TITLE.ROAD_ROLLER}
          thumbnail={roadRollerThumbnail}
          gif={roadRollerGif}
        />
        <GameCard
          onClick={selectGame}
          title={GAME_TITLE.MONSTER_ESCAPE}
          thumbnail={monsterEscapeThumbnail}
          gif={monsterEscapeGif}
        />
        <GameCard
          onClick={selectGame}
          title={GAME_TITLE.ENERGY_BATTLE}
          thumbnail={energyBattleThumbnail}
          gif={energyBattleGif}
        />
        <GameCard
          onClick={selectGame}
          thumbnail={comingSoonThumbnail}
          gif={comingSoonThumbnail}
        />
      </GameCardGrid>
    </MainPage>
  );
};

export default GameList;
