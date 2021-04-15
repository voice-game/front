import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import GameCard from "../GameCard/GameCard";
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
  margin-top: 5vh;
  text-align: center;
`;

const GameCardContainer = styled.div`
  width: 90%;
  margin-top: 5vh;
  display: flex;
  justify-content: space-between;
`;

const GameList = (props) => {
  const history = useHistory();
  const [error, showErrorMessage] = useErrorMessage("");

  const selectGame = (game) => {
    switch (game) {
      case "Road Roller":
        history.push("/games/road-roller");
        break;

      case "Flappy Bird":
        history.push("/games/flappy-bird");
        break;

      case "Energy Battle":
        history.push("/games/energy-battle");
        break;

      default:
        showErrorMessage("Wrong game name");
    }
  };

  return (
    <MainPage>
      <MainTitle> Game List </MainTitle>
      {error.length > 0 && <ErrorMessage />}
      <GameCardContainer>
        <GameCard
          onClick={selectGame}
          title="Road Roller"
          imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc3srjeOY0c1PBqO1DPmjHBuB1zjgDEtfe6Q&usqp=CAU"
        />
        <GameCard
          onClick={selectGame}
          title="Flappy Bird"
          imgSrc="https://lh3.googleusercontent.com/qgotsceXqd0uMmfMjRNgm09jxGkIgAmCcwwe8uFCNb_-9xi3uei8iEcwcaFB8uBKnratsMU7wgSyGBkB8V5vJkSbrQ=w640-h400-e365-rj-sc0x00ffffff"
        />
        <GameCard
          onClick={selectGame}
          title="Energy Battle"
          imgSrc="https://images-na.ssl-images-amazon.com/images/I/81InK8W1PAL.png"
        />
      </GameCardContainer>
    </MainPage>
  );
};

export default GameList;
