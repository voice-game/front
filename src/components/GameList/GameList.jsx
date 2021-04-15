import React from "react";
import { useHistory } from "react-router-dom";
import useErrorMessage from "../../hooks/useErrorMessage";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import GameCard from "../GameCard/GameCard";

const GameList = (props) => {
  const history = useHistory();
  const [error, showErrorMessage] = useErrorMessage("");

  const selectGame = (game) => {
    switch (game) {
      case "Road Roller":
        history.push("/games/road-roller");
        break;

      case "Fighter Attack":
        history.push("/games/fighter-attack");
        break;

      case "Energy Battle":
        history.push("/games/energy-battle");
        break;

      default:
        showErrorMessage("Wrong game name");
    }
  };

  return (
    <section>
      <h1> Game List </h1>
      {error.length > 0 && <ErrorMessage />}
      <div>
        <GameCard
          onClick={selectGame}
          title="Road Roller"
          imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc3srjeOY0c1PBqO1DPmjHBuB1zjgDEtfe6Q&usqp=CAU"
        />
        <GameCard
          onClick={selectGame}
          title="Fighter Attack"
          imgSrc="https://lh3.googleusercontent.com/qgotsceXqd0uMmfMjRNgm09jxGkIgAmCcwwe8uFCNb_-9xi3uei8iEcwcaFB8uBKnratsMU7wgSyGBkB8V5vJkSbrQ=w640-h400-e365-rj-sc0x00ffffff"
        />
        <GameCard
          onClick={selectGame}
          title="Energy Battle"
          imgSrc="https://images-na.ssl-images-amazon.com/images/I/81InK8W1PAL.png"
        />
      </div>
    </section>
  );
};

export default GameList;
